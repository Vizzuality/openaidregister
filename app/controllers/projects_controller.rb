class ProjectsController < ApplicationController
  before_filter :get_user, :only => :index

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
    @project            = Project.new
    @url                = projects_path
    @organization_roles = OrganizationRole.all
    @languages          = Language.all
    @sectors            = Sector.all
    @subsectors         = Subsector.all
    @currencies         = Currency.all
  end

  def create
    @project = Project.new(params[:project])

    if @project.valid?
      @project.save

      #flash[:notice] = 'Your project has been registered. Thanks!'

      #Notifications.new_story(@project).deliver

      redirect_to project_path(@project)
    else
      render :new
    end
  end

  def edit
    @project             = Project.new
    @collaboration_types = CollaborationType.all
    @aid_types           = AidType.all
    @flow_types          = FlowType.all
    @finance_types       = FinanceType.all
  end

end
