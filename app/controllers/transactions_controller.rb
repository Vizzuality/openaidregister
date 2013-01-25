class TransactionsController < ApplicationController
  acts_as_project_resource

  def new
    @transaction       = Transaction.new(:project_id => @project.id)
    @transaction_types = OpenAidRegister::TRANSACTION_TYPES
    @currencies        = OpenAidRegister::CURRENCIES
  end

  def create
    @transaction = Transaction.new(params[:transaction])
  end

end
