/*!
        Zoom v1.7.11 - 2013-11-12
        Enlarge images on click or mouseover.
        (c) 2013 Jack Moore - http://www.jacklmoore.com/zoom
        license: http://www.opensource.org/licenses/mit-license.php
*/
(function(o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    o.zoom = function(t, n, e, i) {
        var u, c, a, m, r, l, s, f = o(t).css("position");
        return o(t).css({
            position: /(absolute|fixed)/.test(f) ? f: "relative",
            overflow: "hidden"
        }), e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: e.width * i,
            height: e.height * i,
            border: "none",
            maxWidth: "none"
        }).appendTo(t), {
            init: function() {
                c = o(t).outerWidth(), u = o(t).outerHeight(), n === t ? (m = c, a = u) : (m = o(n).outerWidth(), a = o(n).outerHeight()), r = (e.width - c) / m, l = (e.height - u) / a, s = o(n).offset()
            }, move: function(o) {
                var t = o.pageX - s.left, n = o.pageY - s.top;
                n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, m), 0), e.style.left = t*-r + "px", e.style.top = n*-l + "px"
            }
        }
    }, o.fn.zoom = function(n) {
        return this.each(function() {
            var e, i = o.extend({}, t, n || {}), u = i.target || this, c = this, a = document.createElement("img"), m = o(a), r = "mousemove.zoom", l=!1, s=!1;
            (i.url || (e = o(c).find("img"), e[0] && (i.url = e.data("src") || e.attr("src")), i.url)) && (a.onload = function() {
                function t(t) {
                    e.init(), e.move(t), m.stop().fadeTo(o.support.opacity ? i.duration : 0, 1, o.isFunction(i.onZoomIn) ? i.onZoomIn.call(a) : !1)
                }
                function n() {
                    m.stop().fadeTo(i.duration, 0, o.isFunction(i.onZoomOut) ? i.onZoomOut.call(a) : !1)
                }
                var e = o.zoom(u, c, a, i.magnify);
                "grab" === i.on ? o(c).on("mousedown.zoom", function(i) {
                    1 === i.which && (o(document).one("mouseup.zoom", function() {
                        n(), o(document).off(r, e.move)
                    }), t(i), o(document).on(r, e.move), i.preventDefault())
                }) : "click" === i.on ? o(c).on("click.zoom", function(i) {
                    return l ? void 0 : (l=!0, t(i), o(document).on(r, e.move), o(document).one("click.zoom", function() {
                        n(), l=!1, o(document).off(r, e.move)
                    }), !1)
                }) : "toggle" === i.on ? o(c).on("click.zoom", function(o) {
                    l ? n() : t(o), l=!l
                }) : "mouseover" === i.on && (e.init(), o(c).on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(r, e.move)), i.touch && o(c).on("touchstart.zoom", function(o) {
                    o.preventDefault(), s ? (s=!1, n()) : (s=!0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(o) {
                    o.preventDefault(), e.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }), o.isFunction(i.callback) && i.callback.call(a)
            }, a.src = i.url, o(c).one("zoom.destroy", function() {
                o(c).off(".zoom"), m.remove()
            }))
        })
    }, o.fn.zoom.defaults = t
})(window.jQuery);

$(document).ready(function(){
  if ($(window).width() > 767) {
    $('.zoom').zoom(); 
  }
});