function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
    return null;
  }
  else{
    return results[1] || 0;
  }
}

$(window).load(function(){

  setTimeout(function(){
  $('.messages .message.info, .messages .message.success').addClass('done');
}, 6000);

setTimeout(function(){
  $('.messages .message.error').addClass('done');
}, 5000);

});

var total=0;
var done=0;
function doneCartAll(){
  setTimeout(function(){
    if(total!==done){
      doneCartAll();
    }
    else {
      var thisUrl = window.location.href;
      if(thisUrl.indexOf('?') >= 0){
        var newUrl = thisUrl+'&message=true';
      } else {
        var newUrl = thisUrl+'?message=true';
      }
      window.location.href = newUrl;
    }
  }, 2000)
}

var FBcheck=false;
function checkFB(){
  $('.fbcompany').each(function(){
    if($(this).html()==""){
      if($('.fbcompany').first().html()!=""){
        $(this).html($('.fbcompany').first().html());
      }
      FBcheck=true;
    }
  });

  if(FBcheck){
    setTimeout(function(){
      checkFB();
    },500);
  }

}
$(document).ready(function(){
  $("#owl-featured").owlCarousel({
    margin:0,
    pagination:false,
    loop:false,
    nav:false,
    items:5,
    autoplay:true,
    responsive:{
      0:{
        items:2
      },
      767:{
        items:3
      },
      991:{
        items:5
      }
    }
  });
  $("#owl-featured-big").owlCarousel({
    margin:0,
    pagination:false,
    loop:false,
    nav:false,
    items:2,
    autoplay:true
    // responsive:{
    //   0:{
    //     items:2
    //   },
    //   767:{
    //     items:2
    //   }
    // }
  });
  if($("#owl-featured-big").find(".owl-item").length <= 2) {
    $(this).find(".product-nav").hide();
    $(this).find(".owl-item:last-child .item").addClass("border-right-owl-big");
  }
  $(".tab-2 .owl-carousel").owlCarousel({
    margin:0,
    items:5,
    loop:true,
    autoplay:true,
    responsive:{
      0:{
        items:2
      },
      767:{
        items:3
      },
      991:{
        items:5
      }
    }
  });
  $(".tab-1 .owl-carousel").owlCarousel({
    margin:0,
    items:5,
    loop:true,
    autoplay:true,
    responsive:{
      0:{
        items:2
      },
      767:{
        items:3
      },
      991:{
        items:5
      }
    }
  });
});
$(document).ready(function(){

  $('#search input').keyup(function(){
    liveSearch();
  });
  $('#search input').bind('webkitspeechchange', function(){
    liveSearch();
  });

  checkFB();
    if ($(window).width() <= 991) {
    $('#footer .mobile-slide .footer-title').on('click', function(){
    var cur = $(this);

    cur.toggleClass('active');
    cur.closest('.mobile-slide').find('ul').slideToggle();
  });
  }

  if($.urlParam('message') == 'true') {
    $('.all-products-message').show();
  }

  if ($(window).width() < 768) {

      var headerHeight = $('#header').outerHeight();
      var windowHeight = $(window).height();
      var heroHeight = windowHeight - headerHeight;

      $('.hero-wrapper-block .item').css('height', heroHeight);

    }

  $('a.open-filters').on('click', function(){
    $('.mobile-filters').slideToggle();
  });

  $('.all-in-cart').live('click', function(){

    $(this).html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

    if ($(window).width() > 768) {
      var productForm = $('.products .list-product-wrap form.firstform-desktop');
    } else {
      var productForm = $('.products .list-product-wrap form.firstform-mobile');
    }

    var timeout = 0;
    $.each(productForm, function(){
      var curForm = $(this);
      var postUrl = $(this).data('action');
      var quantity = $(this).find('input').val();

      if (quantity > 0) {
        total++;
        setTimeout(function(){
          $.ajax({
            url: postUrl+'?quantity='+quantity, // form action url
            type: 'POST', // form submit method get/post
            data: curForm.serialize() // serialize form data
          }).done(function() {
            done++;
          });
        }, timeout);
        timeout+=1000;

      }

      doneCartAll();

    });
  });

  var activeTab = $('.home-products ul.tabs-list li a.active').closest('li').data('tab');
  $('.tabs .tab.tab-'+activeTab).addClass('active');

  var menuProductUrl = $('.menu-product').data('url');

  if (menuProductUrl) {
  $.get(menuProductUrl.replace('.html', '.ajax'), function(product){
    var img = product.image;
    img = img.replace('50x50x2', '300x300x2');

    $('.menu-product').append('<div class="image-wrap"><a href="'+product.url+'"><img src="'+ img +'" width="100%"></a></div>');
    var info =  $('<div class="info"></div>').appendTo('.menu-product');
    $('<a class="title" href="'+product.url+'">'+product.title+'</a>').appendTo(info);
    var price = $('<div class="price"></div>').appendTo(info);
    if (product.price.price_old){
      $('<span class="old-price">'+ product.price.price_old_money +'</span>').appendTo(price);
    }
    $('<span class="new-price">'+ product.price.price_money +'</span>').appendTo(price);
    $('<div class="buttons"><a href="'+ product.url +'" class="more-info">'+moreInfo+'</a><a href="'+basicUrl+'cart/add/'+product.vid+'" class="shop-now"><i class="ion ion-ios-cart"></i></a></div>').appendTo(info);
  });
  }

   var dt = new Date();
  var time = dt.getHours();
  var year = dt.getFullYear();
  var month = dt.getMonth()+1;
  var day = dt.getDate();
  var dayNr = dt.getDay();
  var currentDate = dt.getFullYear() + '/' +
      (month<10 ? '0' : '') + month + '/' +
      (day<10 ? '0' : '') + day;

  var currentDateDutch =  (day<10 ? '0' : '') + day + '-'+ (month<10 ? '0' : '') + month + '-' + dt.getFullYear()
  //console.log(time);
  var showClock = true;

  $.each(showDays, function(index, showDay){
    if(dayNr == showDay && time >= showFrom) {
      console.log(showDays);
      console.log(showDay);
      $('.order-before').show();
      $('.order-before .text .time').countdown(currentDate +' '+orderBefore)
        .on('update.countdown', function(event) {
          var format = '%-H:%M:%S';
          $(this).html(event.strftime(format));
        })
        .on('finish.countdown', function(event) {
          $(this).closest('.order-before').hide();
        });
    }
  });


  $('.filter-dropdown .dropdown-title').on('click', function(){
    var filterBox = $('.filter-dropdown-box');

    if (!$(this).closest('.filter-dropdown').find('.filter-dropdown-box').hasClass('active')) {
      $.each(filterBox, function(){
        $(this).removeClass('active');
      });
      $(this).closest('.filter-dropdown').find('.filter-dropdown-box').addClass('active');
    } else {
      $.each(filterBox, function(){
        $(this).removeClass('active');
      });
      $(this).closest('.filter-dropdown').find('.filter-dropdown-box').removeClass('active');
    }
  });

    $(document).click(function() {
      $('.filter-dropdown-box').removeClass('active');
    });

    $('.filter-dropdown .dropdown-title').click(function(e) {
      e.stopPropagation(); // This is the preferred method.
      return false;        // This should not be used unless you do not want
      // any click events registering inside the div
    });

  /*
  $('.owl-headlines').owlCarousel({
    pagination:true,
    margin:0,
    nav:true,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    items:1,
    autoplay:true
  });
  */

  if ($('.owl-headlines .item').length === 1) {

    $('.owl-headlines').owlCarousel({
      pagination:true,
      margin:0,
      nav:true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      items:1,
      autoplay:true
    });

    $('.owl-headlines .owl-controls').hide();
  } else {
    $('.owl-headlines').owlCarousel({
      loop:true,
      pagination:true,
      margin:0,
      nav:true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      items:1,
      autoplay:true
    });
  }

  $('.product-option input[type="radio"]').closest('.product-configure-custom-option-item').addClass('ui radio checkbox');
  $('.product-option input[type="checkbox"]').closest('.product-configure-custom-option-item').addClass('ui checkbox');

  $(".various").fancybox({
    maxWidth  : 800,
    maxHeight  : 600,
    fitToView  : false,
    width    : '70%',
    height    : '70%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect  : 'none'
  });


  $('a.product-add-cart-btn').fancybox({
    closeBtn: false,
    padding:0,
  });

  $('a.close-popup').live('click', function(){
    $('.product-popup').removeClass('add-btn-popup');
    parent.$.fancybox.close();
  });
  $('a.product-add-cart-btn').live('click', function(){
    $('.product-popup').addClass('add-btn-popup');
    var popupId = $(this).attr('href');
    //console.log(popupId);

    if ($(this).closest('.product').hasClass('loaded')){

      $(this).closest('.product').addClass('loaded');
      var productUrl = $(this).closest('.product').data('url');

      $.get(productUrl, function(data){
        var product = data.product;
        var productId = product.id;
        if (product.variants) {
          var variants = product.variants;
          // $(popupId+'.product-popup').find('.variants').hide();
          $.each(variants, function(variants, variant){
            var price = currency+variant.price.price.toFixed(2).replace('.', ',');
            $(popupId+'.product-popup').find('.variants select').append('<option class="'+variant.stock.available+'" value="'+variant.id+'">'+ variant.title +' - '+price+'</option>');
            $(popupId+'.product-popup').find('.variants .menu .item').addClass(variant.stock.available);
          });
        } else {
          $(popupId+'.product-popup').find('.variants').hide();
        }
        

        var images = product.images;
        $.each(images, function(images, image){
          var imgId = image;
          //console.log(imgId);
          imgId = pad(imgId, 9);
          shopId = pad(shopId, 6);
          var imgstring = '<img src="https://static.shoplightspeed.com/shops/'+shopId+'/files/000000000/200x200x2/image.jpg" />';
          var imgstringMain = '<img src="https://static.shoplightspeed.com/shops/'+shopId+'/files/000000000/900x900x2/image.jpg" />';
          img = imgstring.replace("000000000", imgId);
          imgMain = imgstringMain.replace("000000000", imgId);
          $(popupId+'.product-popup').find('.popup-thumbs').append('<div class="item">'+img+'</div>');
          //$('#product-popup-'+productId+'.product-popup').find('.popup-slider').empty();
          $(popupId+'.product-popup').find('.popup-slider').append('<div class="item">'+imgMain+'</div>');
        });






        var $sync1 = $('.popup-slider.'+productId+'');
        var $sync2 = $('.popup-thumbs.'+productId+'');

        flag = false,
          duration = 300;


          $sync1.owlCarousel({
            items: 1,
            margin: 0,
            nav: false,
            dots: true,
            responsive:{
              0:{
                items:1
              },
              767:{
                items:1
                // nav: true,
                // navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
              },
              992:{
                items:1
              }
            }
          })
          .on('change.owl.carousel', function(e) {

            if (e.namespace && e.property.name === 'items' && !flag) {
              flag = true;
              $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
              flag = false;
            }
          })
          .on('changed.owl.carousel', function(e) {
            var currentItem = e.item.index;
            $('.img-pages .page').text(currentItem+1);
          });



        $sync2.on('click', '.owl-item', function () {
            $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
          })
          .on('change.owl.carousel', function (e) {

            if (e.namespace && e.property.name === 'items' && !flag) {
              flag = true;
              $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
              flag = false;
            }
          });



        $('#product-popup-'+productId+'.product-popup').find('.thumbs .thumb-next').click(function() {
          $sync2.trigger('next.owl.carousel');
        });

        $('#product-popup-'+productId+'.product-popup').find('.thumbs .thumb-prev').click(function() {
          $sync2.trigger('prev.owl.carousel');
        });

      });
    }
  });





  $('a.open-popup').fancybox({
    closeBtn: false,
    padding:0,
  });

  $('a.close-popup').live('click', function(){
    parent.$.fancybox.close();
  });

  $('a.open-popup').live('click', function(){
    var popupId = $(this).attr('href');
    //console.log(popupId);

    if (!$(this).closest('.product').hasClass('loaded')){

      $(this).closest('.product').addClass('loaded');
      var productUrl = $(this).closest('.product').data('url');

      $.get(productUrl, function(data){
        var product = data.product;
        var productId = product.id;

        if (product.variants) {
          var variants = product.variants;
          $.each(variants, function(variants, variant){
            var price = currency+variant.price.price.toFixed(2).replace('.', ',');
            $(popupId+'.product-popup').find('.variants select').append('<option value="'+variant.id+'">'+ variant.title +' - '+price+'</option>');
          });
        } 
        else {
          $(popupId+'.product-popup').find('.variants').hide();
        }

        var images = product.images;
        $.each(images, function(images, image){
          var imgId = image;
          //console.log(imgId);
          imgId = pad(imgId, 9);
          shopId = pad(shopId, 6);
          var imgstring = '<img src="https://static.shoplightspeed.com/shops/'+shopId+'/files/000000000/200x200x2/image.jpg" />';
          var imgstringMain = '<img src="https://static.shoplightspeed.com/shops/'+shopId+'/files/000000000/900x900x2/image.jpg" />';
          img = imgstring.replace("000000000", imgId);
          imgMain = imgstringMain.replace("000000000", imgId);
          $(popupId+'.product-popup').find('.popup-thumbs').append('<div class="item">'+img+'</div>');
          //$('#product-popup-'+productId+'.product-popup').find('.popup-slider').empty();
          $(popupId+'.product-popup').find('.popup-slider').append('<div class="item">'+imgMain+'</div>');
        });






        var $sync1 = $('.popup-slider.'+productId+'');
        var $sync2 = $('.popup-thumbs.'+productId+'');

        flag = false,
          duration = 300;


          $sync1.owlCarousel({
            items: 1,
            margin: 0,
            nav: false,
            dots: true,
            responsive:{
              0:{
                items:1
              },
              767:{
                items:3,
                nav: true,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
              },
              991:{
                items:1
              }
            }
          })
          .on('change.owl.carousel', function(e) {

            if (e.namespace && e.property.name === 'items' && !flag) {
              flag = true;
              $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
              flag = false;
            }
          })
          .on('changed.owl.carousel', function(e) {
            var currentItem = e.item.index;
            $('.img-pages .page').text(currentItem+1);
          });



        $sync2.on('click', '.owl-item', function () {
            $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
          })
          .on('change.owl.carousel', function (e) {

            if (e.namespace && e.property.name === 'items' && !flag) {
              flag = true;
              $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
              flag = false;
            }
          });



        $('#product-popup-'+productId+'.product-popup').find('.thumbs .thumb-next').click(function() {
          $sync2.trigger('next.owl.carousel');
        });

        $('#product-popup-'+productId+'.product-popup').find('.thumbs .thumb-prev').click(function() {
          $sync2.trigger('prev.owl.carousel');
        });

      });
    }
  });

    $('.sm-thumbs .thumb a').on('click', function(){
      var thumbIndex = $(this).data('index');
      $sync1.trigger('to.owl.carousel', thumbIndex)
    });



  $('.product-popup').find('.variants .menu .item').live('click', function(){
    var value = $(this).closest('.menu').find('.item.active').data('value');
    $(this).closest('form').attr('action', basicUrl+'cart/add/'+value+'/');
    var currentVariant = ($(this).attr('data-value'));
    var unavailableVariant = ($('.variants select option.false').attr('value'));
    if(currentVariant == unavailableVariant) {
    	$(this).addClass('falseVariant');
      $(this).closest('form').addClass('nonSubmittable');
    } else {
    	$(this).removeClass('falseVariant');
      $(this).closest('form').removeClass('nonSubmittable');
    }
  });

  $('a[data-scroll]').on('click', function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#"+$(this).data('scroll')).offset().top
    }, 1500);
  });


  if ($('.brands-slider').hasClass('small')){
    $('.brands-slider').owlCarousel({
      loop:true,
      margin:15,
      nav:false,
      autoplay:true,
      responsive:{
        0: {
          items:3
        },
        768:{
          items:4
        },
        992:{
          items:6
        },
        1200:{
          items:10
        }
      }
    });
  } else {
    $('.brands-slider').owlCarousel({
      loop:true,
      margin:15,
      nav:false,
      autoplay:true,
      responsive:{
        0: {
          items:3
        },
        768:{
          items:4
        },
        992:{
          items:6
        },
        1200:{
          items:7
        }
      }
    });
  }


    var productOwl = $('.productslider');

  if ($('.productslider').hasClass('small')){

    productOwl.owlCarousel({
      loop:true,
      margin:15,
      nav:false,
      autoplay:true,
      autoplayHoverPause:true,
      responsive:{
        0:{
          items:2
        },
        600:{
          items:3
        },
        1000:{
          items:5
        }
      }
    });

  } else if ($('.productslider').hasClass('big-slide')) {
    productOwl.owlCarousel({
      loop:true,
      margin:15,
      nav:false,
      autoplay:true,
      autoplayHoverPause:true,
      responsive:{
        0:{
          items:2
        },
        600:{
          items:3
        },
        1000:{
          items:3
        }
        }
      });

      } else {
    productOwl.owlCarousel({
      loop:true,
      margin:15,
      nav:false,
      autoplay:true,
      autoplayHoverPause:true,
      responsive:{
        0:{
          items:2
        },
        600:{
          items:3
        },
        1000:{
          items:4
        }
    }
    });

  }

  $('.product-nav a.next').click(function() {
    $('.productslider').trigger('next.owl.carousel');
  });
  $('.product-nav a.prev').click(function() {
    $('.productslider').trigger('prev.owl.carousel');
  });

  $('.usp-slider').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
    items:1,
    autoplay:true,
    autoplayTimeout:3000,
    responsive:{
      0:{
        items:1
      },
      768:{
        items:2
      }
    }
    });

  $(".cart-dropdown .cart-body").customScrollbar();
  $(".reviews .reviews-body").customScrollbar();

  $('.product-fancy').fancybox({
    wrapCSS: 'product-img',
    padding:0,
    closeBtn: true,
    nextClick: true,
    arrows:false,
    closeBtn:false,
    maxWidth : '80%'
  });
  // $('.product-zoom-btn').fancybox({
  //   wrapCSS: 'product-img',
  //   padding:0,
  //   closeBtn: true,
  //   nextClick: false,
  //   arrows:false,
  //   maxWidth : '80%'
  // });


      $('.product-zoom-btn').live('click', function(){
         $('.fancybox-overlay').addClass('non-main-product').addClass('.product-img-overlay');
      });

       $('.product-fancy').live('click', function(){
         $('.fancybox-overlay').addClass('product-img-overlay');
         $('.fancybox-overlay').append('<div class="close-product-img"><i class="fa fa-times" aria-hidden="true"></i></div>');
         $('.fancybox-overlay').append('<div class="next-product-img"><i class="fa fa-angle-right" aria-hidden="true"></i></div>');
         $('.fancybox-overlay').append('<div class="prev-product-img"><i class="fa fa-angle-left" aria-hidden="true"></i></div>');
       });

      $('.close-product-img').live('click', function(){
        parent.$.fancybox.close();
      });
      $('.next-product-img').live('click', function(){
        parent.$.fancybox.next();
      });
      $('.prev-product-img').live('click', function(){
        parent.$.fancybox.prev();
      });


  $('a.open-sidebar').on('click', function(){
    $('.sidewrap').slideToggle(300);
    $(this).toggleClass('active');
  });

  $('.open-search').on('click', function(){
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('.mobile-search').addClass('active');
      setTimeout(function(){
        $('.mobile-search input').focus();
      }, 500);
    } else {
      $(this).removeClass('active');
      $('.mobile-search').removeClass('active');
    }
  });

  $('.open-variants').on('click', function(e){
    var product = $(this).closest('.list-product-wrap');
    var variants = product.find('.variants');
    var cartAdd = product.data('cart-url');

    if(!variants.hasClass('active')){
      $.get(product.data('product-url').replace('.html', '.ajax'), function(json){

        if(json.variants.length == undefined){
          product.find('.variants').empty();
          product.find('.variants').addClass('has-variants');
          var inputValue =  product.find('.variants').data('input-value');
          $.each(json.variants, function(key, variant){

            var varHTML = '<div class="variant"><span class="title visible-xs">'+variant.title+'</span><div class="variant-inner">';
            varHTML+='<span class="title hidden-xs">'+variant.title+'</span>';
            if($('#shopb2b').val()!=="") varHTML+='<span class="price">'+variant.price.price_excl_money+' <span class="price-incl">('+variant.price.price_incl_money+' Incl. btw)</span></span>';
            else varHTML+='<span class="price">'+variant.price.price_incl_money+'</span>';
            varHTML+='<form class="firstform-desktop firstform-mobile" data-action="'+cartAdd+variant.id+'" action="'+cartAdd+variant.id+'" method="post"><div class="change"><a href="javascript:;" class="down change-q" data-way="down">-</a><input type="text" name="quantity" value="'+inputValue+'" /><a href="javascript:;" class="up change-q" data-way="up">+</a></div><a href="javascript:;" class="btn submit-form special"><span class="cart-icon"><i class="ion ion-ios-cart"></i></span><span class="plus-icon"><i class="fa fa-plus" aria-hidden="true"></i></span></a></form></div>';
            product.find('.variants').append(varHTML);
          });

          variants.addClass('active');
        } else {
          if(!variants.hasClass('active')){
            product.find('.order .cart').append('<div class="no-variants"><i class="fa fa-times" aria-hidden="true"></i>'+noVariants+'</div>');
          } else {
            product.find('.order .cart .no-variants').removeClass('hide');
          }
        }
      });
    }

    /** Show/Hide variants */
    setTimeout(function(){
      product.find('.variants.has-variants').slideToggle();
    }, 300);


  });

  $('.products .list-product .order .cart .no-variants').live('click', function(){
    $(this).addClass('hide');
  });


  $('.change a').live('click', function(){
    var variant = $(this).closest('.change');
    var quantity = parseInt(variant.find('input').val());

    if ($(this).data('way') == 'up'){
        quantity++;
    } else {
      if (quantity > 0){
        quantity--;
          } else {
          quantity = 0;
      }
    }

    variant.find('input').val(quantity);

  });

  $('.submit-form').live('click', function(){
    $(this).closest('form').submit();
  });

  $('.submit-form.special').live('click', function(){
    var url = $(this).closest('form').attr('action')+'?quantity='+$(this).closest('form').find('input').val();
    window.location.href = url;
  })


  $('a.open-cart').on('click', function(){
    $('.cart-dropdown').addClass('active');
    $('body').addClass("stop-scrolling");
  });

  $('.close-cart-drp').on('click', function(){
    $('.cart-dropdown').removeClass('active');
    $('body').removeClass("stop-scrolling");
  });
  $('.cart-dropdown').click(function(e) {
      if (e.clientX < $(this).offset().left) {
        $('.cart-dropdown').removeClass('active');
        $('body').removeClass("stop-scrolling");
      }
  });
  $(document).on('keydown', function(e){
      if (e.keyCode === 27) { // ESC
          $('.cart-dropdown').removeClass('active');
          $('body').removeClass("stop-scrolling");
      }
  });


  var $sync1 = $("#sync1");
  var $sync2 = $("#sync2");

    flag = false,
    duration = 300;

  $sync1.owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    dots: true,
    responsive:{
      0:{
        items:1
      },
      767:{
        items:3,
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
      },
      991:{
        items:1
      }
    }
  })
    .on('change.owl.carousel', function(e) {

      if (e.namespace && e.property.name === 'items' && !flag) {
        flag = true;
        $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
        flag = false;
      }
    })
    .on('changed.owl.carousel', function(e) {
      var currentItem = e.item.index;
       $('.img-pages .page').text(currentItem+1);
    });


  $sync2.on('click', '.item', function () {
      $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
    })
    .on('change.owl.carousel', function (e) {

      if (e.namespace && e.property.name === 'items' && !flag) {
        flag = true;
        $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
        flag = false;
      }
    });


  $('.productpage .thumbs .thumb-next').click(function() {
    $sync2.trigger('next.owl.carousel');
  });
  $('.productpage .thumbs .thumb-prev').click(function() {
    $sync2.trigger('prev.owl.carousel');
  });

  $('.product-image-wrap .img-next').click(function() {
    $sync1.trigger('next.owl.carousel');
  });
  $('.product-image-wrap .img-prev').click(function() {
    $sync1.trigger('prev.owl.carousel');
  });

  var productScore = $('.score-wrap .stars').data('score');
  var pos = productScore;
  var neg = 100 - productScore;

  $('.score-wrap .stars .score .pos').css('width', pos+'%');
  $('.score-wrap .stars .score .neg').css('width', neg+'%');

  var review = $('.reviews .review');
  $.each(review, function(){
    var reviewScore = $(this).find('.stars').data('score');
    var posRev = reviewScore;
    var negRev = 100 - reviewScore;

    $(this).find('.stars .score .pos').css('width', posRev+'%');
    $(this).find('.stars .score .neg').css('width', negRev+'%');
  })

  $('.filter-title').on('click', function(){
    $(this).toggleClass('active');
    var className = $(this).data('box');
    $('.'+className).slideToggle();
  });

