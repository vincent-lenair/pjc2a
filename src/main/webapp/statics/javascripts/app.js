
// initiialize things here

jQuery(document).ready(function($) {
  jQuery('html').removeClass('no-js');
  if($(window).width() > 1140) {
    // this will casue nav and logo to blink when slider animate on iPad and iPhone
    // the image path should be relative to the HTML file, otherwise it will break on the live preview server
    var body_classes = $('body').attr('class').split(/\s+/);
    for(var i = 0; i < body_classes.length; i++) {
      match = body_classes[i].match(/^boxed_bg_\d+$/);
      if(match) {
        
        $.backstretch("images/" + match[0] + '.jpg');
      }
    }
  }

  if($('.masonry-container').length > 0) {
    $('.masonry-container').each(function() {
      $(this).masonry({
        itemSelector: '.mod',
        // add the columnWidth for trying to fix the overlapping issue
        columnWidth: '.mod'
      })
    });
  }

  // $(".fadeinleft").addClass("appear");

  $('.fadeinleft, .fadeinright').appear(function() {
    $(this).addClass('appear');
    // var elem = $(this);
    // setTimeout(function() {
    //   $(elem).addClass('appear');
    // }, 1000);
  });

});

// The definitions for modules start here

(function($) {
  Tc.Module.Accordion = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery-ui.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $ctx.accordion({
        collapsible: true
      });
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BarGraph = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery.appear.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $(".bars", $ctx).each(function() {
        $('> li > .bar', $(this)).each(function() {
          $(this).appear(function() {
            var $bar = $(this);
            var percent = $(this).attr("data-percent");
            $bar.html('<p class="highlighted"><span class="tip">'+percent+'%</span></p>');
            // http://stackoverflow.com/questions/3363035/jquery-animate-forces-style-overflowhidden
            $bar.find('.highlighted').animate({
              'width': percent + '%'
            }, 1700, function() { $(this).css('overflow', 'visible'); });
          });
        })
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogPost = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      if($ctx.find('.media').length == 0) {
        $ctx.addClass('no-media');
      }

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.BlogTeaser = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Breadcrumb = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CallToAction = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CaseStudy = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('slides.jquery.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      // $('img', $ctx).each(function() {
      //   $(this).css({
      //     'height': $(this).attr('height'),
      //     'width': $(this).attr('width')
      //   });
      // });

      $('.slides', $ctx).each(function() {
        $(this).slides({
  			  generatePagination: true,
  			  effect: 'fade',
  			  autoHeight: false,
  			  bigTarget: true,
          fadeSpeed: 800,
  			  play: 5000
  			});
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Clients = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.CommentForm = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Comments = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.ContactForm = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery.validate.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $('form', $ctx).validate({
        messages: { },
        submitHandler: function(form) {
          $.ajax({
            type: 'POST',
            url: 'send.php',
            data: $(form).serialize(),
            success: function(data) {
              if(data.match(/success/)) {
                $(form).trigger('reset');
                $('.thanks', $ctx).show().fadeOut(10000);
              }
            }
          });
          return false;
        }
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.ContactInfo = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      var $ctx = this.$ctx;

      if($ctx.find('.gmap').length) {
        // http://www.smashinglabs.pl/gmap/documentation
        this.require('jquery.gmap.js', 'plugin', 'onBinding');
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      $ctx.find('.gmap').each(function() {
        var lat = parseFloat($(this).attr('data-lat'));
        var lng = parseFloat($(this).attr('data-lng'));
        var zoom = parseFloat($(this).attr('data-zoom'));

        $(this).gMap({ zoom: zoom, latitude: lat, longitude: $ctx.hasClass('bgmap') ? lng + 0.015 : lng, markers: [ { latitude: lat, longitude: lng } ], mapTypeControl: false, zoomControl: true, scrollwheel: true });

      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Copyright = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Divider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.EmailUpdates = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Feature = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.FlexSlider = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // uncomment this if you need more easings
      // http://api.jqueryui.com/easings/
      // this.require('jquery-ui-1.8.24.custom.js', 'plugin', 'onBinding');
      this.require('jquery.flexslider.js', 'plugin', 'onBinding');
      // this.require('jquery.backstretch.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      // http://www.woothemes.com/flexslider/

      if($ctx.hasClass('works')) {

        var update_caption = function(slider) {
          var caption = $('p.caption', slider.slides[slider.currentSlide]).html();
          if($('.flexslider p.current_caption', $ctx).length == 0) {
            $('.flexslider', $ctx).append($("<p>").addClass('current_caption'));
          }
          $('.flexslider p.current_caption', $ctx).html(caption);
        }

        $('.flexslider', $ctx).flexslider({
          animation: 'fade',
          slideshowSpeed: 5000,
          controlNav: false,
          after: function(slider) { update_caption(slider); },
          start: function(slider) { update_caption(slider); }
        });

      } else if($ctx.hasClass('testimonials')) {
        $('.flexslider', $ctx).appear(function() {
          $(this).flexslider({
            slideshow: true,
            animation: 'slide',
            directionNav: false
          });
        });
      } else {

        // https://gist.github.com/aarongustafson/1313517
        function adjustIframes() {
          $('iframe', $ctx).each(function(){
            var proportion = $(this).data('proportion');
            var width = $(this).attr('width');
            var height = $(this).attr('height');
            var actualWidth = $(this).width();

            if (!proportion) {
              proportion = height / width;
              $(this).data('proportion', proportion);
            }

            if (actualWidth != width) {
              $(this).css('height', Math.round( actualWidth * proportion ) + 'px');
            } else {
              $(this).css('height', $(this).attr('height') + 'px');
            }
          });
        }
        // $(window).on('resize load', adjustIframes);

        // this function converts
        // 1s => 1000
        // 1ms => 1
        // 1000ms => 1000
        var convert_time_to_number = function(time) {
          var number = NaN;

          try {
            // have to test for '0' first
            // then test for 'ms', otherwise ms will not function
            // the last for 's'
            if(time == '0') {
              number = 0;
            } else if(time.slice(-2) == 'ms') {
              number = parseFloat(time);
            } else if(time.slice(-1) == 's') {
              number = parseFloat(time) * 1000;
            }

            number = Math.round(number);
          } catch(e) {}

          return number;
        }

        var do_animation = function(slider, flexslider) {
          // TODO:
          // 1. handle slider animation for not adjacent slides
          // 2. handle nav trigger when in animation
          // 3. improve slider animation for adjacent slide
          //    calculate the speed and distance(left position) for not disturbing animation

          if(slider.animating) {
            var slide = slider.slides[slider.animatingTo];
          } else {
            var slide = slider.slides[slider.currentSlide];
          }

          hide_animatables(slide);

          var defaults = {
            duration: 1000,
            delay: 1000
          };

          var blocks = $("[data-animate-direction=ltr], [data-animate-direction=rtl], [data-animate-direction=ttb], [data-animate-direction=btt]", slide);

          // debugger

          // for(var i = 0; i < blocks.length; i++) {
          //   var block = blocks[i];

          // }

          for(var i = 0; i < blocks.length; i++) {

            var block = blocks[i];

            // data-animate-direction: ltr|rtl
            // data-animate-duration: 1s
            // data-animate-delay: 1s

            var direction = $(block).data('animateDirection');
            var duration = convert_time_to_number($(block).data('animateDuration'));
            var delay = convert_time_to_number($(block).data('animateDelay'));
            // the duration the user can see the animation
            duration = isNaN(duration) ? defaults.duration : duration;
            delay = isNaN(delay) ? defaults.delay : delay;
            if(direction == 'btt' || direction == 'ttb') {
              delay += Math.floor(flexslider.animationSpeed * 2);
            }

            // make duration more as accurate as
            // the amount of time the user see the animation played visiblely
            // css margin can affect the value of offset.left
            // add $(slide).outerWidth() to avoid ajacent slide disturb the animation
            // speed is the pixels moved per millisecond

            // the offset out of the slide
            var out_slide_offset = 0;
            if(slider.animating) {
              var slideAnimationDuration = (Math.abs(slider.animatingTo - slider.currentSlide)) * flexslider.animationSpeed;
            } else {
              var slideAnimationDuration = 0;
            }
            out_slide_offset = $(slide).outerWidth();

            // the duration start from the block moving
            // var realDuration = duration + slideAnimationDuration;

            // the to_*_offset is the distance the block moved visible in the slide
            if(direction == 'ltr') {
              var block_right_side_offset = $(block).offset().left + $(block).outerWidth();
              var slide_left_side_offset = $(slide).offset().left;

              // calcuate the distance between the right side of the block and the left side of the slide when there is no animation
              var to_left_offset = block_right_side_offset - slide_left_side_offset;

              // var speed = to_left_offset / duration;
              // var out_slide_offset = speed * slideAnimationDuration;

              var left = '-' + (to_left_offset + out_slide_offset) + 'px';
            } else if (direction == 'rtl') {
              var block_left_side_offset = $(block).offset().left;
              var slide_right_side_offset = $(slide).offset().left + $(slide).outerWidth();
              // var speed = to_right_offset / duration;
              // var out_slide_offset = speed * slideAnimationDuration;

              // calcuate the distance between the left side of the block and the right side of the slide when there is no animation
              var to_right_offset = slide_right_side_offset - block_left_side_offset;

              var left = (to_right_offset + out_slide_offset) + 'px';
            } else if (direction == 'ttb') {
              var block_bottom_side_offset = $(block).offset().top + $(block).outerHeight();
              var slide_top_side_offset = $(slide).offset().top;

              // calculate the distance between the bottom of the block and the top side of the slide when there is no animation
              var to_top_offset = block_bottom_side_offset - slide_top_side_offset;

              var top = '-' + to_top_offset + 'px';
            } else if (direction == 'btt') {
              var block_top_side_offset = $(block).offset().top;
              var slide_bottom_side_offset = $(slide).offset().top + $(slide).outerHeight();

              // calculate the distance between the top of the block and the bottom side of the slide when there is no animation
              var to_bottom_offset = slide_bottom_side_offset - block_top_side_offset;

              var top = to_bottom_offset + 'px';
            }

            // or you can set the absolute of left to be $(slide).outerWidth() * 2 instead caculate the accurate
            // to_left_offset or to_right_offset

            if(direction == 'rtl' || direction == 'ltr') {
              var from = {
                'left': left,
                'visibility': 'hidden'
              };
              var to = { 'left': '0px' };
            } else if(direction == 'ttb' || direction == 'btt') {
              var from = {
                'top': top,
                'visibility': 'hidden'
              };
              var to = { 'top': '0px' };
            }

            $(block).css(from);
            // It's better to adjust the animation attribute in the html instead of tweek things here for certain slides
            // if(duration + delay < flexslider.animationSpeed) {
            //   duration = flexslider.animationSpeed - delay;
            // }
            setTimeout((function(block, to, duration) {
              return function() {
                $(block).css({ 'visibility': 'visible' }).animate(to, duration);
                // $(block).css({ 'visibility': 'visible' }).animate(to, duration, 'easeInOutBounce');
              };
            })(block, to, duration), delay);

          }
        }

        var hide_animatables = function(context) {
          context = context ? context : $ctx;
          var $animatables = $("[data-animate-direction=ltr], [data-animate-direction=rtl], [data-animate-direction=ttb], [data-animate-direction=btt]", context);
          $animatables.css({ 'visibility': 'hidden', 'position': 'relative' });
        }

        var show_animatables = function(context) {
          context = context ? context : $ctx;
          var $animatables = $("[data-animate-direction=ltr], [data-animate-direction=rtl], [data-animate-direction=ttb], [data-animate-direction=btt]", context);
          $animatables.css({ 'visibility': 'visible', 'position': 'relative' });
        }

        hide_animatables();

        $('.flexslider', $ctx).flexslider({
          slideshow: true,
          slideshowSpeed: $ctx.hasClass('boxed') ? 4000 : 5000,
          directionNav: $ctx.hasClass('boxed') ? false : true,
          animation: 'slide',
          // animationSpeed: 2000,
          before: function(slider) {
            var flexslider = this;
            hide_animatables();
            show_animatables(slider.slides[slider.currentSlide]);
            do_animation(slider, flexslider);
          },
          start: function(slider) {
            var flexslider = this;
            do_animation(slider, flexslider);
          },
          after: function(slider) {
            hide_animatables();
            show_animatables(slider.slides[slider.currentSlide]);
          }
        });

      }

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Full = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Gallery = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      // $('img', $ctx).each(function() {
      //   $(this).css({
      //     'height': $(this).attr('height'),
      //     'width': $(this).attr('width')
      //   });
      // });

      // function pixelized_dimensions(resize) {
      //   $('.item > a', $ctx).css({
      //     width: '99%',
      //     height: 'auto'
      //   });

      //   if(resize) {
      //     $('.item > a', $ctx).css({
      //       width: Math.floor($('.item > a', $ctx).width()),
      //       height: Math.floor($('.item > a', $ctx).height())
      //     });
      //   }
      // }

      // pixelized_dimensions($.browser.mozilla);

      // if(!$.browser.msie) {
      //   var timer;
      //   $(window).resize(function() {
      //     clearTimeout(timer);
      //     timer = setTimeout(function() {
      //       pixelized_dimensions(true);
      //     }, 100);
      //   });
      // }

      $('.row', $ctx).each(function() {
        $(this).children('.columns, .column').last().addClass('end')
      });

      $('.gallery-nav ul li a', $ctx).click(function() {
        $('.gallery-nav .current', $ctx).removeClass('current');
        $(this).addClass('current');

        var filter = $(this).text();

        // console.log(filter);

        if(filter == 'All') {
          $('.gallery-grid .hidden', $ctx).stop().animate({ "opacity": 1}, 1000, function() {
            $(this).removeClass('hidden');
          });
        } else {
          $('.gallery-grid .item', $ctx).each(function() {
            if($(this).hasClass(filter)) {
              $(this).stop().animate({ "opacity": 1}, 1000, function() {
                $(this).removeClass('hidden');
              });
            } else {
              $(this).stop().animate({ "opacity": 0.1 }, 1000).addClass('hidden');
            }
          });
        }


        return false;
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Header = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this.limit = 800;
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery.sticky.js', 'plugin', 'onBinding');
    },
    unsticky: function() {
      var $ctx = this.$ctx;

      if(!$('.main-header', $ctx).parent().hasClass('sticky-wrapper')) return

      var header = $('.main-header', $ctx).clone().css({ position: 'static', top: 0 })
      $('.main-header', $ctx).parent().replaceWith(header);

      // rebootstrapping after cloned
      var config = {
        dependencyPath: {
          plugin: 'javascripts/'
        }
      }

      var app = new Tc.Application($ctx, config);
      app.registerModules();
      app.start();
    },
    sticky: function() {
      var $ctx = this.$ctx;

      if($('.main-header', $ctx).parent().hasClass('sticky-wrapper')) return;
      if($(window).width() <= this.limit) return;
      if($ctx.hasClass('headerLayout3')) return

      $('.main-header', $ctx).sticky({ topSpacing: 0 });
    },
    onInitStyle: function(data) {
      var $ctx = this.$ctx;

      if(data.header_layout == '3') {
        this.unsticky();
      } else {
        this.sticky();
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      this.sticky();

      var that = this;

      $(window).resize(function() {
        if($(window).width() <= that.limit) {
          that.unsticky();
        } else {
          that.sticky();
        }
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.LatestTweets = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('http://twitterjs.googlecode.com/svn/trunk/src/twitter.min.js', 'url', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      // var tweets_id = $('.tweets', $ctx).attr('id');
      // var twitter_id = $ctx.attr('twitter_id');
      // var tweets_count = $ctx.attr('tweets_count');

      // if(twitter_id) {
      //   getTwitters(tweets_id, {
      //    id: twitter_id,
      //    count: tweets_count,
      //    enableLinks: true,
      //    ignoreReplies: false,
      //    clearContents: true,
      //    template: '<p class="tweet">%text%<span class="time">%time%</span></p>',
      //    callback: function() {
      //    }
      //   });
      // }
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Logo = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Member = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Milestone = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery.countTo.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx

      $('.number', $ctx).appear(function() {
        $(this).countTo();
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Nav = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.sticky.js', 'plugin', 'onBinding');
      var $ctx = this.$ctx;
      if($ctx.hasClass('one-page')) {
        this.require('jquery.easing.1.3.js', 'plugin', 'onBinding');
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      if($ctx.hasClass('one-page')) {
        var headerHeight = $ctx.closest('.main-header').height();
        $(window).scroll(function() {
          headerHeight = $ctx.closest('.main-header').height();
        });

        // use to mark whether the scrolling is caused by clicking
        var clickScrolling = false;
        // cache for current anchor id
        var currentAnchorId;

        $('.nav-bar a', $ctx).click(function(event) {
          $('.nav-bar a', $ctx).removeClass('current');
          $(this).addClass('current');
          clickScrolling = true;
          // console.log($(this).attr('href').offset());
          try {
            $('html, body').stop().animate({
              scrollTop: $($(this).attr('href')).offset().top - headerHeight + 'px'
            }, { duration: 1200, easing: "easeInOutExpo", complete: function() { clickScrolling = false; } });
            event.preventDefault();
          } catch(e) {}
        });

        var anchors = $('.nav-bar a', $ctx).map(function() {
          var anchor = $($(this).attr('href'));
          if(anchor.length) { return anchor; }
        });

        $(window).scroll(function() {
          if(clickScrolling) return false;

          var fromTop = $(this).scrollTop();
          var passedAnchors = anchors.map(function() {
            // add 1 to make the current nav change 1px before it should when scrolling top to bottom
            if(fromTop + headerHeight + 1 >= $(this).offset().top)
              return this;
          });
          // get the last anchor in the passedAnchors as the current one
          currentAnchor = passedAnchors[passedAnchors.length - 1];
          if(currentAnchor) {
            if(currentAnchorId !== currentAnchor.attr('id')) {
              currentAnchorId = currentAnchor.attr('id');
              $('.nav-bar a', $ctx).removeClass('current');
              $('.nav-bar a[href=#'+currentAnchorId+']', $ctx).addClass('current');
            }
          }

        });

      }

      $('a.toggle', $ctx).click(function() {
        elem = $('.wrapper ul.nav-bar', $ctx);
        if(elem.is(':visible')) {
          elem.slideUp(400, function() {
            var style = $(this).attr('style');
            style = style.replace('display: none;', '');
            $(this).attr('style', style);
          });
        } else {
          elem.slideDown();
        }
        return false;
      });

      var hover_in_delay = 100;
      var hover_out_delay = 0;

      if(Modernizr.touch) {

        if(!$('.show-for-small').is(":visible")) {
          $('li a', $ctx).bind('click', function(event) {
            // check whether it is a top level li
            // check whether is has child flyout
            //   check whether the child flyout is visible

            var parent_li = $(this).closest('li');
            var child_flyout = $(parent_li).children('.flyout');
            var is_top_li = $(parent_li).parent().hasClass('nav-bar');
            var has_child_flyout = child_flyout.length > 0;

            if(has_child_flyout) {
              var child_flyout_visible = child_flyout.hasClass('visible');

              if(child_flyout_visible) {
                event.stopPropagation();
                return true;
              } else {
                // when has child flyout but child flyout not visible

                if(is_top_li) {
                  // when it is top li but don't have visible children flyout
                  // i.e. newly touch a top level li
                  $('.flyout', $ctx).removeClass('visible').css({ 'opacity': 1 });
                }

                $(child_flyout).addClass('visible');

                event.stopPropagation();
                event.preventDefault();

                return false;
              }

            } else {
              event.stopPropagation();
              return true;
            }
          });
        }

      } else {

        $('li', $ctx).hover(
          function() {
            if($('.show-for-small').is(":visible")) return false;
            var flyout = $(this).children('.flyout');
            $(flyout).stop().addClass('visible').animate({ opacity: 1 }, 300);
            // if(flyout) {
            //   setTimeout(function() {
            //     if($(flyout).parents('.flyout').length > 0) {
            //       $(flyout).stop().show().animate({ opacity: 1 }, 300);
            //     } else {
            //       $(flyout).css('opacity', 1).slideDown(300, function() { $(this).css('overflow', 'visible') });
            //     }
            //   }, hover_in_delay)
            // }
          },
          function() {
            if($('.show-for-small').is(":visible")) return false;
            var flyout = $(this).children('.flyout');
            if(flyout) {
              $(flyout).stop().animate({ opacity: 0 }, 100, function() { $(this).removeClass('visible'); $(this).css({'opacity': 1}) });
              // setTimeout(function() {
              //   if($(flyout).parents('.flyout').length > 0) {
              //     $(flyout).stop().animate({ opacity: 0 }, 300, function() { $(this).hide(); });
              //   } else {
              //     $(flyout).css('opacity', 1).slideUp(300, function() { $(this).css('overflow', 'visible') });
              //   }
              // }, hover_out_delay)
            }
          }
        );

      }

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.PageTitle = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Pager = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Pages = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.PriceBox = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Process = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SectionHeader = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Service = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onInitStyle: function(data) {
      var $ctx = this.$ctx;

      if(data['color_scheme'] == 'dark') {
        $('img[src$="_icon.png"]', $ctx).each(function() {
          var src = $(this).attr('src');
          var new_src = src.replace(/\.png$/, '_dark.png')
          $(this).attr('src', new_src);
        });
      } else {
        $('img[src$="_icon_dark.png"]', $ctx).each(function() {
          var src = $(this).attr('src');
          var new_src = src.replace(/_dark\.png$/, '.png')
          $(this).attr('src', new_src);
        });
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.SmartAppear = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      var delay = 0;
      var interval = 500;

      $('.mod', $ctx).each(function(i) {
        $(this).appear(function() {
          $(this).delay(delay).queue(function(next) {
            $(this).addClass("animated fadeInDown");
            // console.log('appeared');
            next();
          });
          delay += interval;
        })
      });

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Social = Tc.Module.extend({    
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },    
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Tabs = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('jquery-ui.js', 'plugin', 'onBinding');
      if(this.$ctx.hasClass('vertical')) {
        this.require('jquery.blahlab.vertical-tabs.js', 'plugin', 'onBinding');
      }
    },
    onBinding: function() {
      var $ctx = this.$ctx;

      if($ctx.hasClass('vertical')) {
        $ctx.blahlab_vertical_tabs();
      } else {
        $ctx.tabs();
      }
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Testimonials = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      this.require('slides.jquery.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;

    }
  })
})(Tc.$);
(function($) {
  Tc.Module.Text = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);
(function($) {
  Tc.Module.TopBar = Tc.Module.extend({
    init: function($ctx, sandbox, modId) {
      this._super($ctx, sandbox, modId);
    },
    dependencies: function() {
      // this.require('jquery.ui.core.js', 'plugin', 'onBinding');
    },
    onBinding: function() {
      var $ctx = this.$ctx;
    }
  })
})(Tc.$);

