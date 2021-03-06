class ExternalOrganizationsController < ApplicationController
  acts_as_project_resource

  def new
    @organization = ExternalOrganization.new(:project_id => @project.id)
    @roles        = OpenAidRegister::ORGANIZATION_ROLES
  end

  def create
    @organization = ExternalOrganization.new(params[:external_organization])
  end
end
