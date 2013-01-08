class ProjectsController < ApplicationController

  def show

  end

  def new
    @project = Project.new
    @url     = projects_path
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
    @project = Project.new
  end

end
