class Transaction < CartodbModel

  attr_accessor :type,
                :date,
                :value,
                :value_currency,
                :provider,
                :receiver,
                :description,
                :add,
                :cancel

  def transaction_type
    (TransactionType.all.select{|t| t.id == type.to_i} || []).first if type
  end

  def currency
    (Currency.all.select{|c| c.id == value_currency.to_i} || []).first if value_currency
  end

  def date
    @date = nil
    year  = Integer(attributes['date(1i)']) rescue nil
    month = Integer(attributes['date(2i)']) rescue nil
    day   = Integer(attributes['date(3i)']) rescue nil
    @date = Date.new(year, month, day) if year.present? && month.present? && day.present?
    @date
  end
end
