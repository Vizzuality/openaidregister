module DocumentsHelper

  def file_name(file)
    File.basename(file)
  end

  def type(document)
    document.type.name
  end

end
