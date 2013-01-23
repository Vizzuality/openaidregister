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
                :the_geom,
                :lat,
                :lon

  def initialize(attributes = {})
    super(attributes)
    self.lat = the_geom.y if the_geom.present?
    self.lon = the_geom.x if the_geom.present?
  end

  def lat=(value)
    attributes[:lat] = value
  end

  def lon=(value)
    attributes[:lon] = value
  end

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
    "#{lat}, #{lon}"
  end

  def to_param
    cartodb_id
  end

  def as_json(options = {})
    options[:only] ||= [:cartodb_id,
                        :name,
                        :start_date,
                        :end_date,
                        :lat,
                        :lon]
    super(options)
  end
end
