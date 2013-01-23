class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :login_required

  def login_required
    unless authenticated?
      redirect_to root_path
    end
  end

  def get_user
    if params[:user_id]
      @user = User.find_by_id(params[:user_id])
    end
  end
end
