RSpec.configure do |config|

  config.before do
    Sector.stub(:all)            { [OpenStruct.new(:cartodb_id => 1, :name => 'Agriculture')]              }
    Subsector.stub(:all)         { [OpenStruct.new(:cartodb_id => 1, :name => 'Food security')]            }
    OrganizationRole.stub(:all)  { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus')]                    }
    Language.stub(:all)          { [OpenStruct.new(:cartodb_id => 1, :name => 'English')]                  }
    TransactionType.stub(:all)   { [OpenStruct.new(:cartodb_id => 1, :name => 'Acquisition')]              }
    Currency.stub(:all)          { [OpenStruct.new(:cartodb_id => 1, :name => '$USD')]                     }
    DocumentType.stub(:all)      { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus type')]               }
    OrganizationType.stub(:all)  { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus type')]               }
    Country.stub(:all)           { [OpenStruct.new(:cartodb_id => 1, :name => 'Spain')]                    }
    CollaborationType.stub(:all) { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus collaboration type')] }
    AidType.stub(:all)           { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus aid type')]           }
    FlowType.stub(:all)          { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus flow type')]          }
    FinanceType.stub(:all)       { [OpenStruct.new(:cartodb_id => 1, :name => 'Wadus finance type')]       }

    CartodbModel.records = nil
  end

end
