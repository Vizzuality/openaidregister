class Document < CartodbModel
  attr_accessor :file,
                :type_id,
                :project_id

  def type
    (DocumentType.all.select{|t| t.cartodb_id == type_id.to_i} || []).first if type_id
  end
end
