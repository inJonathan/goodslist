/*
 *      author: Jonathan
 *        date: 2017-02-13
 * description: 购物车
 *      E-mail: jonrcao@gmail.com
 */

new Vue({
    el: '.goodscart',
    data: {
        goodscart: [],
        totalPrice: 0,
        edit: false,
        isCheckAll: true
    },
    created() {
        this.$http.get('data.json').then(response => {

            this.goodscart = response.body.goodscart;

            // 默认所有选项都选中
            this.goodscart.forEach((i) => {
                this.$set(i, 'checked', true);
            });

            this.$nextTick(() => {

            });

        });
    },
    methods: {
        editToggle() {
            this.edit = !this.edit;
        },
        changeCount(params) {
            if (params.way > 0) {
                params.item.count++;
            } else {
                params.item.count--;
                if (params.item.count <= 1) {
                    params.item.count = 1;
                }
            }
        },
        checkGood(params) { // 点击当前商品复选框，取反
            params.item.checked = !params.item.checked;

            for (let i = 0; i < this.goodscart.length; i++) {
                if (!this.goodscart[i].checked) { // 如果有一个没有选中，全选选项取消
                    this.isCheckAll = false;
                    break;
                }
                this.isCheckAll = true;
            }

        },
        checkAll() { // 点击全选
            this.isCheckAll = !this.isCheckAll;
            if (this.isCheckAll) {
                this.goodscart.forEach((i) => {
                    i.checked = true;
                })
            } else {
                this.goodscart.forEach((i) => {
                    i.checked = false;
                })
            }
        },
        goPay() {
            if (this.totalPrice > 0) {
                alert('请支付 ' + this.totalPrice + ' 元');
            } else {
                return
            }
        },
        toZero() {
            this.goodscart.forEach((i) => {
                if (i.count < 1) {
                    i.count = 1;
                }
            });
        }
    },
    computed: {
        totalPrice() { // 监听总价，相关项有变化立即更新
            let total = 0;
            let count = 0;
            this.goodscart.forEach((i) => {
                count = i.count;
                if (!i.checked) count = 0; // 如果没有被选中则不计入总价
                total += count * i.price;
            });
            return total;
        }
    }
});

