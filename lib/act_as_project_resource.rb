module ActAsProjectResource

  def acts_as_project_resource
    include InstanceMethods

    layout false
    
    before_filter :get_project
  end

  module InstanceMethods
    def get_project
      @project = Project.find_by_id(params[:project_id])
    end
  end

end
