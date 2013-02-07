
  /** 
   *  Projects results main view
   */

  $(function() {
    var ProjectResults = SubFormRenderer.extend({
      el: $("form.project_results_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var project_results = new ProjectResults();

    // Hacky -> packy
    $('body').trigger('subform_loaded', project_results);
  });