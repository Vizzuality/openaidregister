class User < CartodbModel

  attr_accessor :email,
                :password,
                :name,
                :organization

  validates :email, :presence => true, :email => true
  validates :password, :presence => true

  def self.with_credentials(email, password)
    User.where(:email => email, :password => password).first
  end

  def self.find_by_name(name)
    User.where(:name => name).first
  end

  def projects
    Project.where(:user_id => cartodb_id)
  end

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
