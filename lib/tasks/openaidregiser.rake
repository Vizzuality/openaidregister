desc 'Setups the environment'
task :setup do
  require 'fileutils'

  config_path = File.expand_path('../../../config', __FILE__)

  FileUtils.cp "#{config_path}/cartodb_config.development.yml.sample", "#{config_path}/cartodb_config.development.yml"

  editor = ENV['EDITOR']
  if editor && editor.strip != ''
    `$EDITOR #{config_path}/cartodb_config.development.yml`
  else
    puts 'Fill your config/cartodb_config.development.yml with your CartoDB API_KEY'
  end

end

