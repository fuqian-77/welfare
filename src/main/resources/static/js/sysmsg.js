if (!window.ZENG) var ZENG = {};
ZENG.add = function(d, f) {
    var j;
    if ($.isFunction(f.init)) {
        j = f.init;
        delete f.init;
        $.extend(true, j.prototype, f);
        this[d] = j
    } else this[d] = f
};
ZENG.add("SysMsg", function() {
    function d(u, D, v) {
        D || (D = "success");
        v = v || D == "error";
        if (o) {
            h.push(function() {
                d(u, D)
            });
            f()
        } else {
            m.html(u);
            i.removeClass().addClass(D).show().animate({
                top: 0
            }, 200, function() {
                v || j()
            });
            o = 1
        }
    }
    function f() {
        i.animate({
            top: "-50px"
        }, 200, function() {
            i.hide();
            o = 0;
            h.length && h.shift()()
        })
    }
    function j() {
        setTimeout(function() {
            f()
        }, 2E3)
    }
    var o, h = [],
        i = $("#message-dock"),
        m = i.find("#message-text");
    $(".dismiss", "#message-dock").live("click", function(u) {
        f();
        u.preventDefault()
    });

    return {
        show: d
    }
}());
