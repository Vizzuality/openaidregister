puts 'entra'
require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "IATI form", :type => :feature do

  before do
    visit new_project_path
    save_and_open_page
  end

  describe 'basic version' do
    subject { page }

    it { should have_field 'Project name' }

    it { should have_field 'Project id in the organization' }

    it { should have_field 'Project description' }

    it { should have_field 'organization role in the project' }

    it { should have_field 'language combo' }

    it { should have_field 'sector combo' }

    it { should have_field 'Project start date' }

    it { should have_field 'Project end date' }

    it { should have_field 'budget' }

    #it {'location map'}

    it { should have_field 'contact person' }

    it { should have_field 'Project url' }

    describe 'Project name field' do
    end

    describe 'Project id in the organization field' do

    end

    describe 'Project description field' do

    end

    describe 'organization role in the project combo' do

    end

    describe 'language combo' do

    end

    describe 'sector combo' do

    end

    describe 'Project start date field' do

    end

    describe 'Project end date field' do

    end

    describe 'budget field' do

    end

    describe 'location map' do

    end

    describe 'contact person field' do

    end

    describe 'Project url field' do

    end

    it 'allows to register the project'

  end

  describe 'advanced version' do
    describe 'allows to add transactions field' do

    end

    describe 'allows to add other involved associations field' do

    end

    describe 'allows to add related documents field' do

    end

    describe 'allows to add project results field' do

    end

    describe 'organizational information section field' do

    end

  end

end
