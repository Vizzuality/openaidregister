
  /** 
   *  External organizations main view
   */

  $(function() {
    var Organizations = SubFormRenderer.extend({
      el: $("form.organization_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var organizations = new Organizations();

    // Hacky -> packy
    $('body').trigger('subform_loaded', organizations);
  });