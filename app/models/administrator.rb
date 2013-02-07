class Administrator < User

  def self.table_name
    superclass.name.tableize
  end

end
