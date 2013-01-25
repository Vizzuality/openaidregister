class DocumentsController < ApplicationController
  acts_as_project_resource

  def new
    @document = Document.new(:project_id => @project.id)
    @types    = DocumentType.all
  end

  def create
    @document = Document.new(params[:document])
  end
end
