class Organization < CartodbModel

  attr_accessor :name,
                :website,
                :type_id,
                :country_id,
                :government_id

  def country
    OpenAidRegister::COUNTRIES.select{|ss| ss.cartodb_id == @country_id}.first
  end
end
