/*
 *      author: Jonathan
 *        date: 2017-02-14
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

        this.axios.get('data.json').then(response => {

            this.goodscart = response.data.goodscart;

            // 默认所有选项都选中
            this.goodscart.forEach((i) => {
                this.$set(i, 'checked', true);
            });

        });

    },
    methods: {
        editToggle() {
            this.edit = !this.edit;
        },
        changeCount(item, way) {
            if (way > 0) {
                item.count++;
            } else {
                item.count--;
                if (item.count <= 1) {
                    item.count = 1;
                }
            }
        },
        checkGood(item) { // 点击当前商品复选框，取反
            item.checked = !item.checked;

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
        toZero() {
            this.goodscart.forEach((i) => {
                if (i.count < 1) {
                    i.count = 1;
                }
            });
        },
        delItem(item) {
            let _this = this;
            mui.confirm('确认删除 ' + item.name + ' x' + item.count + '？', '提示', ['否', '是'], function (e) {
                if (e.index === 1) {
                    let index = _this.goodscart.indexOf(item);
                    _this.goodscart.splice(index, 1);
                } else {
                    return
                }
            })
        },
        goPay() {
            let postArr = [];
            if (this.totalPrice > 0) {
                this.goodscart.forEach((i) => {
                    if (i.checked) {
                        postArr.push(i);
                    }
                });
                alert('总价：' + this.totalPrice + '元\n提交信息：' + JSON.stringify(postArr));
            } else {
                return
            }
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
