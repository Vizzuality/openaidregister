desc 'Setups the environment'
task :setup => :environment do
  require 'fileutils'

  config_path = File.expand_path('../../../config', __FILE__)

  unless File.exists?("#{config_path}/cartodb_config.development.yml")

    FileUtils.cp "#{config_path}/cartodb_config.development.yml.sample", "#{config_path}/cartodb_config.development.yml"

    editor = ENV['EDITOR']
    if editor && editor.strip != ''
      `$EDITOR #{config_path}/cartodb_config.development.yml`
    else
      puts 'Fill your config/cartodb_config.development.yml with your CartoDB API_KEY'
    end

  end

  puts
  puts 'Setting up CartoDB database...'

  tables_list = CartoDB::Connection.tables

  CartoDB::Connection.create_table 'projects', [
    {:name => 'name',               :type => 'text'},
    {:name => 'id_in_organization', :type => 'numeric'},
    {:name => 'description',        :type => 'text'},
    {:name => 'organization_role',  :type => 'numeric'},
    {:name => 'language',           :type => 'numeric'},
    {:name => 'sector',             :type => 'numeric'},
    {:name => 'subsector',          :type => 'numeric'},
    {:name => 'start_date',         :type => 'date'},
    {:name => 'end_date',           :type => 'date'},
    {:name => 'budget',             :type => 'numeric'},
    {:name => 'budget_currency',    :type => 'numeric'},
    {:name => 'contact_person',     :type => 'text'},
    {:name => 'url',                :type => 'text'}
  ] unless tables_list.tables.map(&:name).include?('projects')

  CartoDB::Connection.create_table 'transactions', [
    {:name => 'type',           :type => 'numeric'},
    {:name => 'date',           :type => 'text'},
    {:name => 'value',          :type => 'numeric'},
    {:name => 'value_currency', :type => 'numeric'},
    {:name => 'provider',       :type => 'text'},
    {:name => 'receiver',       :type => 'text'},
    {:name => 'description',    :type => 'text'}
  ] unless tables_list.tables.map(&:name).include?('transactions')

  CartoDB::Connection.create_table 'external_organizations', [
    {:name => 'name',    :type => 'text'},
    {:name => 'role_id', :type => 'numeric'}
  ] unless tables_list.tables.map(&:name).include?('external_organizations')

  CartoDB::Connection.create_table 'documents', [
    {:name => 'file',    :type => 'text'},
    {:name => 'tipe_id', :type => 'numeric'}
  ] unless tables_list.tables.map(&:name).include?('documents')

  CartoDB::Connection.create_table 'project_results', [
     {:name => 'concept',     :type => 'text'},
     {:name => 'current',     :type => 'numeric'},
     {:name => 'target',      :type => 'numeric'},
     {:name => 'start_date',  :type => 'date'},
     {:name => 'end_date',    :type => 'date'},
     {:name => 'description', :type => 'text'}
  ] unless tables_list.tables.map(&:name).include?('project_results')

  CartoDB::Connection.create_table 'users', [
     {:name => 'email',    :type => 'text'},
     {:name => 'password', :type => 'text'},
     {:name => 'name',     :type => 'text'}
  ] unless tables_list.tables.map(&:name).include?('users')

  CartoDB::Connection.create_table 'organizations', [
     {:name => 'name',          :type => 'text'},
     {:name => 'website',       :type => 'text'},
     {:name => 'type_id',       :type => 'numeric'},
     {:name => 'country_id',    :type => 'numeric'},
     {:name => 'government_id', :type => 'text'}
  ] unless tables_list.tables.map(&:name).include?('organizations')

  %w(
    sectors
    subsectors
    organization_roles
    languages
    transaction_types
    collaboration_types
    tied_statuses
    aid_types
    flow_types
    finance_types
    currencies
    document_types
    organization_document_types
    organization_types
    countries
  ).each do |table_name|
    CartoDB::Connection.drop_table table_name if tables_list.tables.map(&:name).include?(table_name)
    CartoDB::Connection.create_table table_name
  end

  puts '... done!'


  puts
  puts 'Generating seed data...'


    CartoDB::Connection.insert_row 'sectors', {
      'cartodb_id' => 1,
      'name'       => ''
    }





    CartoDB::Connection.insert_row 'subsectors', {
      'cartodb_id' => 1,
      'name'       => 'Food security'
    }





    CartoDB::Connection.insert_row 'organization_roles', {
      'cartodb_id' => 1,
      'name'       => 'Implementing'
    }
    CartoDB::Connection.insert_row 'organization_roles', {
      'cartodb_id' => 2,
      'name'       => 'Funding'
    }
    CartoDB::Connection.insert_row 'organization_roles', {
      'cartodb_id' => 3,
      'name'       => 'Accountable'
    }
    CartoDB::Connection.insert_row 'organization_roles', {
      'cartodb_id' => 4,
      'name'       => 'Extending'
    }





    CartoDB::Connection.insert_row 'languages', {
      'cartodb_id' => 1,
      'name'       => 'English'
    }





    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 1,
      'name'       => 'Commitment'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 2,
      'name'       => 'Disbursement'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 3,
      'name'       => 'Expenditure'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 4,
      'name'       => 'Incoming Funds'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 5,
      'name'       => 'Interest Repayment'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 6,
      'name'       => 'Loan Repayment'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 7,
      'name'       => 'Reimbursement'
    }





    CartoDB::Connection.insert_row 'collaboration_types', {
      'cartodb_id' => 1,
      'name'       => 'Aid through NGOs'
    }
    CartoDB::Connection.insert_row 'collaboration_types', {
      'cartodb_id' => 2,
      'name'       => 'Aid to NGOs'
    }
    CartoDB::Connection.insert_row 'collaboration_types', {
      'cartodb_id' => 3,
      'name'       => 'Aid through PPPs'
    }





    CartoDB::Connection.insert_row 'tied_statuses', {
      'cartodb_id' => 1,
      'name'       => 'Partially tied'
    }
    CartoDB::Connection.insert_row 'tied_statuses', {
      'cartodb_id' => 2,
      'name'       => 'Tied'
    }
    CartoDB::Connection.insert_row 'tied_statuses', {
      'cartodb_id' => 3,
      'name'       => 'Untied'
    }





    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 1,
      'name'       => 'General budget support'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 2,
      'name'       => 'Sector budget support'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 3,
      'name'       => 'Core support to NGOs, other private bodies, PPPs and research institutes'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 4,
      'name'       => 'Core contributions to multilateral institutions'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 5,
      'name'       => 'Contributions to specific-purpose programmes and funds managed by international organisations'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 6,
      'name'       => 'Basket funds/pooled funding'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 7,
      'name'       => 'Project-type interventions'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 8,
      'name'       => 'Donor country personnel'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 9,
      'name'       => 'Other technical assistance'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 10,
      'name'       => 'Scholarships/training in donor country'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 11,
      'name'       => 'Imputed student costs'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 12,
      'name'       => 'Debt relief'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 13,
      'name'       => 'Administrative costs not included elsewhere'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 14,
      'name'       => 'Development awareness'
    }
    CartoDB::Connection.insert_row 'aid_types', {
      'cartodb_id' => 15,
      'name'       => 'Refugees in donor countries'
    }





    CartoDB::Connection.insert_row 'flow_types', {
      'cartodb_id' => 1,
      'name'       => 'Official development assistance (ODA)'
    }
    CartoDB::Connection.insert_row 'flow_types', {
      'cartodb_id' => 2,
      'name'       => 'Other official flows (OOF)'
    }
    CartoDB::Connection.insert_row 'flow_types', {
      'cartodb_id' => 3,
      'name'       => 'PRIVATE NGO'
    }
    CartoDB::Connection.insert_row 'flow_types', {
      'cartodb_id' => 4,
      'name'       => 'PRIVATE MARKET'
    }





    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 1,
      'name'       => 'Aid grant excluding debt reorganisation'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 2,
      'name'       => 'Subsidies to national private investors'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 3,
      'name'       => 'Interest subsidy grant in AF'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 4,
      'name'       => 'Interest subsidy to national private exporters'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 5,
      'name'       => 'Deposit basis'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 6,
      'name'       => 'Encashment basis'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 7,
      'name'       => 'Aid loan excluding debt reorganisation'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 8,
      'name'       => 'Investment-related loan to developing countries'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 9,
      'name'       => 'Loan in a joint venture with the recipient'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 10,
      'name'       => 'Loan to national private investor'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 11,
      'name'       => 'Loan to national private exporter'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 12,
      'name'       => 'Non-banks guaranteed export credits'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 13,
      'name'       => 'Non-banks non-guaranteed portions of guaranteed export credits'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 14,
      'name'       => 'Bank export credits'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 15,
      'name'       => 'Acquisition of equity as part of a joint venture with the recipient'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 16,
      'name'       => 'Acquisition of equity not part of joint venture in developing countries'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 17,
      'name'       => 'Other acquisition of equity'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 18,
      'name'       => 'Debt forgiveness: ODA claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 19,
      'name'       => 'Debt forgiveness: ODA claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 20,
      'name'       => 'Debt forgiveness: OOF claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 21,
      'name'       => 'Debt forgiveness: OOF claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 22,
      'name'       => 'Debt forgiveness: Private claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 23,
      'name'       => 'Debt forgiveness: Private claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 24,
      'name'       => 'Debt forgiveness: OOF claims (DSR)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 25,
      'name'       => 'Debt forgiveness: Private claims (DSR)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 26,
      'name'       => 'Debt forgiveness: Other'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 27,
      'name'       => 'Debt rescheduling: ODA claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 28,
      'name'       => 'Debt rescheduling: ODA claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 29,
      'name'       => 'Debt rescheduling: OOF claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 30,
      'name'       => 'Debt rescheduling: OOF claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 31,
      'name'       => 'Debt rescheduling: Private claims (P)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 32,
      'name'       => 'Debt rescheduling: Private claims (I)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 33,
      'name'       => 'Debt rescheduling: OOF claims (DSR)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 34,
      'name'       => 'Debt rescheduling: Private claims (DSR)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 35,
      'name'       => 'Debt rescheduling: OOF claim (DSR - original loan principal)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 36,
      'name'       => 'Debt rescheduling: OOF claim (DSR - original loan interest)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 37,
      'name'       => 'Debt rescheduling: Private claim (DSR - original loan principal)'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 38,
      'name'       => 'Foreign direct investment'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 39,
      'name'       => 'Other foreign direct investment, including reinvested earnings'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 40,
      'name'       => 'Bank bonds'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 41,
      'name'       => 'Non-bank bonds'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 42,
      'name'       => 'Other bank securities/claims'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 43,
      'name'       => 'Other non-bank securities/claims'
    }
    CartoDB::Connection.insert_row 'finance_types', {
      'cartodb_id' => 44,
      'name'       => 'Securities and other instruments issued by multilateral agencies'
    }





    CartoDB::Connection.insert_row 'currencies', {
      'cartodb_id' => 1,
      'name'       => '$USD'
    }





    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 1,
      'name'       => 'Pre- and post-project impact appraisal'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 2,
      'name'       => 'Objectives / Purpose of activity'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 3,
      'name'       => 'Intended ultimate beneficiaries'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 4,
      'name'       => 'Conditions'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 5,
      'name'       => 'Budget'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 6,
      'name'       => 'Summary information about contract'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 7,
      'name'       => 'Review of project performance and evaluation'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 8,
      'name'       => 'Results, outcomes and outputs'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 9,
      'name'       => 'Memorandum of understanding (If agreed by all parties)'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 10,
      'name'       => 'Annual report'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 11,
      'name'       => 'Strategy paper'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 12,
      'name'       => 'Country strategy paper'
    }

    CartoDB::Connection.insert_row 'organization_document_types', {
      'cartodb_id' => 1,
      'name'       => 'Annual report'
    }
    CartoDB::Connection.insert_row 'organization_document_types', {
      'cartodb_id' => 2,
      'name'       => 'Strategy paper'
    }
    CartoDB::Connection.insert_row 'organization_document_types', {
      'cartodb_id' => 3,
      'name'       => 'Country strategy paper'
    }
    CartoDB::Connection.insert_row 'organization_document_types', {
      'cartodb_id' => 4,
      'name'       => 'Aid Allocation Policy'
    }
    CartoDB::Connection.insert_row 'organization_document_types', {
      'cartodb_id' => 5,
      'name'       => 'Procurement Policy and Procedure'
    }





    CartoDB::Connection.insert_row 'organization_types', {
      'cartodb_id' => 1,
      'name'       => 'Accountable'
    }
    CartoDB::Connection.insert_row 'organization_types', {
      'cartodb_id' => 2,
      'name'       => 'Extending'
    }
    CartoDB::Connection.insert_row 'organization_types', {
      'cartodb_id' => 3,
      'name'       => 'Funding'
    }
    CartoDB::Connection.insert_row 'organization_types', {
      'cartodb_id' => 4,
      'name'       => 'Implementing'
    }





    CartoDB::Connection.insert_row 'countries', {
      'cartodb_id' => 1,
      'name'       => 'Spain'
    }
  puts '... done!'

end


desc 'Drops all tables in the cartodb account'
task :drop_all_tables => :environment do
  %w(
    projects
    transactions
    external_organizations
    documents
    project_results
    users
    organizations
    sectors
    subsectors
    organization_roles
    languages
    transaction_types
    collaboration_types
    tied_statuses
    aid_types
    flow_types
    finance_types
    currencies
    document_types
    organization_document_types
    organization_types
    countries
  ).each do |table_name|
    CartoDB::Connection.drop_table table_name
  end
end

