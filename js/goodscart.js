/*
 *      author: Jonathan
 *        date: 2017-02-13
 * description: 购物车
 *      E-mail: jonrcao@gmail.com
 */

var goodscart = new Vue({
    el: '.goodscart',
    data: {
        goodscart: [],
        edit: false
    },
    created() {
        this.$http.get('data.json').then(response => {

            this.goodscart = response.body.goodscart;

            this.$nextTick(() => {
                
            });

        });
    },
    methods: {
        editToggle() {
            this.edit = !this.edit;
        }
    }
});
