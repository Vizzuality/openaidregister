
  /**
   *  Share projects dialog
   */

  var ShareDialog = Modal.extend({

    template: '<div class="padding">\
                <p>Use this HTML code to embed your projects map in your website</p>\
                <textarea class="margin15" readonly><iframe src="<%= url %>" width="100%" height="100%"></iframe></textarea>\
                <p class="center block margin20"><a class="button round red copy" href="#copy_to_clipboard">Copy to clipboard & close</a></p>\
              </div>',

    render_content: function() {
      var url = location.origin + this.options.url
        , template = _.template(this.template)({ url:url });

      return template;
    },

    open: function() {
      // Scroll to the top
      this._scrollToTop();

      // Calculate document and black zone
      var doc_height = $(document).height()
        , $modal = this.$el.find('.mamufas')
        , modal_height = $modal.outerHeight();

      if (modal_height < doc_height) {
        $modal.height(doc_height - 250);
      }

      this.$el
        .show()
        .find("a.copy").zclip({
          path:'/assets/ZeroClipboard.swf',
          clickAfter: false,
          afterCopy: null,
          copy: function(e) {
            e.stopPropagation();
            e.preventDefault();
            return $(this).closest('div.padding').find("textarea").val()
          }
        })
    },

    _reClean: function() {
      $(document).unbind('keydown', this._keydown);
      this.$el.find("a.copy").zclip('remove');
    }
  })