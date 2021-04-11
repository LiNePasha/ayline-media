/******************************************
    Version: 1.0
/****************************************** */

(function($) {
    "use strict";

   /* ==============================================
    Fixed menu
    =============================================== */
    
	// $(window).on('scroll', function () {
	// 	if ($(window).scrollTop() > 50) {
	// 		$('.header_style_01').addClass('fixed-menu');
	// 	} else {
	// 		$('.header_style_01').removeClass('fixed-menu');
	// 	}
	// });
	
	
   /* ==============================================
		Scroll to top  
	============================================== */
		
	if ($('#scroll-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#scroll-to-top').addClass('show');
				} else {
					$('#scroll-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#scroll-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}

        // Header scroll class
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
              $('#header').addClass('header-scrolled');
            } else {
              $('#header').removeClass('header-scrolled');
            }
          });
        
          if ($(window).scrollTop() > 50) {
            $('#header').addClass('header-scrolled');
          }
        
          // Smooth scroll for the navigation and links with .scrollto classes
          $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              if (target.length) {
                var top_space = 0;
        
                if ($('#header').length) {
                  top_space = $('#header').outerHeight();
        
                  if (! $('#header').hasClass('header-scrolled')) {
                    top_space = top_space - 40;
                  }
                }
        
                $('html, body').animate({
                  scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');
        
                if ($(this).parents('.main-nav, .mobile-nav').length) {
                  $('.main-nav .active, .mobile-nav .active').removeClass('active');
                  $(this).closest('li').addClass('active');
                }
        
                if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('.mobile-nav-overly').fadeOut();
                }
                return false;
              }
            }
          });
        
          // Navigation active state on scroll
          var nav_sections = $('section');
          var main_nav = $('.main-nav, .mobile-nav');
          var main_nav_height = $('#header').outerHeight();
        
          $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop();
          
            nav_sections.each(function() {
              var top = $(this).offset().top - main_nav_height,
                  bottom = top + $(this).outerHeight();
          
              if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find('li').removeClass('active');
                main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
              }
            });
          });
        

    /* ==============================================
       LOADER -->
        =============================================== */

    $(window).load(function() {
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
    });

    /* ==============================================
     FUN FACTS -->
     =============================================== */

    function count($this) {
        var current = parseInt($this.html(), 10);
        current = current + 50; /* Where 50 is increment */
        $this.html(++current);
        if (current > $this.data('count')) {
            $this.html($this.data('count'));
        } else {
            setTimeout(function() {
                count($this)
            }, 30);
        }
    }
    $(".stat_count, .stat_count_download").each(function() {
        $(this).data('count', parseInt($(this).html(), 10));
        $(this).html('0');
        count($(this));
    });
	
	
	/* ==============================================
     FUN FACTS -->
     =============================================== */
	
	$(".slider-wrapper").owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        mouseDrag: false,
        touchDrag: false,
        smartSpeed: 700
    });

    /* ==============================================
     TOOLTIP -->
     =============================================== */
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()

    /* ==============================================
     CONTACT -->
     =============================================== */
    jQuery(document).ready(function() {
        $('#contactform').submit(function() {
            var action = $(this).attr('action');
            $("#message").slideUp(750, function() {
                $('#message').hide();
                $('#submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
                $.post(action, {
                        first_name: $('#first_name').val(),
                        last_name: $('#last_name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        select_service: $('#select_service').val(),
                        select_price: $('#select_price').val(),
                        comments: $('#comments').val(),
                        verify: $('#verify').val()
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#contactform img.loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#contactform').slideUp('slow');
                    }
                );
            });
            return false;
        });
    });

    /* ==============================================
     CODE WRAPPER -->
     =============================================== */

    $('.code-wrapper').on("mousemove", function(e) {
        var offsets = $(this).offset();
        var fullWidth = $(this).width();
        var mouseX = e.pageX - offsets.left;

        if (mouseX < 0) {
            mouseX = 0;
        } else if (mouseX > fullWidth) {
            mouseX = fullWidth
        }

        $(this).parent().find('.divider-bar').css({
            left: mouseX,
            transition: 'none'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(' + (mouseX) + 'px)',
            transition: 'none'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(' + (-1 * mouseX) + 'px)',
            transition: 'none'
        });
    });
    $('.divider-wrapper').on("mouseleave", function() {
        $(this).parent().find('.divider-bar').css({
            left: '50%',
            transition: 'all .3s'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(50%)',
            transition: 'all .3s'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(-50%)',
            transition: 'all .3s'
        });
    });

      /* ==============================================
                      Team -->
     =============================================== */
    $(".team-list").on("click", "a", function(a) {
          a.preventDefault();
          var e = $(this).data("team");
          $(".team-single").removeClass("active"), $(".team-list li").removeClass("active"), $("#" + e).addClass("active"), $(this).parent().addClass("active")
      });
    

})(jQuery);

    /* ==============================================
     shop products -->
     =============================================== */
