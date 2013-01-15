class ProjectResultsController < ApplicationController
  def new
    @project_result = ProjectResult.new
  end

  def create
    @project_result = ProjectResult.new(params[:project_result])
  end
end
