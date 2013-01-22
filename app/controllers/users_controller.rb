class UsersController < ApplicationController

  def show
    @projects = current_user.projects
  end

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

      warden.set_user(@user)

      redirect_to @user
    else
      @organization_types = OrganizationType.all
      @countries          = Country.all
      render :new
    end
  end

end
