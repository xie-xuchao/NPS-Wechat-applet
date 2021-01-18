var e = function() {
    return (e = Object.assign || function(e) {
        for (var t, i = 1, a = arguments.length; i < a; i++) {
            t = arguments[i];
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), i = require("./utils"), a = require("./shared"), n = require("../common/validator");

t.VantComponent({
    props: e(e({
        disabled: Boolean,
        multiple: Boolean,
        uploadText: String,
        useBeforeRead: Boolean,
        afterRead: null,
        beforeRead: null,
        previewSize: {
            type: null,
            value: 80
        },
        name: {
            type: [ Number, String ],
            value: ""
        },
        accept: {
            type: String,
            value: "image"
        },
        fileList: {
            type: Array,
            value: [],
            observer: "formatFileList"
        },
        maxSize: {
            type: Number,
            value: Number.MAX_VALUE
        },
        maxCount: {
            type: Number,
            value: 100
        },
        deletable: {
            type: Boolean,
            value: !0
        },
        showUpload: {
            type: Boolean,
            value: !0
        },
        previewImage: {
            type: Boolean,
            value: !0
        },
        previewFullImage: {
            type: Boolean,
            value: !0
        },
        imageFit: {
            type: String,
            value: "scaleToFill"
        },
        uploadIcon: {
            type: String,
            value: "photograph"
        }
    }, a.chooseImageProps), a.chooseVideoProps),
    data: {
        lists: [],
        isInCount: !0
    },
    methods: {
        formatFileList: function() {
            var t = this.data, a = t.fileList, r = void 0 === a ? [] : a, o = t.maxCount, l = r.map(function(t) {
                return e(e({}, t), {
                    isImage: i.isImageFile(t),
                    isVideo: i.isVideoFile(t),
                    deletable: !n.isBoolean(t.deletable) || t.deletable
                });
            });
            this.setData({
                lists: l,
                isInCount: l.length < o
            });
        },
        getDetail: function(e) {
            return {
                name: this.data.name,
                index: null == e ? this.data.fileList.length : e
            };
        },
        startUpload: function() {
            var t = this, a = this.data, n = a.maxCount, r = a.multiple, o = a.lists;
            a.disabled || i.chooseFile(e(e({}, this.data), {
                maxCount: n - o.length
            })).then(function(e) {
                t.onBeforeRead(r ? e : e[0]);
            }).catch(function(e) {
                t.$emit("error", e);
            });
        },
        onBeforeRead: function(t) {
            var i = this, a = this.data, r = a.beforeRead, o = a.useBeforeRead, l = !0;
            "function" == typeof r && (l = r(t, this.getDetail())), o && (l = new Promise(function(a, n) {
                i.$emit("before-read", e(e({
                    file: t
                }, i.getDetail()), {
                    callback: function(e) {
                        e ? a() : n();
                    }
                }));
            })), l && (n.isPromise(l) ? l.then(function(e) {
                return i.onAfterRead(e || t);
            }) : this.onAfterRead(t));
        },
        onAfterRead: function(t) {
            var i = this.data, a = i.maxSize, n = i.afterRead;
            (Array.isArray(t) ? t.some(function(e) {
                return e.size > a;
            }) : t.size > a) ? this.$emit("oversize", e({
                file: t
            }, this.getDetail())) : ("function" == typeof n && n(t, this.getDetail()), this.$emit("after-read", e({
                file: t
            }, this.getDetail())));
        },
        deleteItem: function(t) {
            var i = t.currentTarget.dataset.index;
            this.$emit("delete", e(e({}, this.getDetail(i)), {
                file: this.data.fileList[i]
            }));
        },
        onPreviewImage: function(e) {
            if (this.data.previewFullImage) {
                var t = e.currentTarget.dataset.index, a = this.data.lists, n = a[t];
                wx.previewImage({
                    urls: a.filter(function(e) {
                        return i.isImageFile(e);
                    }).map(function(e) {
                        return e.url;
                    }),
                    current: n.url,
                    fail: function() {
                        wx.showToast({
                            title: "预览图片失败",
                            icon: "none"
                        });
                    }
                });
            }
        },
        onPreviewVideo: function(t) {
            if (this.data.previewFullImage) {
                var a = t.currentTarget.dataset.index, n = this.data.lists;
                wx.previewMedia({
                    sources: n.filter(function(e) {
                        return i.isVideoFile(e);
                    }).map(function(t) {
                        return e(e({}, t), {
                            type: "video"
                        });
                    }),
                    current: a,
                    fail: function() {
                        wx.showToast({
                            title: "预览视频失败",
                            icon: "none"
                        });
                    }
                });
            }
        },
        onClickPreview: function(t) {
            var i = t.currentTarget.dataset.index, a = this.data.lists[i];
            this.$emit("click-preview", e(e({}, a), this.getDetail(i)));
        }
    }
});