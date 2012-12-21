class Language < CartodbModel
  attr_accessor :id, :name

  def self.all
    [OpenStruct.new(:id => 1, :name => 'English')]
  end
end
