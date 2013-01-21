require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "Dashboard", :type => :feature do

  context "with existing projects" do

    before do
      @user = User.create( :name     => 'pepe smith',
                           :email    => 'pepe@wadus.com',
                           :password => 'wadus' )
    end

    it 'shows a map and a list of projects' do
      log_in_as @user

      page.should have_link 'add new project'

      within '.publishing-tools' do
        page.should have_content 'publishing tools'
        page.should have_link 'export'
        page.should have_link 'share'
      end

      page.should have_css '#projects_map'

      within '.search-form' do
        page.should have_field 'projects_search'
        page.should have_content 'view'
        page.should have_link 'all'
        page.should have_link 'ongoing'
        page.should have_link 'past'
      end

      all('ul#projects_list li').length.should be == 10

      Project.all.each do |project|
        page.should have_css 'ul li .name', :text => project.name
        page.should have_css 'ul li .state', :text => project.state
      end

    end

  end

end
