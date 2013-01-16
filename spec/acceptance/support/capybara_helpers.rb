module CapybaraHelpers

  def peich
    save_and_open_page
  end

  def select_date(date_field, date_value)

  end

  def lorem_ipsum
    <<-EOF.gsub(/      /, '')
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae fringilla nisi. Aenean vitae augue a nibh pretium mollis. Duis faucibus arcu ac arcu tempus condimentum. Duis est justo, tempus in porttitor sit amet, vehicula at est. Donec accumsan vulputate diam sit amet bibendum. Ut luctus molestie justo. Ut porttitor enim quis nibh laoreet eget aliquam arcu faucibus. Praesent luctus, urna at viverra tincidunt, turpis purus consequat erat, eu suscipit justo elit vitae mi. Aliquam libero nisi, imperdiet et vestibulum ut, interdum commodo magna. Nullam pellentesque mattis turpis, quis dapibus mi mollis in. Vivamus placerat, orci a sagittis pulvinar, sem lectus lobortis sapien, nec vehicula ante enim vitae risus.
    EOF
  end

  def wadus_document_file_path
    Rails.root.join('spec/support/data/wadus.pdf')
  end
end

RSpec.configure{ |config| config.include CapybaraHelpers }