$('.top-filters select, .product-option select').dropdown();
$('.productbundle .bundle-wrap .sub-products .product .bundle-option select').dropdown();

  $('.menu-box ul li .more-cats, .sidebar ul.side-cats li .more-cats').on('click', function(){
    var cur = $(this);
    if (!(cur.closest('li').hasClass('active'))) {
      cur.closest('ul').find('li').removeClass('active');
      cur.closest('ul').find('li ul').slideUp(300);
      cur.closest('li').addClass('active');
      cur.closest('li').find('>ul').slideDown(300);
    } else {
      cur.closest('li').removeClass('active');
      cur.closest('li').find('>ul').slideUp(300);
    }

    $(this).closest('li').find('.mobile-tab').slideToggle();

    /*
    if (!(cur.closest('li').hasClass('active'))) {
      cur.closest('ul').find('ul').slideUp(300);
      cur.closest('li').find('>ul').slideToggle(300);
      cur.closest('li').removeClass('active');
    } else {
      cur.closest('li').removeClass('active');
      cur.closest('li').find('>ul').slideToggle(300);
    }

    cur.closest('ul').find('li').removeClass('active');
    //cur.closest('li').toggleClass('active');
    cur.closest('li').find('>ul').slideToggle(300);
    cur.closest('li').find('>.mobile-tab').slideToggle(300);
    */
  });


  $('a.open-menu').click(function(){
    $('.menu-box, .menu-wrap').toggleClass('open');
    $('.body-wrap').addClass('open');
    $('#header .main-header').addClass('open');
    $('body, html').addClass('no-scroll');
  });

  $('.close-menu').on('click', function(){
    $('.menu-box, .menu-wrap').toggleClass('open');
    $('.body-wrap').removeClass('open');
    $('body, html').removeClass('no-scroll');
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      $('.menu-wrap, .menu-box').removeClass('open');
      $('.body-wrap').removeClass('open');
      $('body, html').removeClass('no-scroll');
    }
  });

  $('.menu-wrap').click(function() {
    $('.menu-wrap, .menu-box').removeClass('open');
    $('.body-wrap').removeClass('open');
    $('body, html').removeClass('no-scroll');
  });

  $('.filter-box, .menu-box').click(function(event){
    event.stopPropagation();
  });

  $('.tabs ul.tabs-list').find('li a.tab-link').on('click', function(){
    var activeTab = $(this).closest('li').data('tab');
    $('.tabs ul.tabs-list').find('li a.tab-link').removeClass('active');
    $(this).addClass('active');
    $('.tabs').find('.tab').removeClass('active');
    $('.tabs').find('.tab.tab-'+activeTab).addClass('active');
  });

  // navbar
  $('.desktop .item, .desktop .subitem').hover(function(){
    $(this).addClass('hover');
    $(this).find('.subnav:first').show();
  }, function(){
    $(this).removeClass('hover');
    $(this).find('.subnav').hide();
  });

  // responsive navigation
  $('.burger').click(function() {
    if ($(this).hasClass('open')) {
      $(this).add('header').add('.wrapper').removeClass('open').addClass('close');
    } else {
      $(this).add('header').add('.wrapper').removeClass('close').addClass('open');
    }
  });
  $('.wrapper').click(function() {
    if ($('.burger').hasClass('open')) {
      $('.burger').add('header').add('.wrapper').removeClass('open').addClass('close');
    }
  });

  // zoombox
  // $('.thumbs a').mousedown(function(){
  //   $('.images a').hide();
  //   $('.images a[data-image-id="' + $(this).attr('data-image-id') + '"]').css('display','block');
  //   $('.thumbs a').removeClass('active');
  //   $('.thumbs a[data-image-id="' + $(this).attr('data-image-id') + '"]').addClass('active');
  // });

  $('.home-blog .articles').each(function(){
	  if($(this).children().size()>3){ $(this).parents('.home-blog').addClass('more-than-3'); }
  	if($(this).children().size()>4){ $(this).parents('.home-blog').addClass('more-than-4'); }
  });




  // tabs
  /*
  $('.tabs a').click(function(){
    var tabs = $(this).closest('.tabs');
    var pages = $('.tabsPages');
    tabs.find('a').closest('li').removeClass('active');
    pages.find('.page').removeClass('active');
    $(this).closest('li').addClass('active');
    pages.find('.page.'+$(this).attr('rel')).addClass('active');
    return false;
  });
  */

  // categories
  $('.categories .category').hover(function(){
    $('.categories .category').addClass('hover');
    $(this).removeClass('hover');
  }, function(){
    $('.categories .category').removeClass('hover');
  });

  if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
    $('body').append('<div class="wsa-demobar">Your browser is out of date. We recommend <a class="link" href="www.google.com/chrome/â€Ž">Google Chrome</a> to download.</div>');
    $('body').css('marginTop', '42px');
  }
});

