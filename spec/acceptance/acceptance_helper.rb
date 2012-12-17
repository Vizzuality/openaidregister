require File.expand_path(File.dirname(__FILE__) + "/../spec_helper")
require 'capybara/rails'
require "capybara/dsl"

# Put your acceptance spec helpers inside /spec/acceptance/support
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each {|f| require f}

RSpec.configure do |config|
  #config.include Capybara::DSL, :type => :acceptance

  #config.before(:suite) do
  #end

  #config.before(:each) do
    ## Clearing cache makes assets pipeline to compile from scratch all assets, making specs to timeout
    ##Rails.cache.clear
    #Capybara.reset_sessions!
  #end

  #config.after(:each) do
    #Capybara.use_default_driver
  #end
end
