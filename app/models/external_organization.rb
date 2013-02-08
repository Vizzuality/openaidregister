class ExternalOrganization < CartodbModel

  attr_accessor :name,
                :role_id,
                :project_id

  def role
    OpenAidRegister::ORGANIZATION_ROLES.select{|ss| ss.cartodb_id == @role_id}.first
  end

  def self.grouped_by_project_id(projects)
    external_organizations = query("SELECT * FROM #{table_name} WHERE project_id IN (#{projects.map(&:id).join(',')})")
    external_organizations.group_by{|eo| eo.project_id}
  end

end