$(window).load(function(){
  sizing();
});
$(window).resize(function(){
  sizing();
});

$(window).on('load', function(){
  var mainHeaderHeightOld = $('.main-header').outerHeight();
  var mainMenuHeightOld = $('.main-menu').outerHeight();
  
  $('#header .search').css('top', mainHeaderHeightOld+mainMenuHeightOld);
});
function sizing() {



  /*
  if ($(window).width() > 768) {
    var productForm = $('.products .list-product-wrap').find('form.firstform-desktop');
  } else {
    var productForm = $('.products .list-product-wrap').find('form.firstform-mobile');
  }
  */

  var sidebarWidth = $('.sidebar').outerWidth();
  var subBoxWidth = sidebarWidth * 3;

  $('.sidebar .sub-box').css('width', subBoxWidth);

  var topbarMenu = $('.topbar');
  var topbarHeight = $('.topbar').outerHeight();
  var mainHeaderHeight = $('.main-header').outerHeight();
  var mainMenuHeight = $('.main-menu').outerHeight();

  $(document).ready(function(){
    if($(window).width() > 991) {
      if((topbarMenu).length) {
        $(window).scroll(function() {
          if ($(this).scrollTop() > topbarHeight) {
            $('.main-header').addClass('fixed');
            $('#header .search').addClass('fixed');
            if($(window).width() < 991) {
              $('#header .search.fixed').css('top', mainHeaderHeight-10);
            } else {
              $('#header .search.fixed').css('top', mainHeaderHeight-40);
            }
            $('.topbar').css('margin-bottom', (mainHeaderHeight-40));
          } else if ($(this).scrollTop() < topbarHeight) {
            $('.main-header').removeClass('fixed');
            $('#header .search.fixed').css('top', 'initial');
            $('#header .search').removeClass('fixed');
            $('.topbar').css('margin-bottom', 0);
          }
        });
      } else {
        $(window).scroll(function() {
          if ($(this).scrollTop() > 0) {
            $('.main-header').addClass('fixed');
            $('.categorie-menu-item').addClass('cat-fixed');
            $('.searchbar-category').addClass('bar-mover');
            $('#header .main-header .hallmark').addClass('bar-mover-hall');
            if($(window).width() < 991) {
              $('#header .search.fixed').css('top', mainHeaderHeight-10);
            } else {
              $('#header .search.fixed').css('top', mainHeaderHeight-40);
            }
            $('#header .search').addClass('fixed');

          } else if ($(this).scrollTop() < 1) {
            $('.main-header').removeClass('fixed');
            $('#header .search').css('top', mainHeaderHeight+mainMenuHeight);
            $('#header .search').removeClass('fixed');
            $('.categorie-menu-item').removeClass('cat-fixed');
            $('.searchbar-category').removeClass('bar-mover');
            $('#header .main-header .hallmark').removeClass('bar-mover-hall');
          }
        });
      }
    }
  });


  var thumbHeight = $('#sync2').outerHeight();
  $('.productpage .thumbs .thumb-nav').css({
    'height': thumbHeight,
    'line-height': thumbHeight+'px'
  });

  /*
  if ($(window).width() < 992 && $(window).width() > 767) {
    var squareBannerWidth = $('.banner-2').outerWidth();
    $('.banner-2, .banner-4').css('height', squareBannerWidth);

    var longBannerWidth =  $('.banner-1').outerWidth();
    var longBannerHeight = longBannerWidth * 0.4;
    $('.banner-1, .banner-3').css('height', longBannerHeight);

  } else {
    $('.banner-2, .banner-4').css('height', '');
  }
  */

  if ($(window).width() > 1024) {
    // Description text (product hover)
    $('.product .image-wrap').mouseenter(function() {
      var descriptionHeight = $(this).find('img').outerHeight();
      var starsHeight = $(this).find('.description .stars').outerHeight();
      var cartHeight = $(this).find('.description .cart').outerHeight();
      var textHeight = descriptionHeight - starsHeight - cartHeight;
      $(this).find('.description .text').css('height', textHeight-60 + 'px');
    });
  }
  if ($(window).width() > 992) {
    // tabs height
    var OptionHeight = $('.product-option').outerHeight();
    var PriceHeight = $('.product-price').outerHeight();
    var tabsTitle = $('.product-tabs .tabs a').outerHeight();
    var imgHeight = $('.product-img').outerHeight();

    var tabsHeight =  imgHeight - PriceHeight - OptionHeight - tabsTitle;
    $('.product-tabs .page').css('maxHeight', tabsHeight + 'px');
  }
  if ($(window).width() < 767) {
    // reponsive
    $('nav.desktop').removeClass('desktop');
    $('nav').addClass('mobile');

    $('nav .item.sub').click(function() {
      var element = $(this).find('.itemLink');
      var href = element.attr('href');
      element.attr('href', '#');
      $('nav .itemLink').hide();
      element.show();
      $(this).addClass('view-subnav');

      $('nav .glyphicon-remove').show( 'fade', function(){
        element.attr('href', href);
      });
    });

    $('nav .glyphicon-remove').click(function() {
      $('nav .item.sub').removeClass('view-subnav');
      $(this).hide();
      $('nav .itemLink').show();
    });
  }
  else {
    $('nav.mobile').removeClass('mobile');
    $('nav').addClass('desktop');
    $('nav.mobile .item.sub').click(function() {
      var element = $(this).find('.itemLink');
      var href = element.attr("href");
      element.attr("href", href);
    });
  }
}

