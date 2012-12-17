class Project
  include ActiveModel::Validations

  attr_accessor :name,
                :id_in_organization,
                :description,
                :organization_role,
                :language,
                :sector,
                :start_date,
                :end_date,
                :budget,
                :contact_person,
                :url

end
