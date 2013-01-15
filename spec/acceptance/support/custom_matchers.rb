module CustomMatchers
  extend RSpec::Matchers::DSL

  def have_label(text)
    have_selector('label', :text => text)
  end

  def should_have_hint(text)
    hint = find('.hint')
    hint['data-hint'].should be == text
  end

  def have_sector(sector, subsector)
    within '.sectors_to_add' do
      have_selector('.sectors_to_add_sector',    :text => sector)
      have_selector('.sectors_to_add_subsector', :text => sector)
    end
  end

  def have_subtitle(subtitle)
    have_selector('h3', :text => subtitle)
  end

  def have_section_title(title)
    have_selector('h4', :text => title)
  end

  matcher :have_sector do |sector, subsector|
    match_for_should { |node| node.has_selector?(".sector", :text => text) }
    match_for_should_not { |node| node.has_no_selector?(".comment", :text => text) }
  end


  def should_have_a_transactions_section
    within '.transactions' do

      page.should have_section_title('Transactions')
      find('.hint')['data-hint'].should be == 'Wadus'
      page.should have_content 'No transactions provided yet.'
      page.should have_link 'Add'
    end
  end

  def should_create_a_new_transaction
    within '.transactions' do
      click_link 'Add'
    end

    within '.new-transaction' do

      select   'Acquisition', :from => 'Type'
      select   '2013',        :from => 'transaction_date_1i'
      select   'January',     :from => 'transaction_date_2i'
      select   '1',           :from => 'transaction_date_3i'
      fill_in  'Value',       :with => '1000000'
      fill_in  'Provider',    :with => 'Wadus provider'
      fill_in  'Receiver',    :with => 'Wadus receiver'
      fill_in  'Description', :with => 'Wadus description'

      page.should have_link   'Cancel'

      click_on 'Add'
    end

    within '.transaction' do
      page.should have_selector '.type',              :text => 'Acquisition on Jan 1, 2013'
      page.should have_selector '.provider_receiver', :text => 'Wadus provider > Wadus receiver'
      page.should have_selector '.value',             :text => '1M $USD'
      page.should have_link     'remove'
    end

    visit edit_project_path(:id => 1)
  end

  def should_have_an_involved_organizations_section
    within '.involved-organizations' do

      page.should have_section_title('Involved organizations')
      find('.hint')['data-hint'].should be == 'Wadus'
      page.should have_content 'No organizations informed yet.'
      page.should have_link 'Add'
    end
  end

  def should_create_a_new_involved_organization
    within '.involved-organizations' do
      click_link 'Add'
    end

    within '.new-organization' do

      fill_in  'Organization name', :with => 'Acme'
      select   'Wadus',             :from => 'Role'

      page.should have_link   'Cancel'

      click_on 'Add'
    end

    within '.organization' do
      page.should have_selector '.name', :text => 'Acme'
      page.should have_selector '.role', :text => 'Wadus'
      page.should have_link     'remove'
    end

    visit edit_project_path(:id => 1)
  end

  def should_have_a_related_documents_section
    within '.related-documents' do

      page.should have_section_title('Related documents')
      find('.hint')['data-hint'].should be == 'Wadus'
      page.should have_content 'No documents provided yet.'
      page.should have_link 'Add'
    end
  end

  def should_create_a_new_related_document

    within '.related-documents' do
      click_link 'Add'
    end

    within '.new-document' do

      attach_file  'Document file', wadus_document_file_path
      select   'Wadus type',        :from => 'Document type'

      page.should have_link   'Cancel'

      click_on 'Add'
    end

    within '.document' do
      page.should have_selector '.file',              :text => 'wadus.pdf'
      page.should have_selector '.type', :text => 'Wadus type'
      page.should have_link     'remove'
    end

    visit edit_project_path(:id => 1)
  end

  def should_have_a_project_results_section
    within '.project-results' do

      page.should have_section_title('Project results')
      find('.hint')['data-hint'].should be == 'Wadus'
      page.should have_content 'No project results informed yet.'
      page.should have_link 'Add'
    end
  end

  def should_create_a_new_project_result

    within '.project-results' do
      click_link 'Add'
    end

    within '.new-project-result' do

      fill_in  'Concept', :with => 'Wadus'
      fill_in  'Current', :with => 3
      fill_in  'Target',  :with => 5

      select   '2013',    :from => 'project_result_start_date_1i'
      select   'January', :from => 'project_result_start_date_2i'
      select   '1',       :from => 'project_result_start_date_3i'

      select   '2013',    :from => 'project_result_end_date_1i'
      select   'January', :from => 'project_result_end_date_2i'
      select   '10',      :from => 'project_result_end_date_3i'

      #fill_in  'Description', :with => 'Wadus description'

      page.should have_content 'Use free-text description instead?'
      page.should have_link 'free-text description'

      page.should have_css 'p', :text => 'Use tabbed result description instead?', :visible => false
      page.should have_link 'tabbed result description', :visible => false

      page.should have_link   'Cancel'

      click_on 'Add'
    end

    within '.project-result' do
      page.should have_selector '.concept',        :text => 'Wadus'
      page.should have_selector '.current_target', :text => '3% > 5%'
      page.should have_selector '.time',           :text => '9 days'
      page.should have_link     'remove'
    end

    visit edit_project_path(:id => 1)
  end
end

RSpec.configure{ |config| config.include CustomMatchers }
