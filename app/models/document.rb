class Document < CartodbModel
  attr_accessor :file,
                :type_id,
                :project_id,
                :organization_id

  def type
    OpenAidRegister::TYPES.by_id(type_id)
  end
end
