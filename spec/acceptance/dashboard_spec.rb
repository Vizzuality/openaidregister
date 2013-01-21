require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "Dashboard", :type => :feature do

  context "with existing projects" do

    before(:all) do

    end

    it 'shows a map and a list of projects' do
      visit user_path(:id => 1)

      page.should have_link 'Add new project'

      within '.publishing-tools' do
        page.should have_content 'Publishing tools'
        page.should have_link 'Export'
        page.should have_link 'Share'
      end

      page.should have_css '#map'

      within '.search-form' do
        page.should have_field 'search-field'
        page.should have_content 'view'
        page.should have_link 'All'
        page.should have_link 'Ongoing'
        page.should have_link 'Past'
      end

      page.should have_css 'ul.projects-list li', :length => 10

      Project.all.each do |project|
        page.should have_css 'ul li .name', :text => project.name
        page.should have_css 'ul li .state', :text => project.state
      end

    end

  end

end
