class SessionsController < ApplicationController

  def new
    @session = Session.new
  end

  def create
    if warden.authenticate
      redirect_to warden.user
    else
      render :new
    end
  end

end
