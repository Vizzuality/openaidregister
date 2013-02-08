class ProjectLocation < CartodbModel
  attr_accessor :the_geom,
                :location,
                :project_id,
                :project

  def to_coord

    point = if the_geom.present?
              [the_geom.y, the_geom.x].join(',')
            else
              nil
            end

    location = if self.location.present?
                 "(#{self.location})"
               else
                 nil
               end

    "#{point}#{location}"
  end

  def save
    attributes['project_id'] = self.project_id = project.id
    super
  end

end
