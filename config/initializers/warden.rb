Rails.configuration.middleware.use RailsWarden::Manager do |manager|
  manager.default_strategies :password
  manager.failure_app = SessionsController
end

# Setup Session Serialization
class Warden::SessionSerializer
  def serialize(user)
    user.name
  end

  def deserialize(name)
    User.find_by_name(name)
  end
end

Warden::Strategies.add(:password) do

  def valid?
    params && params[:session] && params[:session][:email].present? || params[:session][:password].present?
  end

  def authenticate!
    if user = Session.create(params[:session])
      success!(user)
    else
      fail!
    end
  end
end

