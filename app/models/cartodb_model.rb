class CartodbModel
  include ActiveModel::Validations

  def initialize(params = {})
    @attributes = params
  end

  def self.all
    result = CartoDB::Connection.query("SELECT * FROM #{self.class.name.tableize}")
    return results.rows || [] if result
    []
  end

  def save
    CartoDB::Connection.insert_row(self.class.name.tableize, attributes)
  end

  def self.to_select_options
    all.map{|record| [record.name, record.id]}
  end

  private

  def attributes
    @attributes || {}
  end
end
