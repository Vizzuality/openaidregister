class TransactionsController < ApplicationController

  def new
    @transaction       = Transaction.new
    @transaction_types = TransactionType.all
    @currencies        = Currency.all
  end

  def create
    @transaction = Transaction.new(params[:transaction])
  end

end
