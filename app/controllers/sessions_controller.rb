class SessionsController < ApplicationController
  skip_before_filter :login_required, :only => [:new, :create]

  def new
    @session = Session.new
  end

  def create
    @session = Session.new(params[:session])

    if @session.valid?
      warden.set_user @session.user
      redirect_to warden.user
    else
      render :new
    end
  end

  def destroy
    logout

    redirect_to root_path
  end
end
