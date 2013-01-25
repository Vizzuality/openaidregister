class CartodbModel
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :cartodb_id, :name
  alias :id :cartodb_id

  def initialize(attributes = {})
    if attributes.present?
      attributes.each do |name, value|
        send("#{name}=", value) rescue nil
      end
      @attributes = attributes.select{|k, v| !v.is_a?(Hash) && !v.is_a?(Array)}
    end
  end

  def table_name
    self.class.name.tableize
  end

  def save
    return false unless valid?

    prepared_attributes = prepare_data_for_table(table_name, attributes)

    if persisted?
      CartoDB::Connection.update_row(table_name, prepared_attributes)
    else
      row = CartoDB::Connection.insert_row(table_name, prepared_attributes.except('cartodb_id'))
      self.cartodb_id = row.cartodb_id
    end

    self
  end

  def update_attributes(attributes = {})
    if attributes.present?
      attributes.each do |name, value|
        self.attributes[name] = value
        send("#{name}=", value) rescue nil
      end
      save
    end
  end

  def self.create(params)
    model = self.new(params)

    return model if model.save

    false
  end

  def persisted?
    cartodb_id.present?
  end

  def self.query(sql)
    result = CartoDB::Connection.query(sql)
    rows = result.rows || [] if result && result.rows
    rows.map{|r| self.new(r)}
  end

  def self.all
    query("SELECT * FROM #{self.name.tableize}")
  end

  def self.find_by_id(id)
    result = CartoDB::Connection.query(<<-SQL)
      SELECT *
      FROM #{name.tableize}
      WHERE cartodb_id = #{id};
      SQL

      if result && result.rows && result.rows.first
        self.new(result.rows.first)
      end
  end

  def self.where(filters)
    sql = "SELECT * FROM #{name.tableize}"
    sql << " WHERE #{filters.map{|k, v| "#{k} = '#{v}'"}.join(' AND ')};"

    query(sql)
  end

  def self.count
    result = query("SELECT count(cartodb_id) as count FROM #{self.name.tableize}")
    return result.first['count'] || 0 if result.present?
    0
  end

  def attributes
    @attributes || {}
  end

  def as_json(options = {})
    options[:except] ||= [:attributes]
    attributes.as_json(options)
  end

  private

  def prepare_data_for_table(table_name, attributes)
    table = CartoDB::Connection.table(table_name)
    table.schema.each do |column_name, colum_type|
      attributes[column_name] = format_value_for_type(colum_type, attributes[column_name])
    end
    attributes
  end

  def format_value_for_type(type, value)
    case type
    when 'number'
      value = Float(value) rescue nil
    when 'date'
      value = Date.parse(value) rescue nil
    else
      value
    end
  end
end
