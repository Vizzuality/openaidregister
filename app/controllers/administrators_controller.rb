class AdministratorsController < ApplicationController
  acts_as_organization_resource

  def new
    @administrator = Administrator.new(:organization_id => @organization.id)
  end

  def create
    @administrator = Administrator.new(params[:administrator])
  end
end
