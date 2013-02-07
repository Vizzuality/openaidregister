class User < CartodbModel

  attr_accessor :email,
                :password,
                :name,
                :organization_id

  validates :email, :presence => true, :email => true
  validates :password, :presence => true
  validate :email_uniqueness

  def self.with_credentials(email, password)
    User.where(:email => email, :password => password).first
  end

  def self.find_by_name(name)
    User.where(:name => name).first
  end

  def projects
    Project.for_user(cartodb_id)
  end

  def save
    if self.valid?
      if organization && organization.valid?
        attributes['organization_id'] = organization.save.cartodb_id
        super
      end
    end

    self
  end

  def organization
    @organization ||= Organization.find_by_id(@organization_id)
  end

  def organization=(organization_attributes)
    @organization = if organization_attributes.is_a?(Organization)
                      organization_attributes
                    else
                      Organization.new(organization_attributes)
                    end
  end

  private

  def email_uniqueness
    return true if persisted?

    if User.where(:email => email).length > 0
      errors.add :email,    'already exists'
    end
  end
end
