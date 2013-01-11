module ApplicationHelper

  def to_select_options(collection)
    collection.map{|record| [record.name, record.cartodb_id]}
  end

end
