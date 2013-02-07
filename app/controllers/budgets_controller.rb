class BudgetsController < ApplicationController
  acts_as_organization_resource

  def new
    @budget     = Budget.new(:organization_id => @organization.id)
    @currencies = OpenAidRegister::CURRENCIES
  end

  def create
    @budget = Budget.new(params[:budget])
  end
end
