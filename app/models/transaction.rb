class Transaction < CartodbModel

  attr_accessor :type,
                :date,
                :value,
                :value_currency,
                :provider,
                :receiver,
                :description,
                :project_id

  def transaction_type
    TransactionType.find_by_id(type)
  end

  def currency
    Currency.find_by_id(value_currency)
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
