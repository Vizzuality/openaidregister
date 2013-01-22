class CartodbModel
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :cartodb_id
  alias :id :cartodb_id

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value) rescue nil
    end
    @attributes = attributes.select{|k, v| !v.is_a?(Hash) && !v.is_a?(Array)}
  end

  def persisted?
    cartodb_id.present?
  end

  def self.all
    result = CartoDB::Connection.query("SELECT * FROM #{self.name.tableize}")
    return result.rows || [] if result
    []
  end

  def self.where(filters)
    sql = "SELECT * FROM #{name.tableize}"
    sql << " WHERE #{filters.map{|k, v| "#{k} = '#{v}'"}.join(' AND ')};"

    result = CartoDB::Connection.query(sql)

    return result.rows || [] if result
    []
  end

  def self.count
    result = CartoDB::Connection.query("SELECT count(cartodb_id) as count FROM #{self.name.tableize}")
    return result.rows[0]['count'] || 0 if result && result.rows.present?
    []
  end

  def save
    inserted_row = CartoDB::Connection.insert_row(self.class.name.tableize, attributes)
    self.cartodb_id = inserted_row.cartodb_id
    self
  end

  private

  def attributes
    @attributes || {}
  end
end
