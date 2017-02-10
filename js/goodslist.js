// 左侧列表
var vmLeft = new Vue({
    el: '.left',
    data: {
        goods: [],
        curIndex: 0
    },
    created() {
        this.$http.get('data.json').then(response => {

            this.goods = response.body.goods;

            this.$nextTick(() => {
                var left = new Swiper('.left', swiperConfig.left);
            });

        });
    },
    methods: {
        selectType(index) {
            this.curIndex = index;
            this.$nextTick(() => {
                var goto = vmRight.$refs.rightType[index].offsetTop;
                var rightBot = vmRight.$refs.rightSlide.clientHeight - vmRight.$refs.right.clientHeight;
                if (goto > rightBot) {
                    goto = rightBot;
                }
                vmRight.$refs.wrapper.style.transitionDuration = "300ms";
                vmRight.$refs.wrapper.style.transform = "translate3d(0px, -" + goto + "px, 0px)";
            });
        }
    }
});

// 右侧列表
var vmRight = new Vue({
    el: '.right',
    data: {
        goods: []
    },
    created() {
        this.$http.get('data.json').then(response => {

            this.goods = response.body.goods;

            this.$nextTick(() => {
                var right = new Swiper('.right', swiperConfig.right);
            });

        });
    }
});

var rigthType = document.getElementsByClassName('right-type');
var swiperConfig = {
    left: {
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    },
    right: {
        scrollbar: '.right .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        onTouchEnd: function (swiper) {
            changeLeft(swiper);
        },
        onTransitionEnd: function (swiper) {
            changeLeft(swiper);
        }
    }
}

function changeLeft(swiper) {
    for (var i = 0; i < rigthType.length; i++) {
        if ((-swiper.translate) > rigthType[i].offsetTop - 50 && (-swiper.translate) < rigthType[i].offsetTop - 50 + rigthType[i].offsetHeight + 20) {
            vmLeft.curIndex = i; // 改变左侧
        }
    }
}
