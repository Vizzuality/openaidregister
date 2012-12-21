class ProjectsController < ApplicationController

  def new
    @project = Project.new
  end

  def edit
    @project = Project.new
  end

end
