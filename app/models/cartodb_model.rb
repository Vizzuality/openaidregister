class CartodbModel

  def self.all

  end

  def self.create

  end

  def self.to_select_options
    all.map{|record| [record.name, record.id]}
  end

end
