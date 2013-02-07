class CartodbModel
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :cartodb_id, :name, :created_at, :updated_at
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
      prepared_attributes['updated_at'] = Time.now
      CartoDB::Connection.update_row(table_name, id, prepared_attributes)
    else
      prepared_attributes['created_at'] = prepared_attributes['updated_at'] = Time.now
      row = CartoDB::Connection.insert_row(table_name, prepared_attributes)
      self.cartodb_id = row.cartodb_id
    end

    self
  end

  def destroy
    CartoDB::Connection.delete_row(table_name, cartodb_id);
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
    return nil if id.blank?

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
    sql = "SELECT * FROM #{table_name}"
    sql << " WHERE #{filters.map{|k, v| "#{k} = '#{v}'"}.join(' AND ')};"

    query(sql)
  end

  def self.count
    result = query("SELECT count(cartodb_id) as count FROM #{self.name.tableize}")
    return result.first['count'] || 0 if result.present?
    0
  end

  def self.table_name
    name.tableize
  end

  def attributes
    @attributes ||= {}
  end

  def as_json(options = {})
    options[:except] ||= [:attributes]
    attributes.as_json(options)
  end

  protected

  def parse_date(date)
    date_components = date.split('/').map(&:to_i)
    Date.new(date_components[2], date_components[0], date_components[1])
  end

  private

  def prepare_data_for_table(table_name, attributes)
    table = CartoDB::Connection.table(table_name)

    prepared_attributes = {}

    table.schema.each do |column_name, colum_type|
      next unless attributes.keys.include?(column_name)
      prepared_attributes[column_name] = format_value_for_type(colum_type, attributes[column_name])
    end

    prepared_attributes.except('cartodb_id')
  end

  def format_value_for_type(type, value)
    case type
    when 'number'
      value = Float(value) rescue nil
    when 'date'
      value = value.to_date rescue Date.parse(value) rescue nil
    else
      value
    end
  end
end
