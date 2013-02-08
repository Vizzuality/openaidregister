
  /** 
   *  Administrators main view
   */

  $(function() {
    var Administrators = SubFormRenderer.extend({
      el: $("form.administrators_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var administrators = new Administrators();

    // Hacky -> packy
    $('body').trigger('subform_loaded', administrators);
  });