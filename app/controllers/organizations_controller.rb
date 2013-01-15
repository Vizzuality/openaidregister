class OrganizationsController < ApplicationController
  def new
    @organization = Organization.new
    @roles        = OrganizationRole.all
  end

  def create
    @organization = Organization.new(params[:organization])
  end
end
