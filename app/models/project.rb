class Project < CartodbModel
  include ActiveModel::Validations

  attr_accessor :name,
                :id_in_organization,
                :description,
                :organization_role,
                :language,
                :sector,
                :subsector,
                :start_date,
                :end_date,
                :budget,
                :budget_currency,
                :contact_person,
                :url

end
