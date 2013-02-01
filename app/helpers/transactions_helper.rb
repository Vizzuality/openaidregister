module TransactionsHelper

  def transaction_type(transaction)
    type = transaction.transaction_type.name
    at   = l(transaction.date, :format => :month_day_year)
    t('.transaction_type', :type => type, :at => at)
  end

  def transaction_value(transaction)
    value    = number_to_human(transaction.value, :units => :custom_ammounts).gsub(/\s/, '')
    currency = transaction.currency.name
    t('.transaction_value', :value => value, :currency => currency)
  end

end
