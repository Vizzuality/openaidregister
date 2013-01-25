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
        :start_date => 1.year.ago.to_date,
        :end_date   => [1.day.since, 1.day.ago, Time.now].sample.to_date,
        :lat        => [*-90..90].sample,
        :lon        => [*-180..180].sample
      )
    end

  end

  it 'shows all user projects in the map', :js => true do
    log_in_as @user

    visit user_projects_path(@user)

    page.should have_css '.map'
    projects_json = page.evaluate_script('projects');
    Project.all.each_with_index do |project, index|
      project_json = projects_json[index]

      project_json['cartodb_id'].should be == project.cartodb_id
      project_json['name'].should       be == project.name
    end
  end

end

