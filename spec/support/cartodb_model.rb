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
    end
  end

  def self.find_by_id(id)
    record = where(:cartodb_id => id).first

    self.new(record) if record
  end

  def self.all
    records.map{|r| self.new(r)}
  end

  def self.count
    records.length
  end

  def save
    self.cartodb_id = self.attributes[:cartodb_id] = self.class.count + 1
    self.class.records << CartoDB::Types::Metadata.from_hash(self.attributes)
  end
end
