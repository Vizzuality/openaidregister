class User < CartodbModel

  attr_accessor :email,
                :password,
                :name,
                :organization

  validates :email, :presence => true, :email => true
  validates :password, :presence => true

  def save
    super
    organization.save if organization
  end

  def organization=(organization_attributes)
    @organization = if organization_attributes.is_a?(Organization)
                      organization_attributes
                    else
                      Organization.new(organization_attributes)
                    end
  end
end
