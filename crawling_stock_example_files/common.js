if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;
      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
  
  function showlayer(self, obj, isFix = false){
    var $self = $(self);
    $(obj).attr('tabindex', '0').addClass('is_show').focus();
    if(isFix) setHiddenScroll()
    $(obj).find('.close_btn').on('click', function(){
      $(obj).removeClass('is_show');
      $self.focus();
      if(isFix) removeHiddenScroll()
      $(this).off('click');
    });
  }
  function setHiddenScroll() {
    document.documentElement.style.overflow = 'hidden'
  }
  function removeHiddenScroll() {
    document.documentElement.style.removeProperty('overflow')
  }
  let photoNewsSwiper, modalSwiper, specialEdtMenu, adSlider1, viewRelatedNewsSwiper;
  let wrapper, header, gnb, lnb, anb, snb, url;
  let summaryNews;
  // 통합 검색 버튼
  let searchMenu;
  
  function setSwiper() {
    const photoNewsSwiperEl = document.querySelector('.photo_news_wrap');
    if (photoNewsSwiperEl) {
      photoNewsSwiper = new Swiper('.photo_news_wrap', {
        effect: 'fade',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      });
    }
    const modalSwiperEl = document.querySelector('.summary_news_list_wrap');
    if (modalSwiperEl) {
      modalSwiper = new Swiper('.summary_news_list_wrap', {
        effect: "coverflow",
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 300,
          rotate: 0,
          stretch: 50,
        },
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.summary_news_sec .btn.next',
          prevEl: '.summary_news_sec .btn.prev',
        },
      });
    }
    const specialEdtMenuEl = document.querySelector('.special_edt_menu');
    if (specialEdtMenuEl) {
      specialEdtMenu = new Swiper('.special_edt_menu', {
        slidesPerView: "auto",
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    const adSlideEl = document.querySelector('.ad_wrap.type_slide');
    if (adSlideEl) {
      adSlider1 = new Swiper('.ad_wrap.type_slide', {
        pagination: {
          el: '.ad_pagination',
          clickable: true
        },
      });
    }
    const viewRelatedNewsEl = document.querySelector('.news_relevant_frame');
    if (viewRelatedNewsEl) {
      viewRelatedNewsSwiper = new Swiper('.news_relevant_frame', {
        spaceBetween: 20,
        slidesPerView: 'auto',
      });
    }
  }
  
  function setInputFocus() {
    const inputs = document.querySelectorAll('input');
    if (inputs.length > 0) {
      inputs.forEach(function (item) {
        item.addEventListener('input', function (){
          const removeBtn = item.closest('.input_box').querySelector('.remove_val');
          if(removeBtn) {
            if (item.value.length > 0) {
              removeBtn.classList.add('is_active');
              removeBtn.addEventListener('click', function removeVal() {
                removeBtn.classList.remove('is_active');
                item.value = '';
                item.focus();
                removeBtn.removeEventListener('click', removeBtn)
              })
            } else {
              removeBtn.classList.remove('is_active')
            }
          }
        })
      })
    }
  }
  function totalMenuSwitch (self){
    let animeting = null;
    modalSwiper.autoplay.stop();
    if (header.classList.contains('open_anb')) {
      header.classList.remove('open_anb');
      anb.classList.remove('is_ani');
      anb.removeAttribute('tabindex')
      document.removeEventListener('click', anbOutside)
      clearTimeout(animeting)
    } else {
      anb.classList.add('is_ani');
      anb.setAttribute('tabindex', '0')
      anb.focus();
      header.classList.add('open_anb');
      animeting = setTimeout(function () {
        anb.classList.remove('is_ani');
      }, 400)
      header.classList.remove('open_search');
      document.addEventListener('click', e => anbOutside(e))
    }
    if (summaryNews.classList.contains('is_active')) {
      summaryNews.classList.remove('is_active');
    }
    function anbOutside(e) {
      const header = e.target.closest('#header')
      const viewHeader = e.target.closest('.view_fix_header')
      if(!header && !viewHeader) closeEvt()
    }
    const close = anb.querySelector('.anb_close')
    const closeEvt = function (){
      anb.removeAttribute('tabindex')
      header.classList.remove('open_anb');
      close.removeEventListener('click', closeEvt)
      self.focus();
    }
    close.addEventListener('click', closeEvt)
  }
  function totalSearchSwitch (self) {
    const searchInput = document.querySelector('.search_sec input');
    const dim = document.querySelector('.dim');
    const closeEvt = function (){
      header.classList.remove('open_search');
      self.focus();
      close.removeEventListener('click', closeEvt)
    }
    if (header.classList.contains('open_search')) {
      header.classList.remove('open_search');
      dim.removeEventListener('click', closeEvt)
    } else {
      header.classList.add('open_search');
      header.classList.remove('open_anb');
      searchInput.focus();
      modalSwiper.autoplay.stop();
      dim.addEventListener('click', closeEvt)
    }
    if (summaryNews.classList.contains('is_active')) {
      summaryNews.classList.remove('is_active');
    }
    const close = searchMenu.querySelector('.close_search');
  
    close.addEventListener('click', closeEvt)
  }
  let topNewsEls;
  function toggleTopNews(name) {
    if(!topNewsEls) topNewsEls = document.querySelectorAll('[data-top-news]')
    topNewsEls?.forEach(v => {
      console.log(v.dataset.topNews, name)
      if(v.dataset.topNews == name) v.classList.add('is_active')
      else v.classList.remove('is_active')
    })
  }
  function setTabUi(idx) {
    const tabWrap = document.querySelector('.tab_ui');
    if(!tabWrap) return
    let tabIdx;
    const tabList = tabWrap.querySelector('.tab_list')
    const tabScroll = tabWrap.querySelector('.has_scroll_x')
    const tabViewSize = tabWrap?.clientWidth
    const tabSize = tabList?.clientWidth
    const tabItems = tabList.querySelectorAll('.tab_item')
    const tabNav = tabWrap.querySelectorAll('.tab_btn_group .btn')
    let useNav = false;
  
    function moveTab(idx, load = false){
      let movePoint = tabItems[idx].offsetLeft;
      if(tabSize - tabViewSize - movePoint < 0) {
        movePoint = tabSize - tabViewSize
        if(useNav) tabNav[1].setAttribute('disabled', true)
      }
      if(load) {
        tabList.classList.add('setTab')
        setTimeout(()=>{
          tabList.classList.remove('setTab')
        }, 400)
      }
      tabList.style.transform = 'translate3d(-' + movePoint + 'px,0,0)'
    }
    function setTabActive(){
      tabItems.forEach((tab, i) => {
        if(tabIdx === i) {
          tab.classList.add('is_active')
          tab.setAttribute('aria-selected', true)
        }
        else {
          tab.classList.remove('is_active')
          tab.setAttribute('tabindex', '-1')
          tab.removeAttribute('aria-selected')
        }
      })
    }
    tabItems.forEach((tab, i) => {
      tab.addEventListener('click', function (){
        tabIdx = i
        if(useNav) tabIdx < 1 ? tabNav[0].setAttribute('disabled', true) : tabNav[0].removeAttribute('disabled')
        setTabActive()
        moveTab(tabIdx)
      })
    })
    tabIdx = idx ?? 0
    // 처음 탭 위치이동
    moveTab(tabIdx, true)
  
    if(tabViewSize - tabSize > 0) {
      tabNav.forEach(v => {
        v.setAttribute('disabled', true)
      })
      useNav = false
    } else  {
      useNav = true
      tabNav.forEach((v, i) => {
        if(tabIdx == 0 && i == 0) {
          v.setAttribute('disabled', true)
        } 
        v.addEventListener('click', function () {
          if(v.dataset.dir == 'prev') {
            tabIdx--;
            if(useNav) tabNav[1].removeAttribute('disabled');
            if(tabIdx <= 0) {
              tabIdx = 0;
              if(useNav) tabNav[0].setAttribute('disabled', true)
            }
          }
          else {
            tabIdx++;
            if(useNav) tabNav[0].removeAttribute('disabled');
            if(tabIdx >= tabItems.length - 1) {
              tabIdx = tabItems.length - 1
            }
          }
          moveTab(tabIdx)
        })
      })
    }
    setTabActive()
  }
  
  function setFlowTxt(el) {
    if(!el) el = '.flow_ui'
    const flowWrap = document.querySelector(el)
    if (!flowWrap) {
      return;
    }
    const flowEl = flowWrap.querySelector('.move_el')
    if (!flowEl) {
      return;
    }
    const flowSize = {
      wrap: flowWrap?.clientWidth,
      el: flowEl?.scrollWidth
    }
    flowEl.setAttribute('style', '--repeat: ' + flowSize.el );
    const copyCnt = flowEl.innerHTML
    let copyNum = 3
    function sizeChk(num = 3) {
      return flowSize.wrap * 2 - flowSize.el * num < 0 ? true : false
    }
    while (!sizeChk(copyNum)) {
      copyNum++
    }
    let html = '';
    for (let i = 0; i < copyNum; i++) {
      html += copyCnt
    }
    flowEl.innerHTML = html
    flowEl.classList.add('is_move')
  }
  
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.dataset.dark = true
    const themeCss = document.createElement('link')
    themeCss.setAttribute('rel', 'stylesheet')
    themeCss.setAttribute('href', '../../assets/css/theme.css')
    document.head.append(themeCss)
  }
  
  window.addEventListener('DOMContentLoaded', function () {
    wrapper = document.querySelector('.wrapper');
    header = document.querySelector('#header');
    gnb = document.querySelector('.gnb');
    lnb = document.querySelector('.lnb');
    anb = document.querySelector('.anb');
    snb = document.querySelector('.snb');
    if (!lnb) header.classList.add('no_lnb');
    if (snb) wrapper.classList.add('has_snb');
  
    searchMenu = document.querySelector('.search_sec') // 통합검색 UI 엘리먼트
    summaryNews = document.querySelector('.summary_news_sec'); // 요약뉴스 UI 엘리먼트
  
    setSwiper(); // 스와이퍼 실행
    setInputFocus() // input focus/blur
  
    // 탭이 있을 경우 UI 세팅
 
    setFlowTxt()
  
    // skip Navigation Evt
    function skipNavEvt(el) {
      const link = el.hash
      const id = link.replace('#', '')
      const linkPoint = document.getElementById(id)
      const linkEl = linkPoint.querySelector('a, button, [tabindex="0"]')
      if(linkEl) {
        linkEl.focus();
        return
      }
      linkPoint.setAttribute('tabindex', 0)
      linkPoint.focus();
      linkPoint.addEventListener('blur', function blurEvt(e) {
        linkPoint.removeAttribute('tabindex')
        linkPoint.removeEventListener('blur',blurEvt)
      })
    }
    // set skip Navigation Evt
    const skipNavs = document.querySelectorAll('.skipNav a')
    skipNavs.forEach((v) => {
      v.addEventListener('click', function (e){
        skipNavEvt(v)
      })
      v.addEventListener('keydown', function (e){
        if(e.keyCode === '13') skipNavEvt(v)
      })
    })
  
    // 헤더 언어변경 On / Off
    const langBtn = document.querySelector('#header .dropdown_toggle');
    const langMenu = document.querySelector('#header .dropdown_menu');
    let langMenuActive = false;
    if(langBtn) {
      langBtn.addEventListener('click', function () {
        langMenuActive = !langMenuActive;
        if (langMenuActive) {
          langBtn.classList.add('active');
          langMenu.classList.add('active');
        } else {
          langBtn.classList.remove('active');
          langMenu.classList.remove('active');
        }
      });
    }
  
  
  
    // footer 드랍메뉴
    const footerSiteBtn = document.querySelector('.site_map_area .dropdown_toggle');
    const footerSite = document.querySelector('.site_map_area .dropdown_menu');
    const footerSiteOpt = footerSite.querySelector('.dropdown_item');
    footerSiteBtn.addEventListener('click', function () {
      this.classList.toggle('active');
      footerSite.classList.toggle('active');
    });
    for (let i = 0; i < footerSiteOpt.length; i++) {
      footerSiteOpt[i].firstChild.addEventListener('click', function () {
        footerSite.classList.remove('active');
      })
    }
  
    const bookmarkBtn = document.querySelectorAll('.scrap');
    bookmarkBtn.forEach(function (item) {
      item.addEventListener('click', function () {
        if (this.classList.contains('is_active')) {
          this.classList.remove('is_active');
        } else {
          this.classList.add('is_active');
        }
      })
    });
  
    const emailJoinBtn = document.querySelector('.email_join_btn');
    const emailJoinPage = document.querySelector('.myinfo_page')
    if (emailJoinPage) {
      emailJoinBtn.addEventListener('click', function () {
        const join = this.parentElement.parentElement.parentElement;
        const mailJoinWrap = join.nextElementSibling;
        if (mailJoinWrap.classList.contains('is_active')) {
          mailJoinWrap.classList.remove('is_active')
        } else {
          mailJoinWrap.classList.add('is_active')
        }
      });
    }
  });
  
  
  
  (function ($) {
    $(function (){
      function defaultHeaderScroll() {
        const curr = $(window).scrollTop();
        const topGap = $('.stock_flow_wrap').outerHeight();
        if (curr > topGap) {
          $('#header').addClass('is_fix');
          $('.contents').addClass('is_fix');
        } else {
          $('#header').removeClass('is_fix')
          $('.contents').removeClass('is_fix')
        }
      }
      function hideDatepicker() {
        $('.datepicker_filter').datepicker('hide');
      }
  
      $(window).on('scroll', defaultHeaderScroll);
      // 인기뉴스 페이지 datepicker
      // $('.popular_news_sec .datepicker, .today_mk_sec .datepicker').datepicker({
      //   dateFormat: 'yy.mm.dd',
      //   onSelect: function (val) {
      //     var today = new Date();
      //     var year = today.getFullYear();
      //     var month = today.getMonth() + 1;
      //     var day = today.getDate();
      //     var date = year + '.' + (('0' + month.toString()).slice(-2)) + '.' + (('0' + day.toString()).slice(-2));
      //     var txtArea = $(this).siblings('label').find('.date');
      //     if (val === date) {
      //       txtArea.text('오늘' + '');
      //     } else {
      //       txtArea.text(val);
      //     }
      //   },
      //   beforeShow: function (input, inst) {
      //     var label = $(input).siblings('label');
      //     setTimeout(function () {
      //       inst.dpDiv.css({
      //         top: (label.offset().top + label.innerHeight) + 'px',
      //         left: label.offset().left + 'px',
      //         marginTop: -10 + 'px',
      //       });
      //     }, 10)
      //   }
      // });
      // $('label[for="popularNewsDate"]').on('click', function () {
      //   $('.popular_news_sec .datepicker, .today_mk_sec .datepicker').datepicker('show');
      // })
      //
      // $.datepicker.setDefaults({
      //   dateFormat: 'yymmdd',
      //   prevText: '이전 달',
      //   nextText: '다음 달',
      //   monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
      //   monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
      //   dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      //   dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      //   dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      //   showMonthAfterYear: true,
      //   yearSuffix: '년'
      // })
  
      $('.remove_keyword').on('click', function () {
        $(this).parent('.keyword_item').parent('.keyword_node').addClass('remove');
      })
      $('.all_remove').on('click', function () {
        $('.keyword_node').addClass('remove');
      });
      $('.summary_news_sec .close_summary').on('click', function () {
        $('.summary_news_sec').removeClass('is_active');
        removeHiddenScroll()
      });
      $('.summary_news_wrap .go_summary').on('click', function (e) {
        e.preventDefault()
        console.log('??')
        $('.summary_news_sec').addClass('is_active');
        $('.anb').removeClass('is_active');
        setHiddenScroll()
        modalSwiper.autoplay.start();
      });
      $('.keyword_close').on('click', function () {
        $('.auto_keyword_group').remove();
      });
    })
  })(jQuery)