class Project < CartodbModel

  attr_accessor :user_id,
                :name,
                :id_in_organization,
                :description,
                :organization_role_id,
                :language_id,
                :sectors,
                :subsectors,
                :start_date,
                :end_date,
                :budget,
                :budget_currency_id,
                :contact_person,
                :collaboration_type,
                :tied_status,
                :aid_type,
                :flow_type,
                :finance_type,
                :url,
                :lat,
                :lon,
                :transaction,
                :sectors_list,
                :project_locations

  validates :name,               :presence => true
  validates :id_in_organization, :presence => true

  def sectors=(value)
    @sectors = (value || '').split(',').map(&:to_i)
  end

  def subsectors=(value)
    @subsectors = (value || '').split(',').map(&:to_i)
  end

  def sectors
    (@sectors || []).map{|s| OpenAidRegister::SECTORS.select{|ss| ss.cartodb_id == s}.first}
  end

  def subsectors
    (@subsectors || []).map{|s| OpenAidRegister::SUBSECTORS.select{|ss| ss.cartodb_id == s}.first}
  end

  def budget_currency
    OpenAidRegister::CURRENCIES.select{|ss| ss.cartodb_id == @budget_currency_id}.first
  end

  def language
    OpenAidRegister::LANGUAGES.select{|ss| ss.cartodb_id == @language_id}.first
  end

  def organization_role
    OpenAidRegister::ORGANIZATION_ROLES.select{|ss| ss.cartodb_id == @organization_role_id}.first
  end

  def external_organizations
    InvolvedOrganizations.where(:project_id => id)
  end

  def sectors_list
    (subsectors || []).map{|s| ["#{OpenAidRegister::SECTORS.select{|ss| ss.cartodb_id == s.sector_id}.first.name}, #{s.name}}", "#{s.sector_id},#{s.cartodb_id}"]}
  end

  def project_locations
    @projects_locations ||= ProjectLocation.where(:project_id => id.to_i)
  end

  def locations_list
    project_locations.map {|point| ["(#{point.y}, #{point.x})", [point.y, point.x].join(',')] }
  end

  def lat=(value)
    attributes[:lat] = value
  end

  def lon=(value)
    attributes[:lon] = value
  end

  def sectors_list=(values)
    sectors    = []
    subsectors = []
    values.each do |value|
      sectors << value.split.first
      subsectors << value.split.last
    end
    @sectors    = sectors
    @subsectors = subsectors
  end

  def locations_list=(coordinates)
    return if coordinates.blank?

    self.project_locations = coordinates.map do |coordinate|
      next if coordinate.blank?

      lat, lon, location = */([^,]*),([^(]*)(?:\((.*)\))?/.match(coordinate).captures


      point = RGeo::GeoJSON.decode({:type        => 'Point', :coordinates => [lon, lat]}.to_json,
                                    :json_parser => :json,
                                    :geo_factory => ::RGeo::Cartesian.simple_factory(:srid => 4326)
                                  )

      ProjectLocation.new('project'  => self,
                          'location' => location,
                          'the_geom' => point)
    end.compact
  end

  def save
    if self.valid?
      super
      if @project_locations.present? && @project_locations.valid?
        @project_locations.save
      end
    end

    self
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
    if (start_date <=> Date.current) == 1
      return [1, 'Pipeline']
    elsif (end_date == nil) || (end_date <=> Date.current) == 1
      return [2, 'Implementing']
    else
      return [3, 'Completion']
    end
  end

  def coords
    project_locations.map{|point| point.to_coord} if project_locations.present?
  end

  def to_param
    cartodb_id
  end

  def as_json(options = {})
    options.merge({
      :cartodb_id => cartodb_id,
      :name       => name,
      :start_date => start_date,
      :end_date   => end_date,
      :coords     => coords,
      :state =>     state,
      :positions => coords
    })
  end
end
