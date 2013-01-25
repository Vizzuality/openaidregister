class ProjectResult < CartodbModel

  attr_accessor :concept,
                :current,
                :target,
                :start_date,
                :end_date,
                :description,
                :project_id

  def start_date
    @start_date = nil
    year  = Integer(attributes['start_date(1i)']) rescue nil
    month = Integer(attributes['start_date(2i)']) rescue nil
    day   = Integer(attributes['start_date(3i)']) rescue nil
    @start_date = Date.new(year, month, day) if year.present? && month.present? && day.present?
    @start_date
  end

  def end_date
    @end_date = nil
    year  = Integer(attributes['end_date(1i)']) rescue nil
    month = Integer(attributes['end_date(2i)']) rescue nil
    day   = Integer(attributes['end_date(3i)']) rescue nil
    @end_date = Date.new(year, month, day) if year.present? && month.present? && day.present?
    @end_date
  end
end
