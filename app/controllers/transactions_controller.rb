class TransactionsController < ApplicationController
  acts_as_project_resource

  def new
    @transaction       = Transaction.new(:project_id => @project.id)
    @transaction_types = TransactionType.all
    @currencies        = Currency.all
  end

  def create
    @transaction = Transaction.new(params[:transaction])
  end

end
