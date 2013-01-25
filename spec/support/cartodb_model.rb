class CartodbModel

  def self.records
    @@records ||= {}
    @@records[name] ||= []
  end

  def self.records=(value)
    @@records = value
  end

  def self.where(filters)
    records.select do |record|
      filters.inject{|key_value, result| result && record.send(key_value.first) == key_value.last }
    end.map{|r| self.new(r)}
  end

  def self.find_by_id(id)
    where(:cartodb_id => id).first
  end

  def self.all
    records.map{|r| self.new(r)}
  end

  def self.count
    records.length
  end

  def save
    return false unless valid?

    self.cartodb_id = self.attributes[:cartodb_id] = self.class.count + 1
    model = CartoDB::Types::Metadata.from_hash(self.attributes)
    self.class.records << model

    self.class.new(model)
  end
end
