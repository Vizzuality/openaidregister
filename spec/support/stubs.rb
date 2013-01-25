class OpenAidRegister
  SECTORS             = [OpenStruct.new(:cartodb_id => 1, :name => 'Agriculture')]
  SUBSECTORS          = [OpenStruct.new(:cartodb_id => 1, :name => 'Food security')]
  ORGANIZATION_ROLES  = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus')]
  LANGUAGES           = [OpenStruct.new(:cartodb_id => 1, :name => 'English')]
  TRANSACTION_TYPES   = [OpenStruct.new(:cartodb_id => 1, :name => 'Acquisition')]
  CURRENCIES          = [OpenStruct.new(:cartodb_id => 1, :name => '$USD')]
  TYPES               = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus type')]
  ORGANIZATION_TYPES  = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus type')]
  COUNTRIES           = [OpenStruct.new(:cartodb_id => 1, :name => 'Spain')]
  COLLABORATION_TYPES = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus collaboration type')]
  AID_TYPES           = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus aid type')]
  FLOW_TYPES          = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus flow type')]
  FINANCE_TYPES       = [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus finance type')]
end

RSpec.configure do |config|

  config.before do
    CartodbModel.records = nil

    Project.stub(:for_user){ |user_id| Project.all.select{|p| p.user_id == user_id} }
  end

end
