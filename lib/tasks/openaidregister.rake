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

  CartoDB::Connection.create_table 'organizations', [
    {:name => 'name',    :type => 'text'},
    {:name => 'role_id', :type => 'numeric'}
  ] unless tables_list.tables.map(&:name).include?('organizations')

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

  %w(sectors subsectors languages organization_roles transaction_types currencies document_types).each do |table_name|
    CartoDB::Connection.drop_table table_name if tables_list.tables.map(&:name).include?(table_name)
    CartoDB::Connection.create_table table_name
  end

  puts '... done!'


  puts
  puts 'Generating seed data...'

    CartoDB::Connection.insert_row 'sectors', {
      'cartodb_id' => 1,
      'name'       => 'Agriculture'
    }
    CartoDB::Connection.insert_row 'subsectors', {
      'cartodb_id' => 1,
      'name'       => 'Food security'
    }
    CartoDB::Connection.insert_row 'organization_roles', {
      'cartodb_id' => 1,
      'name'       => 'Wadus'
    }
    CartoDB::Connection.insert_row 'languages', {
      'cartodb_id' => 1,
      'name'       => 'English'
    }
    CartoDB::Connection.insert_row 'transaction_types', {
      'cartodb_id' => 1,
      'name'       => 'Acquisition'
    }
    CartoDB::Connection.insert_row 'currencies', {
      'cartodb_id' => 1,
      'name'       => '$USD'
    }
    CartoDB::Connection.insert_row 'document_types', {
      'cartodb_id' => 1,
      'name'       => 'Undefined'
    }
  puts '... done!'

end

