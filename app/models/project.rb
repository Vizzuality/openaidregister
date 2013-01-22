class Project < CartodbModel

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
                :collaboration_type,
                :tied_status,
                :aid_type,
                :flow_type,
                :finance_type,
                :url,
                :lat,
                :lon

  def state
    if end_date.present?
      if end_date > Time.now
        return 'ongoing'
      else
        return 'past'
      end
    end
  end

  def coords
    "#{lat}, #{lon}"
  end

  def to_param
    cartodb_id
  end
end
