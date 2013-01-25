unless Rails.env.test?
  class OpenAidRegister
    TYPES               = DocumentType.all
    ORGANIZATION_ROLES  = OrganizationRole.all
    LANGUAGES           = Language.all
    SECTORS             = Sector.all
    SUBSECTORS          = Subsector.all
    CURRENCIES          = Currency.all
    COLLABORATION_TYPES = CollaborationType.all
    AID_TYPES           = AidType.all
    FLOW_TYPES          = FlowType.all
    FINANCE_TYPES       = FinanceType.all
    TRANSACTION_TYPES   = TransactionType.all
    ORGANIZATION_TYPES  = OrganizationType.all
    COUNTRIES           = Country.all
  end
end
