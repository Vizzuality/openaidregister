
  /** 
   *  Transactions main view
   */

  $(function() {
    var Transactions = SubFormRenderer.extend({
      el: $("form.transactions_form")
    })

    // Trying to connect this (modal-form == shit) with the projects view
    var transactions = new Transactions();

    // Hacky -> packy
    $('body').trigger('subform_loaded', transactions);
  });