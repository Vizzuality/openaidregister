class Array

  def by_id(id)
    return nil if id.blank?

    (self || []).select{|element| element.cartodb_id == id.to_i}.first
  end

  def valid?
    inject{|r, m| r && m.valid?}
  end

  def save
    inject(true) {|r, m| r && m.save}
  end

end
