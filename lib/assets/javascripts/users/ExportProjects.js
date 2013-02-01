
  /**
   *  Export projects dialog
   */

  var ExportDialog = Modal.extend({

    template: '<div class="padding">\
                <p class="center">Select the format for your projects data download</p>\
                <p class="center block margin20">\
                  <a class="button round red long-round" href="/projects.csv">CSV</a>\
                  <a class="button round red long-round margin" href="/projects.xml">XML</a>\
                </p>\
              </div>',

    render_content: function() {
      return _.template(this.template)();
    }
  })
