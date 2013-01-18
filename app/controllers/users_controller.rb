class UsersController < ApplicationController

  def new
    @user               = User.new
    @user.organization  = Organization.new
    @organization_types = OrganizationType.all
    @countries          = Country.all
  end

  def create
    @user = User.new(params[:user])

    if @user.valid?
      @user.save

      redirect_to @user
    else
      @organization_types = OrganizationType.all
      @countries          = Country.all
      render :new
    end
  end

end
