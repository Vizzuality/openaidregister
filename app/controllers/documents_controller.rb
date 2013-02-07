class DocumentsController < ApplicationController
  acts_as_project_resource
  acts_as_organization_resource

  before_filter :record_for_form, :only => [:new]

  def new
    @types    = OpenAidRegister::TYPES
  end

  def create
    @document = Document.new(params[:document])
  end

  private

  def resource
    @resource ||= (@project || @organization)
  end

  def record_for_form
    @document = Document.new(:project_id => resource.id, :organization_id => resource.id)

    @record_for_form ||= if @project.present?
      [@project, @document]
    elsif @organization.present?
      [@user, @organization, @document]
    end
  end

end
