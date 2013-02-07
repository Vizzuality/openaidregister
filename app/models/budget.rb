class Budget < CartodbModel
  attr_accessor :start_date,
                :end_date,
                :value,
                :currency_type_id,
                :organization_id

  def currency
    Currency.find_by_id(currency_type_id)
  end

  def start_date=(value)
    @start_date = parse_date(value)
    attributes['start_date'] = @start_date
  end

  def end_date=(value)
    @end_date = parse_date(value)
    attributes['end_date'] = @end_date
  end

end

