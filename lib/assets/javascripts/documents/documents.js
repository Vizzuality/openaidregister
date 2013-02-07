
  /** 
   *  Documents main view
   */

  $(function() {
    var Documents = SubFormRenderer.extend({
      el: $("form.documents_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var documents = new Documents();

    // Hacky -> packy
    $('body').trigger('subform_loaded', documents);
  });