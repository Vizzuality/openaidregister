class Session
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :email, :password, :user

  validate :email,    :presence => true
  validate :password, :presence => true
  validate :credentials_must_be_valid

  def persisted?
    false
  end

  def initialize(attributes = {})
    self.email    = attributes[:email]
    self.password = attributes[:password]
  end

  private

  def credentials_must_be_valid
    self.user = User.with_credentials(email, password)

    unless self.user.present? && self.user.persisted?
      errors.add :email,    'Invalid email'
      errors.add :password, 'Invalid password'
    end
  end
end
