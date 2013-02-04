class ProjectsController < ApplicationController
  before_filter :get_user, :only => :index
  before_filter :get_project, :only => [:show, :edit, :update, :destroy]

  layout :layout_if_ajax?

  def index
    @projects = current_user.projects
    @organization = current_user.organization || Organization.new
    @external_organizations = ExternalOrganization.grouped_by_project_id(@projects)
  end

  def show

  end

  def new
    #@project            = Project.new(:sectors    => '40,41,42',
                                      #:subsectors => '199,203,206',
                                      #:the_geom   => RGeo::GeoJSON.decode('{"type":"MultiPoint","coordinates":[[-3.00, 43.001], [43.00, 5.001], [3.00, 8.001]]}', :json_parser => :json))

    @project            = Project.new
    @url                = projects_path
    @organization_roles = OpenAidRegister::ORGANIZATION_ROLES
    @languages          = OpenAidRegister::LANGUAGES
    @sectors            = OpenAidRegister::SECTORS
    @subsectors         = OpenAidRegister::SUBSECTORS
    @currencies         = OpenAidRegister::CURRENCIES
  end

  def create
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
