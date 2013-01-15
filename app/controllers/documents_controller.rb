class DocumentsController < ApplicationController
  def new
    @document = Document.new
    @types    = DocumentType.all
  end

  def create
    @document = Document.new(params[:document])
  end
end
