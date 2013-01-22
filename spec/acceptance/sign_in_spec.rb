#encoding: UTF-8
require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "OpenAidRegister", :type => :feature do

  before do
    @user = User.create( :name     => 'pepe smith',
                         :email    => 'pepe@wadus.com',
                         :password => 'wadus' )
  end

  it "allows registered users to login" do
    log_in_as @user
  end

  it "doesn't allow unregistered users to login"

end
