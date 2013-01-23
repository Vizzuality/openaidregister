class Project < CartodbModel

  attr_accessor :user_id,
                :name,
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
                :the_geom

  def self.for_user(user_id)
    query(<<-SQL)
      SELECT *
      FROM projects
      WHERE user_id = #{user_id};
    SQL
  end

  def user
    User.find_by_id(user_id)
  end

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
    "#{[*-90..90].sample}, #{[*-180..180].sample}"
  end

  def to_param
    cartodb_id
  end
end
