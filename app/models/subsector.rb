class Subsector < CartodbModel
  attr_accessor :id, :name

  def self.all
    [OpenStruct.new(:id => 1, :name => 'Food security')]
  end

end
