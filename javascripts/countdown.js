/*
 * jquery.countdown
 * 
 *
 * Copyright (c) 2014 amibug
 * Licensed under the MIT license.
 */

(function ($) {
  $.countdown = function (element, options) {
    // plugin's default options
    var defaults = {
      version: '@version',
      diff: null,
      year: 0,
      month: 0,
      day: 0,
      hour: 1,
      min: 1,
      sec: 1,
      refresh: 1000,
      easing: 'linear',
      dash: [
        {key: 'year', duration: 950},
        {key: 'day', duration: 950},
        {key: 'hour', duration: 950},
        {key: 'min', duration: 950},
        {key: 'sec', duration: 750}
      ],

      // you may provide callback capabilities
      onEnd: $.noop
    };

    var plugin = this;
    plugin.settings = {};

    var $element = $(element), // reference to the jQuery version of DOM element
      element = element; // reference to the actual DOM element

    // the "constructor" method that gets called when the object is created
    plugin.init = function () {
      var $digit = $element.find('.digit');
      $digit.html('<div class="top"></div><div class="bottom"></div>');
      this.settings = $.extend({}, defaults, options);
      this._doCountDown();
      return this;
    };

    plugin.start = function () {
      if (!this.interval) {
        this._doCountDown();
      }
      return this;
    };

    plugin.stop = function () {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = null;
      return this;
    };

    plugin.update = function (options) {
      if(options.diff == null){
        options.diff = null;
      }
      this.settings = $.extend({}, this.settings, options);
      return this;
    };

    plugin._caluate = function (options) {
      var target = new Date(),
        dateData = {},
        now, diff;
      if ($.type(options.diff) === "number") {
        diff = options.diff;
      } else {
        try {
          target.setFullYear(options.year + target.getFullYear());
          target.setMonth(options.month + target.getMonth());
          target.setDate(options.day + target.getDate());
          target.setHours(options.hour + target.getHours());
          target.setMinutes(options.min + target.getMinutes());
          target.setSeconds(options.sec + target.getSeconds());
          now = new Date();
          diff = Math.floor((target.valueOf() - now.valueOf()) / 1000);
        } catch (e) {
          throw 'The date parameter is invalidate!';
        }
      }
      this.settings.diff = diff;

      if (diff >= (365.25 * 86400)) {
        dateData.year = Math.floor(diff / (365.25 * 86400));
        diff -= dateData.year * 365.25 * 86400;
      }
      if (diff >= 86400) {
        dateData.day = Math.floor(diff / 86400);
        diff -= dateData.day * 86400;
      }
      if (diff >= 3600) {
        dateData.hour = Math.floor(diff / 3600);
        diff -= dateData.hour * 3600;
      }
      if (diff >= 60) {
        dateData.min = Math.floor(diff / 60);
        diff -= dateData.min * 60;
      }
      dateData.sec = diff;
      return dateData;
    };

    plugin._doCountDown = function () {
      var dash = this.settings.dash,
        dateData = this._caluate(this.settings),
        that = this;

      if(this.settings.diff < 0){
        this.stop();
        this.settings.onEnd.apply(this);
        return this;
      }

      this.settings.diff = this.settings.diff - this.settings.refresh/1000;

      for (var i0 = 0, l0 = dash.length; i0 < l0; i0++) {
        var $digit = $element.find('.' + dash[i0].key + '_dash .digit');
        var n = dateData[dash[i0].key];
        for (var i = $digit.length - 1; i >= 0; i--) {
          var d = n % 10;
          n = (n - d) / 10;
          this._render($digit.eq(i), d, dash[i0].duration);
        }
      }

      if(!this.interval){
        this.interval = setInterval(function() {
          return that._doCountDown();
        }, this.settings.refresh);
      }
    };

    plugin._render = function (digit, n, duration) {
      var $top = $(digit).find('.top'),
        $bottom = $(digit).find('.bottom');
      n = n || 0;
      if (!duration) {
        duration = 750;
      }
      if ($top.html() != n + '') {
        $top.css({'display': 'none'})
          .html((n ? n : '0')).slideDown(duration);

        $bottom.animate({'height': ''}, duration, function () {
          $(this).html($top.html())
            .css({'display': 'block', 'height': ''});
          $top.hide().slideUp(10);
        });
      }
    };

    // fire up the plugin!
    plugin.init();

  };

  $.fn.countdown = function (options) {
    // iterate through the DOM elements we are attaching the plugin to
    return this.each(function () {
      if (undefined == $(this).data('countdown')) {
        // pass the DOM element and the user-provided options as arguments
        var plugin = new $.countdown(this, options);
        // store a reference to the plugin object
        $(this).data('countdown', plugin);
      }
    });
  };
})(jQuery, window, undefined);