function urlencode(str){
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function liveSearch(){
  var query = $('#search input').val();
  query = urlencode(query.replace('/', '-slash-'));
  if(query.length > 2){
    var url = searchUrl + query + '/page1.ajax?limit=4';
    $.getJSON(url, function(json){

      if(json.count > 0){

        var productsHtml = [];

        $.each(json.products, function(index, product){
          var productHtml = '' +
              '<div class="product grid-cell">' +
              '<a href="' + product.url + '" title="' + product.fulltitle + '"><div class="image-wrap"><img src="' + product.image.replace('50x50x2', '200x200x2') + '" alt="' +product.fulltitle + '" /></div>' +
              '<div class="info"><h4>' + product.fulltitle + '</h4>' + '<span>' + product.description + '</span>';



          if (!shopb2b){
            if(product.price.price_old){
              productHtml = productHtml +
                '<div class="price"><span class="old-price">'+ product.price.price_old_money +'</span> ' + product.price.price_money + '</div>';
            } else {
              productHtml = productHtml +
                '<div class="price">' + product.price.price_money + '</div>';
            }
          } else {
            if(product.price.price_old){
              productHtml = productHtml +
                '<div class="price"><span class="old-price">'+ product.price.price_old_money +'</span> ' + product.price.price_money + ' <span class="inc-tax">('+product.price.price_incl_money+' '+incTax+')</span></div>';
            } else {
              productHtml = productHtml +
                '<div class="price">' + product.price.price_money + '<span class="inc-tax">('+product.price.price_incl_money+' '+incTax+')</span></div>';
            }
          }
          /*
          <a href="{{ 'service/shipping-returns' | url }}"><div class="inc-tax">({% if theme.show_currencies %}{{ product.price.price_incl | money }}{% else %}{{ product.price.price_incl | money_without_currency }}{% endif %} Incl. btw)</div></a>
          */

          productHtml = productHtml +
            '</div></a></div>';

          productsHtml.push(productHtml);
        });

        productsHtml = productsHtml.join('');

        $('#search .autocomplete .search-products').html(productsHtml);
        $('#search .autocomplete .more a').attr('href', json.url);
        $('#search .autocomplete .more span').html('(' + json.count + ')');
        $('#search .autocomplete').removeClass('noresults');
      } else {
        $('#search .autocomplete').addClass('noresults');
      }
      $('#search .autocomplete').css('display', 'block');
    });
  } else {
    $('#search .autocomplete').css('display', 'none');
  }

}

// Search new function and design js
$(window).load(function(){
  $(".hide-all_screens").remove();

  // $("#formSearch input").click(function(){
  //   $("#formSearch").addClass("wideSearch");
  // });
  // $(".search-text-remover").click(function(){
  //   $("#formSearch")[0].reset();
  //   $("#formSearch").removeClass("wideSearch");
  //   $("#search .autocomplete").fadeOut("fast");
  // });
  // $(document).click(function(event) {
  //   if(!$(event.target).closest('#formSearch').length) {
  //     if($('#formSearch').hasClass("wideSearch")) {
  //         $('#formSearch').removeClass("wideSearch");
  //         $("#formSearch")[0].reset();
  //         $("#search .autocomplete").fadeOut("fast");
  //     }
  //   }
  // })
});
$(document).ready(function(){
    if($(window).width() > 767) {
      $(".search-icon-self").click(function(){
        $(".right-search-dropdown").animate({width:'toggle'},350);
        $(".searbar-input").focus();
      });
      $(".search-text-remover").click(function(){
        $("#formSearch")[0].reset();
        $("#search .autocomplete").fadeOut("fast");
        $(".right-search-dropdown").toggle("slide", { direction: "right" }, 350);
      });
    } else if($(window).width() < 768) {
      $(".search-icon-self").click(function(){
        $(".search-mob-hidden-input").fadeToggle('fast');
        $(".searbar-input").focus();
      });
      $(".search-text-remover").click(function(){
        $("#formSearch")[0].reset();
        // $("#search .autocomplete").fadeOut("fast");
        // $(".right-search-dropdown").toggle("slide", { direction: "right" }, 350);
      });
    }


  $(".language-bar .ui.selection.dropdown").on('click', function(){
    $(".language-bar .ui.selection.dropdown").not($(this)).find(".menu").slideUp("fast");
    $(this).children(".menu").slideToggle("fast");
  });

  $("html").click(function(event) {
      if ($(event.target).closest('.ui.selection.dropdown, .ui.selection.dropdown .menu').length === 0) {
          $('.ui.selection.dropdown .menu').slideUp("fast");
      }
  });

  $(".custom-dropdown.custom-language").mouseleave(function(){
    $(".ui.selection.dropdown").children(".menu").hide();
  });

  // productpage add to cart button

});

// Blog article function
$(document).ready(function(){
  // Cart scroll body not scroll
  $('.cart-dropdown, .custom-languages .menu').on('mousewheel DOMMouseScroll', function (e) {
      var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;

      this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
      e.preventDefault();
  });




  $(".article").mouseenter(function(){
    $(".article").addClass("articleFog");
    $(this).removeClass("articleFog");
  });
  $(".article").mouseleave(function(){
    $(".article").removeClass("articleFog");
  });

  // $(".quanity-refresh").on('click', function(){
  //   console.log("sub");
  //   $('#product-inCart').submit();
  // });
});


// Categories article function
$(document).ready(function(){
  $(".category").mouseenter(function(){
    $(".category").addClass("categoryFog");
    $(this).removeClass("categoryFog");
  });
  $(".category").mouseleave(function(){
    $(".category").removeClass("categoryFog");
  });
  // Related limit 10
  $('.related-more4').each(function(){
      $(this).find('.product').slice(10,110).hide();
  });
  $('.check-from-popup').on('click', function(){
        var form = $(this).closest('form');
        var actionURL = form.attr("action");
        $.ajax({
            url: actionURL,
            data: form.serialize(),
            cache: false,
            success: function(result){
                //if the submit was successful, you redirect
                window.location.href = "/cart/";
            },
            error: function(){
                 //your error
            }
        });
  });
  $('.continue-from-popup').on('click', function(){
        var form = $(this).closest('form');
        var actionURL = form.attr("action");
        $.ajax({
            url: actionURL,
            data: form.serialize(),
            cache: false,
            success: function(result){
                //if the submit was successful, you redirect
                window.location.href = window.location.href;
            },
            error: function(){
                 //your error
            }
        });
  });
  var mobileMenuHeight = $(".menu-logo").outerHeight();
  $(".close-menu").css({'height': mobileMenuHeight + 'px'});
  $(".close-menu").css({'line-height': mobileMenuHeight + 'px'});
  // if($(window).width() > 768 && $(window).width() < 991){
  //   console.log("asd");
  //   var $sync1 = $("#sync1");
  //   $sync1.owlCarousel({
  //     items: 3,
  //     margin: 0,
  //     nav: false,
  //     dots: true
  //   });
  // }
  // $(".product-image-wrap").owlCarousel({
  //   items: 1,
  //   nav: true,
  //   navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
  // });

});
// Hero slider fullscreen
$(window).on("load resize",function(){
  if($(".hero-fullscreen").length) {
      $(".hero-wrapper-block.hero-fullscreen .item").css({ 'height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
  }
  if($(".video-foreground").length && $(window).width() > 768) {
    $(".hero-slider-wrapper").css({ 'height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
    $(".hero-video video").css({ 'height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
    $(".hero-video video").css({ 'max-height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
    $(".video-foreground .onVideo-text-wrapper").css({ 'height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
    if($(window).outerHeight() > 900) {
      $(".hero-slider-wrapper").css({ 'height': '100%' });
      // $(".video-foreground").css({ 'height': '100%' });
      $(".video-foreground .onVideo-text-wrapper").css({ 'height': '100%' });
    }
  }
  
});

// $(window).on("load resize",function(){
//   if($(".hero-fullscreen").length) {
//       $(".video-foreground iframe").css({ 'height': 'calc(100vh - ' + $("header").outerHeight() + 'px)' });
//   }
// });

// Footer spacing
$(document).ready(function(){
  if($(window).width() < 768) {
    var globalTtitleHeight = $(".footer-logo").outerHeight();
    $("#footer .footer-title").css({"margin-top": globalTtitleHeight/2 + "px", "height": globalTtitleHeight});
  }

});
$(document).ready(function(){
  // Supprime un élément spécifié quand son noeud parent est connu
  $( ".gui-block.gui-margin.gui-div-faq-links" ).remove();
  $( ".gui-page-title" ).remove();
  $( ".textpage-top > h1" ).remove();
  //$( ".page-top.hidden-xs.row" ).remove();/*supprimer titre page high summer 2018*/
  /*if (document.getElementById('iciContact') != 'undefined') {console.log('salut'); $('.container.main-content.fixed-content').parent().addClass('mainBackground');}*/
  ((((($('#iciContact').parent()).parent()).parent()).parent()).parent()).addClass('mainBackground');
  /*$('.vp-player-layout').removeAttr("style");*/
  //if ((document.getElementById("#filter_form_side") == null ) || (document.getElementById("#filter_form") == null  )) {$(".col-md-3.sidebar").remove();}
  /*if ((document.getElementsByClassName(".TestPage") != null ) ) 
   {console.log('a cacher');} else {console.log('a montrer');}  /*$('.col-md-3.sidebar').hide();/*$("#filter_form_side").css('display','none');*//*} else {$('.col-md-3.sidebar').show();}*/
  /*else {document.getElementsByClassName('.col-md-3.sidebar').style.display ='none';/*$("#filter_form_side").css('display','none');}*/
  /*$( ".col-xs-12>.index-content" ).preppend( ".col-md-3.sidebar" );*/
  $(".container.main-content>.row>.col-sm-12.col-md-9.about-page").removeClass( "col-sm-12 col-md-9" );
  /*ces deux lignes pour page video*/
  $("#player >.vp-player-layout").css({"left": "0px !important"});
  $("#player >.vp-player-layout").css({"width": ""});
  /*ce script pour pre-spring-2018*/
	 
  /*fin script pre-spring-2018*/
  /*ce script pour collapse dans page faq*/
  
  
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("activeColl");
			var content = this.nextElementSibling;
			if (content.style.display === "block") {
				content.style.display = "none";
			} else {
				content.style.display = "block";
			}
		});
	}
  /*fin script pour collapse dans page faq*/
  /*ce script pour gallerie image dans brandbook*/
  		$(document).ready(function() {
			/*
			 *  Simple image gallery. Uses default settings
			 */

			$('.fancybox').fancybox();

			/*
			 *  Different effects
			 */

			// Change title type, overlay closing speed
			$(".fancybox-effects-a").fancybox({
				helpers: {
					title : {
						type : 'outside'
					},
					overlay : {
						speedOut : 0
					}
				}
			});

			// Disable opening and closing animations, change title type
			$(".fancybox-effects-b").fancybox({
				openEffect  : 'none',
				closeEffect	: 'none',

				helpers : {
					title : {
						type : 'over'
					}
				}
			});

			// Set custom style, close if clicked, change title type and overlay color
			$(".fancybox-effects-c").fancybox({
				wrapCSS    : 'fancybox-custom',
				closeClick : true,

				openEffect : 'none',

				helpers : {
					title : {
						type : 'inside'
					},
					overlay : {
						css : {
							'background' : 'rgba(238,238,238,0.85)'
						}
					}
				}
			});

			// Remove padding, set opening and closing animations, close if clicked and disable overlay
			$(".fancybox-effects-d").fancybox({
				padding: 0,

				openEffect : 'elastic',
				openSpeed  : 150,

				closeEffect : 'elastic',
				closeSpeed  : 150,

				closeClick : true,

				helpers : {
					overlay : null
				}
			});

			/*
			 *  Button helper. Disable animations, hide close button, change title type and content
			 */

			$('.fancybox-buttons').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',

				prevEffect : 'none',
				nextEffect : 'none',

				closeBtn  : false,

				helpers : {
					title : {
						type : 'inside'
					},
					buttons	: {}
				},

				afterLoad : function() {
					this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
				}
			});


			

			

			/*
			 *  Open manually
			 */

			$("#fancybox-manual-a").click(function() {
				$.fancybox.open('1_b.jpg');
			});

			$("#fancybox-manual-b").click(function() {
				$.fancybox.open({
					href : 'iframe.html',
					type : 'iframe',
					padding : 5
				});
			});

			$("#fancybox-manual-c").click(function() {
				$.fancybox.open([
					{
						href : '1_b.jpg',
						title : 'My title'
					}, {
						href : '2_b.jpg',
						title : '2nd title'
					}, {
						href : '3_b.jpg'
					}
				], {
					helpers : {
						thumbs : {
							width: 75,
							height: 50
						}
					}
				});
			});


		});
	/*fin script pour gallerie image dans brandbook*/
  $(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});
  
});
// Productpage wishlist add function
$(".wishlisht-wrapper a").on('click', function(){
  $(".wishlisht-wrapper a").addClass("product-liked");
});

$(window).on("load",function(){
  // $(".hero-slider-wrapper .usp-block.header-usp-bottom").delay(200).fadeIn("fast");

  if($("#live-filter-max").length) {
    $("#live-filter-max").delay(200).css('opacity', 1);
  }
  if ($("#live-filter-min").length) {
    $("#live-filter-min").delay(200).css('opacity', 1);
  }

  // collection description check
  var $descLength = $('.content-block-wrapper p').length;
  var $descText = $('.content-block-wrapper p');
  if($descLength <= 1 && $descText.is(':empty')) {
    $('.product-description').hide();
  }
});

// UPDATE MAY 22
$(document).ready(function(){
  
  $('.usp-block_single').owlCarousel({
    items: 1,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout:3000,
    loop: true
  });
  
  if($(window).width() > 991) {
    var product = $('.product-collection');
    product.on('mouseover', function(){
      if (!$(this).hasClass('loaded')) {
        var cur = $(this);
        var url = $(this).data('url').replace('.html', '.ajax');
        $.get(url, function(product){
         if (product.images[1]){
           var img = product.images[1].replace('50x50x2', '370x370x3');
           var img = '<img src="'+img+'">';
           cur.find('.img .second').html(img);
           
         }
        }); 
        
        $(this).addClass('loaded');
      }
    });  
  }
});
// END UPDATE MAY 22