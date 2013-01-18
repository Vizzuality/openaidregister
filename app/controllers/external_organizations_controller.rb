class ExternalOrganizationsController < ApplicationController
  def new
    @organization = ExternalOrganization.new
    @roles        = OrganizationRole.all
  end

  def create
    @organization = ExternalOrganization.new(params[:external_organization])
  end
end
