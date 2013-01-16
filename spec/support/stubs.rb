class Project

  def self.records
    @@records ||= []
  end

  def save
    Project.records << OpenStruct.new(attributes)
  end

  def self.all
    Project.records
  end

end

RSpec.configure do |config|

  config.before do
    Sector.stub(:all)           { [OpenStruct.new(:cartodb_id => 1, :name => 'Agriculture')]   }
    Subsector.stub(:all)        { [OpenStruct.new(:cartodb_id => 1, :name => 'Food security')] }
    OrganizationRole.stub(:all) { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus')]         }
    Language.stub(:all)         { [OpenStruct.new(:cartodb_id => 1, :name => 'English')]       }
    TransactionType.stub(:all)  { [OpenStruct.new(:cartodb_id => 1, :name => 'Acquisition')]   }
    Currency.stub(:all)         { [OpenStruct.new(:cartodb_id => 1, :name => '$USD')]          }
    DocumentType.stub(:all)         { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus type')]          }
  end

end
