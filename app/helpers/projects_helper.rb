module ProjectsHelper

  def field_translation(model, field_name)
    model_class = model.to_s.capitalize.constantize
    "#{model_class.model_name.human} #{model_class.human_attribute_name(field_name)}"
  end

end
