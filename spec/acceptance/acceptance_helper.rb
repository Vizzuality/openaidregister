require File.expand_path(File.dirname(__FILE__) + "/../spec_helper")
require 'capybara/rails'
require "capybara/dsl"

# Put your acceptance spec helpers inside /spec/acceptance/support
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}

Capybara.javascript_driver = :webkit

RSpec.configure do |config|
end
