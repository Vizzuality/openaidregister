class ProjectResultsController < ApplicationController
  acts_as_project_resource

  def new
    @project_result = ProjectResult.new(:project_id => @project.id)
  end

  def create
    @project_result = ProjectResult.new(params[:project_result])
  end
end
