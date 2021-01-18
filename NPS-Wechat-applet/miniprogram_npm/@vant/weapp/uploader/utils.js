function e(e) {
    return e.tempFiles.map(function(e) {
        return u(u({}, o.pickExclude(e, [ "path" ])), {
            type: "image",
            url: e.path,
            thumb: e.path
        });
    });
}

function t(e) {
    return [ u(u({}, o.pickExclude(e, [ "tempFilePath", "thumbTempFilePath", "errMsg" ])), {
        type: "video",
        url: e.tempFilePath,
        thumb: e.thumbTempFilePath
    }) ];
}

function i(e) {
    return e.tempFiles.map(function(t) {
        return u(u({}, o.pickExclude(t, [ "fileType", "thumbTempFilePath", "tempFilePath" ])), {
            type: e.type,
            url: t.tempFilePath,
            thumb: "video" === e.type ? t.thumbTempFilePath : t.tempFilePath
        });
    });
}

function r(e) {
    return e.tempFiles.map(function(e) {
        return u(u({}, o.pickExclude(e, [ "path" ])), {
            url: e.path
        });
    });
}

var u = function() {
    return (u = Object.assign || function(e) {
        for (var t, i = 1, r = arguments.length; i < r; i++) {
            t = arguments[i];
            for (var u in t) Object.prototype.hasOwnProperty.call(t, u) && (e[u] = t[u]);
        }
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.chooseFile = exports.isVideoFile = exports.isImageFile = void 0;

var o = require("../common/utils"), a = require("../common/validator");

exports.isImageFile = function(e) {
    return null != e.isImage ? e.isImage : e.type ? "image" === e.type : !!e.url && a.isImageUrl(e.url);
}, exports.isVideoFile = function(e) {
    return null != e.isVideo ? e.isVideo : e.type ? "video" === e.type : !!e.url && a.isVideoUrl(e.url);
}, exports.chooseFile = function(u) {
    var o = u.accept, a = u.multiple, n = u.capture, c = u.compressed, s = u.maxDuration, p = u.sizeType, l = u.camera, m = u.maxCount;
    return new Promise(function(u, h) {
        switch (o) {
          case "image":
            wx.chooseImage({
                count: a ? Math.min(m, 9) : 1,
                sourceType: n,
                sizeType: p,
                success: function(t) {
                    return u(e(t));
                },
                fail: h
            });
            break;

          case "media":
            wx.chooseMedia({
                count: a ? Math.min(m, 9) : 1,
                sourceType: n,
                maxDuration: s,
                sizeType: p,
                camera: l,
                success: function(e) {
                    return u(i(e));
                },
                fail: h
            });
            break;

          case "video":
            wx.chooseVideo({
                sourceType: n,
                compressed: c,
                maxDuration: s,
                camera: l,
                success: function(e) {
                    return u(t(e));
                },
                fail: h
            });
            break;

          default:
            wx.chooseMessageFile({
                count: a ? m : 1,
                type: o,
                success: function(e) {
                    return u(r(e));
                },
                fail: h
            });
        }
    });
};