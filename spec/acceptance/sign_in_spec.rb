#encoding: UTF-8
require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "OpenAidRegister", :type => :feature do

  before do
    @user = User.create( :name     => 'pepe smith',
                         :email    => 'pepe@wadus.com',
                         :password => 'wadus' )
    @unregistered_user = User.new( :name     => 'juan doe',
                                   :email    => 'juan@wadus.com',
                                   :password => 'wadus' )
  end

  it "allows registered users to login" do
    log_in_as @user

    current_path.should be == '/users/1'

    page.should have_content 'your profile'
  end

  it "doesn't allow unregistered users to login" do
    log_in_as @unregistered_user

    current_path.should be == '/sessions'

    page.should have_content 'Invalid email'
    page.should have_content 'Invalid password'
  end

  it "allows logged in users to log out" do
    log_in_as @user

    click_on 'logout'

    current_path.should be == '/'

    visit user_path(@user)

    current_path.should be == '/'
  end

end
