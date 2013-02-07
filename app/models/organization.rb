class Organization < CartodbModel

  attr_accessor :name,
                :website,
                :type_id,
                :country_id,
                :government_id

  def country
    OpenAidRegister::COUNTRIES.by_id(@country_id)
  end

  def budgets
    @budgets ||= Budget.where(:organization_id => id)
  end

  def documents
    @documents ||= Document.where(:organization_id => id)
  end

  def administrators
    @administrators ||= Administrator.where(:organization_id => id)
  end
end
