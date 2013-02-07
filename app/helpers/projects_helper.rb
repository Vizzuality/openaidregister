module ProjectsHelper

  def field_translation(model, field_name)
    model_class = model.to_s.capitalize.constantize
    "#{model_class.model_name.human} #{model_class.human_attribute_name(field_name)}"
  end

  def json_for_new_project(new_project)
    new_project.to_json(:url => project_path(new_project), :auth_token => form_authenticity_token.inspect).html_safe
  end

end
