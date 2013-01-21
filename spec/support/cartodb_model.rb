class CartodbModel

  def self.records
    @records ||= []
  end

  def save
    self.cartodb_id = self.class.count + 1
    self.class.records << OpenStruct.new(attributes)
  end

  def self.all
    records
  end

  def self.count
    records.length
  end

end
