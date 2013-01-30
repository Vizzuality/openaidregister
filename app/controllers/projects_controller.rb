class ProjectsController < ApplicationController
  before_filter :get_user, :only => :index
  before_filter :get_project, :only => [:show, :edit, :update, :destroy]

  layout :layout_if_ajax?

  def index
    @projects = if @user.present? && @user.persisted?
                  @user.projects
                else
                  []
                end
  end

  def show

  end

  def new
    @project            = Project.new(:sectors => '40,41,42', :subsectors => '199,203,206')
    @url                = projects_path
    @organization_roles = OpenAidRegister::ORGANIZATION_ROLES
    @languages          = OpenAidRegister::LANGUAGES
    @sectors            = OpenAidRegister::SECTORS
    @subsectors         = OpenAidRegister::SUBSECTORS
    @currencies         = OpenAidRegister::CURRENCIES
  end

  def create
    require 'debugger'; debugger
    @project = Project.new(params[:project])

    if @project.save

      #flash[:notice] = 'Your project has been registered. Thanks!'

      #Notifications.new_story(@project).deliver

      redirect_to edit_project_path(@project)
    else
      render :new
    end
  end

  def edit
    @collaboration_types = OpenAidRegister::COLLABORATION_TYPES
    @aid_types           = OpenAidRegister::AID_TYPES
    @flow_types          = OpenAidRegister::FLOW_TYPES
    @finance_types       = OpenAidRegister::FINANCE_TYPES
  end

  def update

    if @project.update_attributes(params[:project])
      flash[:info] = new_project_path
      redirect_to current_user
    else
      @collaboration_types = OpenAidRegister::COLLABORATION_TYPES
      @aid_types           = OpenAidRegister::AID_TYPES
      @flow_types          = OpenAidRegister::FLOW_TYPES
      @finance_types       = OpenAidRegister::FINANCE_TYPES
      render :edit
    end

  end

  private

  def get_project
    @project = Project.find_by_id(params[:id])
  end

end
