module ActsAsOrganizationResource

  def acts_as_organization_resource
    include InstanceMethods

    layout false

    before_filter :get_user
    before_filter :get_organization
  end

  module InstanceMethods
    def get_user
      @user = current_user
    end

    def get_organization
      @organization = Organization.find_by_id(params[:organization_id])
    end
  end

end
