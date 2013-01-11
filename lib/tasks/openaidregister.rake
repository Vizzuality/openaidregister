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

  %w(sector subsector language organization_role transaction_type currency).each do |table_name|
    CartoDB::Connection.create_table table_name unless tables_list.tables.map(&:name).include?(table_name)
  end

  puts '... done!'

end

