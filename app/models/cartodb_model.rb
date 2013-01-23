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

  def self.create(params)
    model = self.new(params)
    if model.valid?
      model.save
      return model
    end
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

  def save
    inserted_row = CartoDB::Connection.insert_row(self.class.name.tableize, attributes)
    self.cartodb_id = inserted_row.cartodb_id
    self
  end

  def attributes
    @attributes || {}
  end

  def as_json(options = {})
    options[:except] ||= [:attributes]
    attributes.as_json(options)
  end
end
