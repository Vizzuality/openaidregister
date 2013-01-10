require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "IATI basic form", :type => :feature do

  before(:suite) do
    Sector.stub(:all)           { [OpenStruct.new(:id => 1, :name => 'Agriculture')]   }
    Subsector.stub(:all)        { [OpenStruct.new(:id => 1, :name => 'Food security')] }
    OrganizationRole.stub(:all) { [OpenStruct.new(:id => 1, :name => 'Wadus')]         }
    Language.stub(:all)         { [OpenStruct.new(:id => 1, :name => 'English')]       }
    Currency.stub(:all)         { [OpenStruct.new(:id => 1, :name => 'USD')]           }

  end

  before do
    visit new_project_path
  end

  subject { page }

  it { should have_content 'Create new project' }

  it { should have_content 'Start with the basics' }

  it { should have_content 'This information is enought for registering it in IATI, it takes less than 1 minute.' }

  it { should have_field 'Project name' }

  it { should have_field 'Project ID on your Org.' }

  describe 'Project ID On your Org. field' do
    subject { find('.field.id_in_organization') }

    it { should have_hint 'Wadus' }
  end

  it { should have_field 'Project description' }

  it { should have_field "Organization's role in this project" }

  it { should have_field 'Project language' }

  describe 'Sector field' do

    subject { find('.field.sector') }

    it { should have_label 'Sector'            }
    it { should have_field 'project_sector'    }
    it { should have_field 'project_subsector' }
    it { should have_button 'Add'              }

    describe 'allows to add a new sector to the project' do

      before do
        select 'Agriculture',   :from => 'project_sector'
        select 'Food security', :from => 'project_subsector'

        click_on 'Add'
      end

      it { should have_sector 'Agriculture', 'Food security' }

    end

    describe 'allows to remove and a sector added to the project' do

      before do
        select 'Agriculture',   :from => 'project_sector'
        select 'Food security', :from => 'project_subsector'

        click_on 'Add'

        click_on 'remove_sector'
      end

      it { should_not have_sector 'Agriculture', 'Food security' }

    end

  end

  describe 'Project start / end dates field' do
    it { should have_label 'Project start / end dates' }
    it { should have_field 'project_start_date'        }
    it { should have_field 'project_end_date'          }
  end

  describe 'Budget field' do
    it { should have_label 'Budget'                  }
    it { should have_field 'project_budget'          }
    it { should have_field 'project_budget_currency' }
  end

  #it {'location map'}

  it { should have_field 'Project URL' }

  describe 'Contact person field' do
    it { should have_label 'Contact person'         }
    it { should have_field 'project_contact_person' }
    it { should have_link 'Someone different?'      }
  end

  describe 'submission' do
    before(:all) do
      class Project

        def self.records
          @@records ||= []
        end

        def save
          Project.records << OpenStruct.new(attributes)
        end

        def self.all
          Project.records
        end

      end
    end

    it 'creates a new project' do
      fill_in 'Project name',            :with => 'IATI test project'
      fill_in 'Project ID on your Org.', :with => '0123456789'
      fill_in 'Project description',     :with => lorem_ipsum

      select 'Wadus',   :from => "Organization's role in this project"
      select 'English', :from => 'Project language'

      #select 'Agriculture',   :from => 'project_sector'
      #select 'Food security', :from => 'project_subsector'

      #click_button 'Add'

      select_date 'project_start_date', 1.day.since
      select_date 'project_end_date',   1.month.since

      fill_in 'project_budget', :with => 100000
      select 'USD',             :from => 'project_budget_currency'

      fill_in 'project_url',            :with => 'http://www.myiatiproject.org'
      fill_in 'project_contact_person', :with => 'You'

      expect do
        click_on 'Save project'
      end.to change{ Project.all.size }.by(1)

      created_project = Project.all.first
      created_project.name.should               be == 'IATI test project'
      created_project.id_in_organization.should be == '0123456789'
      created_project.description.should        be == lorem_ipsum
      created_project.organization_role.should  be == '1'
      created_project.language.should           be == '1'
      created_project.sector.should             be == ''
      created_project.subsector.should          be == ''
      created_project.start_date.should         be == ''
      created_project.end_date.should           be == ''
      created_project.budget.should             be == '100000'
      created_project.budget_currency.should    be == '1'
      created_project.contact_person.should     be == 'You'
      created_project.url.should                be == 'http://www.myiatiproject.org'


    end

  end

end
