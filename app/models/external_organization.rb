class ExternalOrganization < CartodbModel

  attr_accessor :name,
                :role_id

  def role
    (OrganizationRole.all.select{|t| t.cartodb_id == role_id.to_i} || []).first if role_id
  end

end
