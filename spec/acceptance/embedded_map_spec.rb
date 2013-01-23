require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "Embedded map", :type => :feature do

  before do
    @user = User.create( :name     => 'pepe smith',
                         :email    => 'pepe@wadus.com',
                         :password => 'wadus' )

    10.times do |i|
      Project.create(
        :user_id    => @user.cartodb_id,
        :name       => "Wadus #{i}",
        :start_date => 1.year.ago,
        :end_date   => [1.day.since, 1.day.ago, Time.now].sample,
        :lat        => [*-90..90].sample,
        :lon        => [*-180..180].sample
      )
    end

  end

  it 'shows all user projects in the map', :js => true do
    log_in_as @user

    click_on 'share'

    peich
    page.should have_css '.map'
    projects_json = page.evaluate_script('projects');
    Project.all.each do |project|
      projects_json.should include(project.to_json)
    end
  end

end

