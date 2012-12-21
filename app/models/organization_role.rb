class OrganizationRole < CartodbModel
  attr_accessor :id, :name

  def self.all
    [OpenStruct.new(:id => 1, :name => 'Wadus')]
  end

end
