class CartodbModel

  def self.records
    @@records ||= {}
    @@records[name] ||= []
  end

  def self.records=(value)
    @@records = value
  end

  def self.create(params)
    model = self.new(params)
    if model.valid?
      model.save
      return model
    end
    false
  end

  def self.where(filters)
    records.select do |record|
      filters.inject{|key_value, result| result && record.send(key_value.first) == key_value.last }
    end
  end

  def save
    self.cartodb_id = self.class.count + 1
    self.class.records << self
  end

  def self.all
    records
  end

  def self.count
    records.length
  end

end
