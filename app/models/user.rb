class User < CartodbModel

  attr_accessor :email,
                :password,
                :name,
                :organization

  validates :email, :presence => true, :email => true
  validates :password, :presence => true

  def self.with_credentials(email, password)
    user_record = User.where(:email => email, :password => password).first
    User.new(user_record)
  end

  def self.find_by_name(name)
    user_record = User.where(:name => name).first
    User.new(user_record)
  end

  def projects
    Project.for_user(cartodb_id)
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
