module ApplicationHelper

  def to_select_options(collection)
    collection.map{|record| [record.name, record.cartodb_id]}
  end

  def error_message(model, field)
    error = model.errors[field]
    if error.present?
      content_tag :span, error.first, :class => 'error'
    end
  end

end
