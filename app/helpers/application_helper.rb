module ApplicationHelper

  def to_select_options(collection)
    collection.map{|record| [record.name, record.cartodb_id]}
  end

  def options_from_collection_for_select_with_attributes(collection, value, text, extra_attributes = {})
    extra_attributes_with_model_mappings = Hash[extra_attributes.map{|k,v| [k, lambda{|model| model.send(v.to_sym)}]}]
    value_attribute                      = {'value' => lambda{|model| model.send(value.to_sym)}}
    option_attributes                    = value_attribute.merge(extra_attributes_with_model_mappings)

    collection.map do |model|
      content_tag :option, model.send(text.to_sym), Hash[option_attributes.map{|k,v| [k, v.call(model)]}]
    end.join("\n")
  end

  def error_message(model, field)
    error = model.errors[field]
    if error.present?
      content_tag :span, error.first, :class => 'error'
    end
  end

  def list_for_collection(collection, &block)
    if collection.blank?
      content_tag :div, :class => 'no-results' do
        yield if block_given?
      end
    else
      render collection
    end
  end

end
