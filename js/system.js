/* Version v8
 ** QQ:2528119536 
 ** Up:2018.03.08*/
var zanpian = {
  //系统公共
  'cms': {
    //选项卡切换
    'tab': function () {
      $("#myTab li a").click(function (e) {
        $(this).tab('show');
        //$($(this).attr('href')).find('a').lazyload({effect: "fadeIn"});
      });
      $(".js-tab-toggle").click(function () {
        if (!$(this).hasClass("active")) {
          $(this).addClass('active');
          $(".js-tab-toggle").not($(this)).removeClass("active");
          $(".js-tab-content").children().eq($(this).parent().index()).show().siblings().hide();
          $(".loading").lazyload();
        }
      });
    },
    //内容详情折叠
    'collapse': function () {
      var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
      if (w > 640) {
        $(".list_type").addClass("in");
      }

    },
    'scrolltop': function () {
      var a = $(window);
      $scrollTopLink = $("a.backtop");
      a.scroll(function () {
        500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none")
      });
      $scrollTopLink.on("click", function () {
        $("html, body").animate({
          scrollTop: 0
        }, 400);
        return !1
      })
    },
    //公共
    'all': function (url) {
      $('body').on("click", "#login,#user_login,#navbar_user_login", function (event) {
        $('.zanpian-modal').modal('hide');
        if (!zanpian.user.islogin()) {
          event.preventDefault();
          zanpian.user.loginform();
          return false;
        }
      });
      $('.navbar-search').click(function () {
        $('.user-search').toggle();
        $('#nav-signed,#example-navbar-collapse').hide();
      })
      $('.navbar-navmore').click(function () {
        $('.user-search').toggle();
        $('#nav-signed,.user-search').hide();
      })
      //显示更多
      $('body').on("click", ".more-click", function () {
        var self = $(this);
        var box = $(this).attr('data-box');
        var allNum = $(this).attr('data-count');
        var buNum = allNum - $(this).attr('data-limit');
        var sta = $(this).attr('data-sta');
        var hideItem = $('.' + box).find('li[rel="h"]');
        if (sta == undefined || sta == 0) {
          hideItem.show(200);
          $(this).find('span').text('收起部分' + buNum);
          self.attr('data-sta', 1);
        } else {
          hideItem.hide(200);
          $(this).find('span').text('查看全部' + allNum);
          self.attr('data-sta', 0);
        }

      });
      //播放窗口隐藏右侧板块
      $('body').on("click", "#player-shrink", function () {
        $(".player_right").toggle();
        $(".player_left").toggleClass("max");
        $(".player-shrink").toggleClass("icon-left");
      });
      if ($('.player_playlist').length > 0) {
        zanpian.player.playerlist();
      }
      $('body').on("click", "#lyric", function (event) {
        $("#" + $(this).data('id')).toggle();
      });
      $(window).resize(function () {
        zanpian.player.playerlist();
      });
      $(".player-tool em").click(function () {
        $html = $(this).html();
        try {
          if ($html == '关灯') {
            $(this).html('开灯')
          } else {
            $(this).html('关灯')
          }
        } catch (e) {}
        $(".player-open").toggle(300);
        $(".player_left").toggleClass("player-top")
        $(".player_right").toggleClass("player-top")
      });
      $('body').on("focus", "#id_input", function () {
        //$("#role_list").hide();						   
      })
      $('body').on("click", "#get_role", function () {
        $("#role_list").show();
      });
      $('body').on("click", "#user_detail_add", function (event) {
        if (!zanpian.user.islogin()) {
          zanpian.user.loginform();
          return false;
        }
        var url = $(this).data('url');
        zanpian.cms.modal(url);
      });

    }
  },
  'detail': {
    'collapse': function () { //内容详情折叠
      $('body').on("click", "[data-toggle=collapse]", function () {
        $this = $(this);
        $($this.attr('data-target')).toggle();
        $($this.attr('data-default')).toggle();
        if ($this.attr('data-html')) {
          $data_html = $this.html();
          $this.html($this.attr('data-html'));
          $this.attr('data-html', $data_html);
        }
        if ($this.attr('data-val')) {
          $data_val = $this.val();
          $this.val($this.attr('data-val'));
          $this.attr('data-val', $data_val);
        }
      });
    },
    //播放列表折叠
    'playlist': function () {
      //更多播放地址切换
      $(".player-more .dropdown-menu li").click(function () {
        $("#playTab").find('li').removeClass('active');
        var activeTab = $(this).html();
        var prevTab = $('.player-more').prev('li').html();
        $('.player-more').prev('li').addClass('active').html(activeTab);
        //var prevTab = $('#playTab li:nth-child(2)').html(); 
        //$('#playTab li:nth-child(2)').addClass('active').html(activeTab);		   
        $(this).html(prevTab);
      });
      if ($('.player-more').length > 0) {
        $(".dropdown-menu li.active").each(function () {
          var activeTab = $(this).html();
          var prevTab = $('.player-more').prev('li').html();
          $('.player-more').prev('li').addClass('active').html(activeTab);
          $(this).html(prevTab).removeClass('active');
        });
      }
      //手机端播放源切换
      $(".mplayer .dropdown-menu li").click(function () {
        var sclass = $(this).find('a').attr('class');
        var stext = $(this).text();
        $("#myTabDrop2 .name").text(stext);
        $("#myTabDrop2").removeClass($("#myTabDrop2").attr('class'));
        $("#myTabDrop2").addClass(sclass);
      });
      var WidthScreen = true;
      for (var i = 0; i < $(".playlist ul").length; i++) {
        series($(".playlist ul").eq(i), 20, 1);
      }

      function series(div, n1, n2) { //更多剧集方法
        var len = div.find("li").length;
        var n = WidthScreen ? n1 : n2;
        if (len > 24) {
          for (var i = n2 + 18; i < len - ((n1 / 2) - 2) / 2; i++) {
            div.find("li").eq(i).addClass("hided");
          }
          var t_m = "<li class='more open'><a target='_self' href='javascript:void(0)'>更多剧集</a></li>";
          div.find("li").eq(n2 + 17).after(t_m);
          var more = div.find(".more");
          var _open = false;
          div.css("height", "auto");
          more.click(function () {
            if (_open) {
              div.find(".hided").hide();
              $(this).html("<a target='_self' href='javascript:void(0)'>更多剧集</a>");
              $(this).removeClass("closed");
              $(this).addClass("open");
              $(this).insertAfter(div.find("li").eq(n2 + 17));
              _open = false;
            } else {
              div.find(".hided").show();
              $(this).html("<a target='_self' href='javascript:void(0)'>收起剧集</a>");
              $(this).removeClass("open");
              $(this).addClass("closed");
              $(this).insertAfter(div.find("li:last"));
              _open = true;
            }
          })
        }
      }
    },
  },
  'player': {
    //播放页面播放列表
    'playerlist': function () {
      var height = $(".player_left").height();
      if ($('.player_prompt').length > 0) {
        var height = height - 50;
      }
      $(".player_playlist").height(height - 55);
      var mheight = $(".mobile_player_left").height();
      if ($(".player_playlist").height() > mheight) {
        $(".player_playlist").height(mheight - 55);
      }
    },
  },

  //图片处理
  'image': {
    //幻灯与滑块
    'swiper': function () {
      var swiper = new Swiper('.box-slide', {
        pagination: '.swiper-pagination',
        lazyLoading: true,
        preventClicks: true,
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });
      var swiper = new Swiper('.details-slide', {
        pagination: '.swiper-pagination',
        autoHeight: true,
        loop: true,
        nextButton: '.details-slide-next',
        prevButton: '.details-slide-pre',
        paginationType: 'fraction',
        keyboardControl: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        lazyLoadingInPrevNextAmount: 1,
        lazyLoadingOnTransitionStart: true,
      });
      var swiper = new Swiper('.news-switch-3', {
        lazyLoading: true,
        slidesPerView: 3,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      });
      var swiper = new Swiper('.news-switch-4', {
        lazyLoading: true,
        slidesPerView: 4,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 0
          }
        }
      });
      var swiper = new Swiper('.news-switch-5', {
        lazyLoading: true,
        slidesPerView: 5,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 0
          }
        }
      });
      var swiper = new Swiper('.vod-swiper-4', {
        lazyLoading: true,
        slidesPerView: 4,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 0
          }
        }
      });
      var swiper = new Swiper('.vod-swiper-5', {
        lazyLoading: true,
        slidesPerView: 5,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          767: {
            slidesPerView: 3,
            spaceBetween: 0
          }
        }
      });
      var swiper = new Swiper('.vod-swiper-6', {
        lazyLoading: true,
        slidesPerView: 6,
        spaceBetween: 0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          1200: {
            slidesPerView: 5,
            spaceBetween: 0
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0
          }
        }
      });
    },
    //延迟加载
    'lazyload': function () {
      $(".loading").lazyload({
        effect: "fadeIn",
        failurelimit: 15
      });
    },
    //生成二维码
    'qrcode': function () {
      jQuery('#qrcode').qrcode({
        text: location.href, //设置二维码内容，必须  
        render: "canvas", //设置渲染方式 （有两种方式 table和canvas，默认是canvas）   
        width: 100,
        height: 100,
        typeNumber: -1, //计算模式    
        correctLevel: 0, //纠错等级    
        background: "#ffffff", //背景颜色    
        foreground: "#000000" //前景颜色   
      });
      jQuery('.hover-qrcode-wrapper').qrcode({
        text: location.href, //设置二维码内容，必须  
        render: "canvas", //设置渲染方式 （有两种方式 table和canvas，默认是canvas）   
        typeNumber: -1, //计算模式    
        correctLevel: 0, //纠错等级    
        background: "#ffffff", //背景颜色    
        foreground: "#000000" //前景颜色   
      });
    },
  },
};
MAC.Star.Init = function () {
  var $that = $('.mac_star');
  if ($that.length == 0) {
    return;
  }
  MAC.Ajax(maccms.path + '/index.php/ajax/score?mid=' + $that.attr('data-mid') + '&id=' + $that.attr('data-id'), 'get', 'json', '', function (e) {
    $that.attr({
      'score': e.data.score,
      'data-star': Math.ceil(e.data.score / 2)
    });
    $(".raty-score-num").text(e.data.score);
    $(".raty-score-bar").animate({
      'width': e.data.score * 10 + '%'
    }, 300);
    $that.raty({
      starType: 'li',
      number: 5,
      numberMax: 5,
      space: false,
      score: function () {
        $(".raty-score-num").text($that.attr('score'));
        $(".raty-score-bar").animate({
          'width': $that.attr('score') * 10 + '%'
        }, 300);
        return $that.attr('data-star');
      },
      hints: ['很差', '较差', '还行', '推荐', '力荐'],
      starOff: 'star',
      starOn: 'star active',
      target: $("#ratewords"),
      targetKeep: e.data.score_num > 0 ? true : false,
      click: function (score, evt) {
        MAC.Ajax(maccms.path + '/index.php/ajax/score?mid=' + $that.attr('data-mid') + '&id=' + $that.attr('data-id') + '&score=' + (score * 2), 'get', 'json', '', function (r) {
          if (r.code == 1) {
            $that.attr({
              'score': r.data.score,
              'data-star': Math.ceil(r.data.score / 2)
            });
            $(".raty-score-num").text(r.data.score);
            $(".raty-score-bar").animate({
              'width': r.data.score * 10 + '%'
            }, 300);
            $that.raty('set', {
              'score': Math.ceil(r.data.score / 2),
              'targetKeep': r.data.score_num > 0 ? true : false,
            });
            MAC.Pop.Msg(100, 20, '评分成功', 1000);
          } else {
            $that.raty('score', $that.attr('data-star'));
            MAC.Pop.Msg(100, 20, r.msg, 1000);
          }
        }, function () {
          $that.raty('score', $that.attr('data-star'));
          MAC.Pop.Msg(100, 20, '网络异常', 1000);
        });
      }
    });

  });
}
MAC.Digg = {
  'Init': function () {
    $('body').on('click', '.digg_link', function (e) {
      var $that = $(this);
      if ($that.attr("data-id")) {
        MAC.Ajax(maccms.path + '/index.php/ajax/digg.html?mid=' + $that.attr("data-mid") + '&id=' + $that.attr("data-id") + '&type=' + $that.attr("data-type"), 'get', 'json', '', function (r) {
          $that.addClass('disabled');
          if (r.code == 1) {
            if ($that.attr("data-type") == 'up') {
              $that.find('.digg_num').html(r.data.up);
            } else {
              $that.find('.digg_num').html(r.data.down);
            }
          } else {
            MAC.Pop.Msg(150, 20, r.msg, 1000);
          }
        });
      }
    });
  }
}
MAC.History = {
  'BoxShow': 0,
  'Limit': 10,
  'Days': 7,
  'Json': '',
  'Init': function () {
    if ($('.mac_history').length == 0) {
      return;
    }
    $('.user_playlog').hover(function () {
      $(this).children('.playlog_list').stop(true, true).show();
    }, function () {
      $(this).children('.playlog_list').stop(true, true).hide();
    });
    $('body').on("click", ".playlog-close", function () {
      $('.playlog_list').stop(true, true).hide();
    });
    var jsondata = [];
    if (this.Json) {
      jsondata = this.Json;
    } else {
      var jsonstr = MAC.Cookie.Get('mac_history_full');
      if (jsonstr != undefined) {
        jsondata = eval(jsonstr);
      }
    }
    if (jsondata.length > 0) {
      html = '';
      for ($i = 0; $i < jsondata.length; $i++) {
        html += '<li><h5><a href="' + jsondata[$i].link + '">' + jsondata[$i].name + '</a><em>/</em><a target="_blank" href="' + jsondata[$i].playlink + '">' + jsondata[$i].playname + '</a></h5><a href="javascript:;" class="playlog-del">继续播放&nbsp;<i class="icon iconfont">&#xe719;</i></a></li>';
      }
    } else {
      html = '<strong>暂无观看历史记录列表</strong>';
    }
    $(".mac_history_box").html(html);
    if ($(".mac_history_set").attr('data-name')) {
      var $that = $(".mac_history_set");
      MAC.History.Set($that.attr('data-id'), $that.attr('data-name'), $that.attr('data-link'), $that.attr('data-playname'), $that.attr('data-playlink'), $that.attr('data-pic'), $that.attr('data-time'));
    }
  },
  'Set': function (id, name, link, playname, playlink, pic, time) {
    if (!playlink) {
      playlink = document.URL;
    }
    if (!time) {
      time = new Date();
    }
    var jsondata = MAC.Cookie.Get('mac_history_full');

    if (jsondata != undefined) {
      this.Json = eval(jsondata);

      jsonstr = '{log:[{"id":"' + id + '","name":"' + name + '","link":"' + link + '","playname":"' + playname + '","playlink":"' + playlink + '","pic":"' + pic + '","time":"' + time + '"},';
      for ($i = 0; $i < this.Json.length; $i++) {
        if ($i <= this.Limit && this.Json[$i]) {
          if (this.Json[$i].id == id) {
            continue;
          } else {
            jsonstr += '{"id":"' + this.Json[$i].id + '","name":"' + this.Json[$i].name + '","link":"' + this.Json[$i].link + '","playname":"' + this.Json[$i].playname + '","playlink":"' + this.Json[$i].playlink + '","pic":"' + this.Json[$i].pic + '","time":"' + this.Json[$i].time + '"},';
          }
        } else {
          break;
        }
      }
      jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
      jsonstr += "]}";
    } else {
      jsonstr = '{log:[{"id":"' + id + '","name":"' + name + '","link":"' + link + '","playname":"' + playname + '","playlink":"' + playlink + '","pic":"' + pic + '","time":"' + time + '"}]}';
    }
    this.Json = eval(jsonstr);
    MAC.Cookie.Set('mac_history_full', jsonstr, this.Days);
  },
  'Clear': function () {
    MAC.Cookie.Del('mac_history_full');
    $('.mac_history_box').html('<strong>暂无观看历史记录列表</strong>');
  },
}
$(document).ready(function () {
  zanpian.image.swiper(); //幻灯片					   
  zanpian.cms.all(); //主要加载
  zanpian.cms.tab(); //切换
  zanpian.cms.collapse();
  zanpian.cms.scrolltop();
  zanpian.image.lazyload(); //图片延迟加载
  zanpian.image.qrcode(); //二维码
  zanpian.detail.collapse();
  zanpian.detail.playlist(); //更多剧集
});
