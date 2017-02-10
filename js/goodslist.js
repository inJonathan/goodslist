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
    },
    methods: {

    }
});

var rigthType = document.getElementsByClassName('right-type');
var move = 0;
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
            move = swiper.translate;
        },
        onTransitionEnd: function (swiper) {
            move = swiper.translate;

        }, onTouchMove: function (swiper) {

            for (var i = 0; i < rigthType.length; i++) {

                if ((-swiper.translate) > rigthType[i].offsetTop && (-swiper.translate) < rigthType[i].offsetTop + rigthType[i].offsetHeight + 20) {
                    vmLeft.curIndex = i; // 改变左侧
                }
                

            }
        }
    }
}

