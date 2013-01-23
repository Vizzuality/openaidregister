#encoding: UTF-8
require File.expand_path(File.dirname(__FILE__) + '/acceptance_helper')

describe "OpenAidRegister", :type => :feature do

  it "allows users to register" do
    visit root_path

    within '.banner' do
      click_on 'Make your organization transparent'
    end

    page.should have_content 'Create your account'

    within '.user' do
      fill_in 'Your name',     :with => 'pepito gómez'
      fill_in 'Your email',    :with => 'pepito@gmail.com'
      fill_in 'Your password', :with => 'wadus1'

      click_on 'Continue'
    end

    within '.organization' do

      fill_in "Organization's name",    :with => 'pepito gómez'
      fill_in "Organization's website", :with => 'pepito@gmail.com'
      select 'Wadus type',              :from => "Organization's type"
      select 'Spain',                   :from => "Organization's country"
      fill_in 'Government ID',          :with => '01234'

      click_on 'Save'
    end

    User.count.should be == 1
    Organization.count.should be == 1

  end

  context "doesn't allow users to register" do

    it "with invalid mail" do

      visit root_path

      within '.banner' do
        click_on 'Make your organization transparent'
      end

      page.should have_content 'Create your account'

      within '.user' do
        fill_in 'Your name',     :with => 'pepito gómez'
        fill_in 'Your email',    :with => 'pepito@gmail'
        fill_in 'Your password', :with => 'wadus1'

        click_on 'Continue'
      end

      within '.organization' do

        fill_in "Organization's name",    :with => 'pepito gómez'
        fill_in "Organization's website", :with => 'pepito@gmail.com'
        select 'Wadus type',              :from => "Organization's type"
        select 'Spain',                   :from => "Organization's country"
        fill_in 'Government ID',          :with => '01234'

        click_on 'Save'
      end

      User.count.should be == 0
      Organization.count.should be == 0
    end

    it "with an existing mail"

    it "with invalid password" do

      visit root_path

      within '.banner' do
        click_on 'Make your organization transparent'
      end

      page.should have_content 'Create your account'

      within '.user' do
        fill_in 'Your name',     :with => 'pepito gómez'
        fill_in 'Your email',    :with => 'pepito@gmail.com'

        click_on 'Continue'
      end

      within '.organization' do

        fill_in "Organization's name",    :with => 'pepito gómez'
        fill_in "Organization's website", :with => 'pepito@gmail.com'
        select 'Wadus type',              :from => "Organization's type"
        select 'Spain',                   :from => "Organization's country"
        fill_in 'Government ID',          :with => '01234'

        click_on 'Save'
      end

      User.count.should be == 0
      Organization.count.should be == 0
    end

  end

end