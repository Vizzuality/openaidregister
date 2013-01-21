class Session
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :email, :password

  def persisted?
    false
  end

  def self.create(attributes)
    email    = attributes[:email]
    password = attributes[:password]

    if email.present? && password.present?
      return User.with_credentials(email, password)
    end

    false
  end
end
