class Project < CartodbModel

  attr_accessor :user_id,
                :name,
                :id_in_organization,
                :description,
                :organization_role,
                :language,
                :sectors,
                :subsectors,
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
                :lon,
                :transaction,
                :sectors_list

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

  def sectors_list
    (subsectors || []).map{|s| ["#{OpenAidRegister::SECTORS.select{|ss| ss.cartodb_id == s.sector_id}.first.name}, #{s.name}}", "#{s.sector_id},#{s.cartodb_id}"]}
  end

  def locations_list
    (the_geom || []).map {|point| ["(#{point.y}, #{point.x})", [point.y, point.x].join(',')] }
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

    geojson = {:type => 'MultiPoint', :coordinates => coordinates.select(&:'present?').map{|c| c.split(',')}}.to_json
    @the_geom = RGeo::GeoJSON.decode(geojson,
                                     :json_parser => :json,
                                     :geo_factory => ::RGeo::Cartesian.simple_factory(:srid => 4326)
                                    )
    attributes[:the_geom] = @the_geom
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
      if end_date.to_time > Time.now
        return 'ongoing'
      else
        return 'past'
      end
    end
  end

  def coords
    the_geom.map{|point| [point.y, point.x]}.to_json
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
