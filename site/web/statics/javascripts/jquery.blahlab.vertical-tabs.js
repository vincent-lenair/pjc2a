(function($) {
  "use strict"

  $.fn.blahlab_vertical_tabs = function() {

    return this.each(function() {
      var container = $(this);
      var tablist = $(this).find('ol, ul').eq(0);

      tablist.addClass('tablist');

      var links = $(" > li > a[href]", tablist);

      links.each(function(i, a) {
        var panel = $($(a).attr('href'));
        panel.addClass('tabpanel');

        var header = $('<h3>', { 'html': $(a).html(), 'class': 'panel-header' });
        header.insertBefore(panel);

        $(this).click(function() {
          open_panel(panel);
          return false;
        });

        $(header).click(function() {
          open_panel(panel);
          return false;
        })

      });

      function open_panel(panel, force) {
        if(!panel.hasClass('active') || force) {
          var panelId = $(panel).attr('id');

          container.find('.tabpanel').removeClass('active');
          panel.addClass('active');

          container.find('ul.tablist > li').removeClass('active');
          container.find('ul.tablist > li > a[href=#' + panelId + ']').parent().addClass('active');

          container.find('.panel-header').removeClass('active');
          panel.prev().addClass('active');
        }
      }

      if(!$('.tabpanel.active', container).length) {
        open_panel($('.tabpanel', container).eq(0));
      } else {
        open_panel($('.tabpanel.active', container), true);
      }

    });

  }

})(jQuery);
