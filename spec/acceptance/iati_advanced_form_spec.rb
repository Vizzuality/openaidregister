require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "IATI advanced form", :type => :feature do

  before do
    visit edit_project_path(:id => 1)
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

  end

end