let carts = document.querySelectorAll(".add-cart")
let products = [
  {
    name: "App Development",
    tag: 'appdev',
    price: 15,
    inCart: 0
  },
  {
    name: "Wep Development",
    tag: 'wepdev',
    price: 20,
    inCart: 0
  },
  {
    name: "Game Development",
    tag: 'gamedev',
    price: 10,
    inCart: 0
  },
  {
    name: "Hack Development",
    tag: 'hackdev',
    price: 25,
    inCart: 0
  }
]

for (let i=0; i < carts.length; i++){
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}

    //functions shop 

function onloadCardNumbers() {
  let productNumber = localStorage.getItem('cartNumbers');
  let cartNumber = document.querySelector(".numbers-in-cart");
  if(productNumber) {
    cartNumber.textContent = productNumber;
  }
}

function cartNumbers(product){
  let productNumber = localStorage.getItem('cartNumbers')
  let cartNumber = document.querySelectorAll(".numbers-in-cart");
  productNumber = +productNumber
  if( productNumber ){
    localStorage.setItem('cartNumbers', productNumber + 1)
    cartNumber.forEach(item => {
      item.textContent  = productNumber + 1;
    })
  }else {
    localStorage.setItem('cartNumbers', 1)
    cartNumber.forEach(item => {
      item.textContent  = 1;
    })
  }

  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  if(cartItems != null){
      if (cartItems[product.tag] == undefined){
        cartItems = {
          ...cartItems,
          [product.tag]: product
        }
      }
      cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  console.log(product.price);
  let cartCost = localStorage.getItem("totalCost")
      
    if (cartCost != null){
      cartCost = parseInt(cartCost)
      localStorage.setItem("totalCost", cartCost + product.price);
    }else {
      localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".our-product");
  let cartCost = localStorage.getItem("totalCost");
  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">

      <img src="./uploads/portfolio_07.jpg" />
      <span>${item.name}</span>
      <div class="price">$${item.price},00</div>
      <div class="quantity"> ${item.inCart} </div>
      <div class="total">$${item.inCart * item.price},00</div>
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <h4 class="basketTotalTitle" >Basket Total</h4>
      <h4 class="basketTotal" >$${cartCost},00</h4>
      </div>
    `

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
      <button class="basketTotal" id="clearall"><i class="far fa-times-circle"></i> Clear All</button>
      <a href="checkout.html" class="basketTotal">CheckOut</a>
      </div>
    `

    
  }else {
    productContainer.innerHTML += ` 
    <div class="noItems">
      no items here <a href="shop.html">Go To Shop</a>
      </div> 
      `
  }
}


function checkout(){
  let cartItems = localStorage.getItem("productInCart");
  let cheackOutContainer = document.querySelectorAll("#checkout-main")
  if(cartItems){
    cheackOutContainer.forEach(item => item.innerHTML +=
      `
    <div class="container">
    <div class="checkout-inner">
    <div class="checkout-info">
    <div class="form-title form-title-1">
    <h3>Billing details</h3>
    </div>
    <div class="row">
    <div class="col-sm-6 col-xs-12">
    <div class="checkout-billing">
    <form>
    <div class="row">
    <div class="col-sm-6 col-xs-12">
    <div class="form-group">
    <label>First Name: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-sm-6 col-xs-12">
    <div class="form-group">
    <label>Last Name: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>Company Name (optional):</label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>Country: <abbr class="required" title="required">*</abbr></label>
    <select class="form-control">
    <option>Argentina</option>
    <option>Bulgaria</option>
    <option>Canada</option>
    <option>Denmark</option>
    <option>Egypt</option>
    <option>Germany</option>
    <option>Hungary</option>
    </select>
    </div>
    </div>
    <div class="col-sm-6 col-xs-12">
    <div class="form-group">
    <label>Street Address: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-sm-6 col-xs-12">
    <div class="form-group">
    <label>Town/City: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>Postcode / ZIP (optional):</label>
    <input type="text" class="form-control">
    </div>
    </div>
    </div>
    </form>
    </div>
    </div>
    <div class="col-sm-6 col-xs-12">
    <div class="row">
    <div class="col-xs-12">
    <div class="form-group">
    <label>Phone No.: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>Email Address: <abbr class="required" title="required">*</abbr></label>
    <input type="text" class="form-control">
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>
    <input type="checkbox">
    <span>Ship to a different address?</span>
    </label>
    </div>
    </div>
    <div class="col-xs-12">
    <div class="form-group">
    <label>Order notes (optional):</label>
    <textarea class="form-control" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="checkout-order">
      <h3>Total Price You Shoud Pay</h3>
        <span>$${localStorage.getItem("totalCost")},00</span>
  </div>
    <div class="checkout-place-order">
    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
    </p>
    <button type="submit" class="btn-red">Place order</button>
    </div>
    </div>
    </div> 
    `
    )
  }else {
    cheackOutContainer.forEach(item => item.innerHTML +=`
    <div class="our-product">

    </div>
    `
    )
  }
}

function clearAll(){
  let clearAllBtn = document.querySelector("#clearall");
  if ( clearAllBtn ){
    clearAllBtn.onclick = () => {
    localStorage.removeItem("productInCart"),
    localStorage.removeItem("cartNumbers"),
    localStorage.removeItem("totalCost"),
    location.reload();
  }
  }
}


checkout();
onloadCardNumbers();
displayCart();
clearAll();




