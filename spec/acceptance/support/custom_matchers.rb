module CustomMatchers
  extend RSpec::Matchers::DSL

  def have_label(text)
    have_selector('label', :text => text)
  end

  def should_have_hint(text)
    hint = find('.hint')
    hint['data-hint'].should be == text
  end

  def have_sector(sector, subsector)
    within '.sectors_to_add' do
      have_selector('.sectors_to_add_sector',    :text => sector)
      have_selector('.sectors_to_add_subsector', :text => sector)
    end
  end

  def have_subtitle(subtitle)
    have_selector('h3', :text => subtitle)
  end

  def have_section_title(title)
    have_selector('h4', :text => title)
  end

  matcher :have_sector do |sector, subsector|
    match_for_should { |node| node.has_selector?(".sector", :text => text) }
    match_for_should_not { |node| node.has_no_selector?(".comment", :text => text) }
  end
end

RSpec.configure{ |config| config.include CustomMatchers }
