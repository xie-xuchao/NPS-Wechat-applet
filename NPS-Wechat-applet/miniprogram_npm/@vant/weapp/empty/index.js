Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [ "error", "search", "default", "network" ];

require("../common/component").VantComponent({
    props: {
        description: String,
        image: {
            type: String,
            value: "default"
        }
    },
    created: function() {
        -1 !== e.indexOf(this.data.image) ? this.setData({
            imageUrl: "https://img.yzcdn.cn/vant/empty-image-" + this.data.image + ".png"
        }) : this.setData({
            imageUrl: this.data.image
        });
    }
});