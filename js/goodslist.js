/*
 *      author: Jonathan
 *        date: 2017-02-11
 * description: 双向联动列表
 *      E-mail: jonrcao@gmail.com
 */

// 左侧列表
var vmLeft = new Vue({
    el: '.left',
    data: {
        goods: [],
        curIndex: 0
    },
    created() {
        this.axios.get('data.json').then(response => {
            this.goods = response.data.goods;
            this.$nextTick(() => {
                var left = new Swiper('.left', swiperConfig.left);
            });
        });
    },
    methods: {
        selectType(index) {
            selFlag = false;
            this.curIndex = index;
            this.$nextTick(() => {
                var selectLeft = vmRight.$refs.rightType[index].offsetTop;
                var rightBot = vmRight.$refs.rightSlide.clientHeight - vmRight.$refs.right.clientHeight;
                if(selectLeft > rightBot) {
                    selectLeft = rightBot;
                }
                vmRight.$refs.rightWrapper.style.transitionDuration = "300ms";
                vmRight.$refs.rightWrapper.style.transform = "translate3d(0px, -" + selectLeft + "px, 0px)";

                setTimeout(function() {
                    selFlag = true;
                }, 800);
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
        this.axios.get('data.json').then(response => {

            this.goods = response.data.goods;

            this.$nextTick(() => {
                var right = new Swiper('.right', swiperConfig.right);
            });
        });
    }
});

var selFlag = true; // 在滑动时点击左侧以左侧选择为准
var rightInterval = 50; // 右侧感应间隔
var rigthType = document.getElementsByClassName('right-type');

// Swiper配置
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
        onTouchEnd: function(swiper) {
            setTimeout(function() {
                changeLeft(swiper);
            }, 300);
        },
        onTransitionEnd: function(swiper) {
            changeLeft(swiper);
        }
    }
}

function changeLeft(swiper) {
    var left = vmLeft.$refs.left; // 左侧
    var leftItem = vmLeft.$refs.leftItem; // 左侧元素
    var leftSlide = vmLeft.$refs.leftSlide; // 左侧列表
    var leftWrapper = vmLeft.$refs.leftWrapper;
    var transf = leftWrapper.style.transform;
    var scrollHeight = -parseInt(transf.split(',')[1]); // 获得滚动出去的距离
    if(isNaN(scrollHeight)) {
        scrollHeight = 0;
    }

    if(selFlag) {
        for(var i = 0; i < rigthType.length; i++) {
            if((-swiper.translate) > rigthType[i].offsetTop - rightInterval && (-swiper.translate) < rigthType[i].offsetTop - rightInterval + rigthType[i].offsetHeight) {
                vmLeft.curIndex = i; // 改变左侧
                var leftHeight = left.offsetHeight;
                var leftItemHeight = leftItem[vmLeft.curIndex].offsetTop;
                var leftSlideHeight = leftSlide.clientHeight;
                var LeftBot = leftSlideHeight - leftHeight;

                var moveDown = leftItemHeight - leftHeight + leftItem[vmLeft.curIndex].clientHeight;

                if(leftItemHeight > scrollHeight + leftHeight) {
                    leftWrapper.style.transitionDuration = "300ms";
                    leftWrapper.style.transform = "translate3d(0px, -" + moveDown + "px, 0px)";
                }

                if(leftItemHeight < scrollHeight) {
                    leftWrapper.style.transitionDuration = "300ms";
                    leftWrapper.style.transform = "translate3d(0px, -" + leftItemHeight + "px, 0px)";
                }
            }
        }
    }
}