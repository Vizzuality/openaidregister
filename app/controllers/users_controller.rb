class UsersController < ApplicationController
  skip_before_filter :login_required, :only => [:new, :create]

  def show
    @projects = current_user.projects
  end

  def new
    @user               = User.new
    @user.organization  = Organization.new
    @organization_types = OpenAidRegister::ORGANIZATION_TYPES
    @countries          = OpenAidRegister::COUNTRIES
  end

  def create
    @user = User.new(params[:user])

    if @user.save

      warden.set_user(@user)

      flash[:info] = new_project_path
      redirect_to @user
    else
      @organization_types = OpenAidRegister::ORGANIZATION_TYPES
      @countries          = OpenAidRegister::COUNTRIES
      render :new
    end
  end

  def edit
    @user               = current_user
    @user.organization  ||= Organization.new
    @organization_types = OpenAidRegister::ORGANIZATION_TYPES
    @countries          = OpenAidRegister::COUNTRIES
  end

  def update
    @user = current_user

    if @user.update_attributes(params[:user])

      redirect_to @user
    else
      @user.organization  ||= Organization.new
      @organization_types = OpenAidRegister::ORGANIZATION_TYPES
      @countries          = OpenAidRegister::COUNTRIES
      render :edit
    end
  end
end
