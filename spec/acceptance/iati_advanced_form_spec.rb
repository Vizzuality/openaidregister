require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "IATI advanced form", :type => :feature do

  before do
    @user = User.create( :name     => 'pepe smith',
                         :email    => 'pepe@wadus.com',
                         :password => 'wadus' )
    log_in_as @user

    @project =  Project.create(
        :user_id    => @user.cartodb_id,
        :name       => "Wadus project",
        :start_date => 1.year.ago.to_date,
        :end_date   => [1.day.since, 1.day.ago, Time.now].sample.to_date,
        :lat        => [*-90..90].sample,
        :lon        => [*-180..180].sample
      )

    visit edit_project_path(@project)
  end

  it do

    within '.header' do
      page.should have_subtitle 'Congrats, your projects has been registered!'
      page.should have_content 'The basic information has been registered. However, we encorage you to provide more.'
      page.should have_link 'complete information'
      page.should have_link 'add another project'
    end

    should_have_a_transactions_section

    should_have_an_involved_organizations_section

    should_have_a_related_documents_section

    should_have_a_project_results_section

    should_create_a_new_transaction

    should_create_a_new_involved_organization

    should_create_a_new_related_document

    should_create_a_new_project_result

    within '.organization-information' do
      page.should have_content 'organization information'

      select 'Wadus collaboration type',   :from => 'Collaboration type'

      within 'fieldset' do
        page.should have_content 'Tied status'

        choose 'Tied'
      end

      select 'Wadus aid type',   :from => 'Aid type'
      select 'Wadus flow type',   :from => 'Flow type'
      select 'Wadus finance type',   :from => 'Finance type'
    end

    click_on 'Save changes'

    project = Project.all.last

    project.collaboration_type.should be == 1
    project.tied_status.should        be == 3
    project.aid_type.should           be == 1
    project.flow_type.should          be == 1
    project.finance_type.should       be == 1

  end

end
