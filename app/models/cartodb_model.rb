class CartodbModel
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value) rescue nil
    end
    @attributes = attributes
  end

  def persisted?
    false
  end

  def self.all
    result = CartoDB::Connection.query("SELECT * FROM #{self.class.name.tableize}")
    return results.rows || [] if result
    []
  end

  def self.where(where_clause)
    sql = "SELECT * FROM #{self.class.name.tableize}"
    sql << " WHERE #{where_clause};"

    result = CartoDB::Connection.query(sql)

    return results.rows || [] if result
    []
  end

  def save
    CartoDB::Connection.insert_row(self.class.name.tableize, attributes)
  end

  private

  def attributes
    @attributes || {}
  end
end
