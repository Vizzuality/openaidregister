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

    within '.transactions' do

      page.should have_section_title('Transactions')
      page.should have_hint 'Wadus'
      page.should have_content 'No transactions provided yet.'
      page.should have_link 'Add'

      click_link 'Add'

    end

    within '.new_transaction' do

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

    #context 'involved organizations' do

      #subject { find('.involved-organizations') }

      #it { should have_section_title('involved-organizations', 'Involved organizations') }
      #it { should have_hint 'Wadus' }
      #it { should have_content 'No organizations informed yet.' }
      #it { should have_link 'Add' }

    #end

    #context 'related documents' do

      #subject { find('.related-documents') }

      #it { should have_section_title('related-documents', 'Related documents') }
      #it { should have_hint 'Wadus' }
      #it { should have_content 'No documents provided yet.' }
      #it { should have_link 'Add' }

    #end

    #context 'project results' do

      #subject { find('.project-results') }

      #it { should have_section_title('project-results', 'Project results') }
      #it { should have_hint 'Wadus' }
      #it { should have_content 'No project results informed yet.' }
      #it { should have_link 'Add' }

    #end
  end

end
