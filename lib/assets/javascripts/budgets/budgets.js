
  /** 
   *  Budgets main view
   */

  $(function() {
    var Budgets = SubFormRenderer.extend({
      el: $("form.budgets_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var budgets = new Budgets();

    // Hacky -> packy
    $('body').trigger('subform_loaded', budgets);
  });