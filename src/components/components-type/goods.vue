<template>
    <div class="container-fluid par">
        <div class="row pad">


            <div v-if="selfData.layout.card" v-for="(item,n) in selfData.content" class="col-md-12">
                <div class="pro_box">
                    <img :src="item.img" class="dood_img" alt="">
                    <div class="text_box">
                        <div class="good_title" v-if="selfData.titleShow">{{item.title}}</div>
                        <div class="goods_price" v-if="selfData.priceShow">{{item.price}}
                            <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i>
                        </div>
                    </div>
                </div>
            </div>


            <div v-if="selfData.layout.four" class="col-md-6 pro_6_box" v-for="(item,n) in selfData.content">
                <div class="pro_6">
                    <img :src="item.img" alt="">
                    <div class="text_goods">
                        <div class="good_title" v-if="selfData.titleShow">{{item.title}}</div>
                        <div class="goods_price" v-if="selfData.priceShow">${{item.price}}
                            <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i></div>
                    </div>
                </div>
            </div>



            <div v-if="selfData.layout.bigImg" class="col-md-12" v-for="(item,n) in selfData.content">
                <div class="pro_big">
                    <img :src="item.img" alt="">
                    <div class="good_title" v-if="selfData.titleShow">{{item.title}}</div>
                    <div class="goods_price" v-if="selfData.priceShow">${{item.price}}
                        <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i></div>
                </div>
            </div>



            <div v-if="selfData.layout.hybrid" class="col-md-12">
                <div class="hy1">
                    <img :src="selfData.content[0].img" alt="">
                    <div class="hy1_text">
                        <div class="good_title" v-if="selfData.titleShow">{{selfData.content[0].title}}</div>
                        <div class="goods_price" v-if="selfData.priceShow">${{selfData.content[0].price}}
                            <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i></div>
                    </div>
                </div>
            </div>
            <div v-if="selfData.layout.hybrid" class="col-md-6">
                <div class="hy1_1">
                    <img :src="selfData.content[1].img" alt="">
                    <div class="hy1_text">
                        <div class="good_title" v-if="selfData.titleShow">{{selfData.content[1].title}}</div>
                        <div class="goods_price" v-if="selfData.priceShow">${{selfData.content[1].price}}
                            <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i></div>
                    </div>
                </div>
            </div>
            <div v-if="selfData.layout.hybrid" class="col-md-6">
                <div class="hy1_2">
                    <img :src="selfData.content[2].img" alt="">
                    <div class="hy1_text">
                        <div class="good_title" v-if="selfData.titleShow">{{selfData.content[2].title}}</div>
                        <div class="goods_price" v-if="selfData.priceShow">${{selfData.content[2].price}}
                            <i v-if="selfData.cartShow" class="fa fa-cart-plus cart"></i></div>
                    </div>
                </div>
            </div>



        </div>
        <div class="son">
            <div class="box">
                <div class="panel-wrap">
                    <div class="panel-bar">
                        <div class="panel-body">





                            <div class="panel-style">

                                <div>
                                    添加商品:
                                    <div class="add_goods" @click="add_pro">
                                        <i class="fa fa-plus"></i>
                                    </div>
                                </div>
                                <label>
                                    显示标题

                                    <input type="checkbox" v-model="selfData.titleShow">
                                </label>
                            </div>
                            <div>
                                <label>
                                    显示价格

                                    <input type="checkbox" v-model="selfData.priceShow">
                                </label>
                            </div>
                            <div>
                                <label>
                                    显示购物车
                                    <input type="checkbox" v-model="selfData.cartShow">
                                </label>
                            </div>


                            <div class="btns">
                                <el-button @click="layoutbtn('four')" size="mini" type="primary">四格布局</el-button>
                                <el-button @click="layoutbtn('card')" size="mini" type="primary">卡片式布局</el-button>
                                <el-button @click="layoutbtn('hybrid')" size="mini" type="primary">一大两小布局</el-button>
                                <el-button @click="layoutbtn('bigImg')" size="mini" type="primary">大图布局</el-button>
                            </div>
                            <div class="action">
                                <el-button @click="reset_data" size="mini" type="danger">重置数据</el-button>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>


        <el-dialog
                title="选择商品"
                :visible.sync="dialogVisible"
                width="50%">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12" v-for="item in goods">
                        <el-checkbox v-model="item.check" :label="item.title" :key="item.id">{{item.title}}
                        </el-checkbox>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ok_addpro">确 定</el-button>
  </span>
        </el-dialog>


    </div>
</template>


<script>
    import $ from 'jquery'

    export default {
        props: {
            data: Object,
            index: Number
        },
        data() {
            return {
                checkedCities1: [],
                goods: [],
                checked: false,
                //选择框的布尔值
                dialogVisible: false,
                //是否关闭弹出框


                //页面的所有数据
                selfData: this.data,


                style: {
                    key: 1,
                    val: 'col-sm-12'
                },
                content: [],


                backup: {
                    style: {
                        layout: 1,
                    },
                    layout: {
                        card: false,
                        four: true,
                    },
                    content: [],
                    priceShow: false,
                    titleShow: false,
                }
            }
        },


        //计算属性
        computed: {
            productStyle() {
                let style = this.selfData.style,
                    layout = style.layout;
                if (layout == 1)
                    return 'col-sm-12';
                else if (layout == 2)
                    return 'col-sm-6';
            },

            productContent() {
                let content = this.selfData.content,
                    _cache;
                if (content.length < 4) {
                    for (let i = content.length; i < 4; i++) {
                        _cache = {
                            img: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                            title: `商品名称`,
                            refe: `商品介绍详情`,
                            price: `35.00`,
                            unit: `元`,
                            perch: true,
                        }
                        content.push(_cache);
                    }
                }
                return content;
            }
        },
        watch: {
            goods: {
                //检测商品数组的变化,在选择四个商品以后不能在进行选择
                handler(val) {
                    let i = 0;
                    val.forEach(item => {
                        if (item.check == true) {
                            i++;
                            if (i > 4) {
                                item.check = false;
                            }
                        }
                    })
                },
                deep: true
            },
            selfData: {
                handler(val) {
                    console.log('组件数据修改了');
                    this.$emit('changeData', this.index, val);
                },
                deep: true
            },
            data(val) {
                console.log('页面数据修改了');
                if (this.selfData == val)
                    return;

                this.selfData = val;
            }
        },
        created: function () {
            console.log('this.data', this.data)
            if (this.data.content.length <= 0) {
                this.data.content = [
                    {
                        img: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                        title: `商品名称`,
                        refe: `商品介绍详情`,
                        price: `35.00`,
                        unit: `元`,
                        perch: true,
                    },
                    {
                        img: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                        title: `商品名称`,
                        refe: `商品介绍详情`,
                        price: `35.00`,
                        unit: `元`,
                        perch: true,
                    },
                    {
                        img: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                        title: `商品名称`,
                        refe: `商品介绍详情`,
                        price: `35.00`,
                        unit: `元`,
                        perch: true,
                    },
                    {
                        img: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                        title: `商品名称`,
                        refe: `商品介绍详情`,
                        price: `35.00`,
                        unit: `元`,
                        perch: true,
                    },
                ]
            }
        },
        methods: {
            //重置数据
            reset_data() {
                this.selfData = {
                    style: {
                        layout: 1,
                    },
                    layout: {
                        card: false,
                        four: true,
                    },
                    content: [],
                    priceShow: false,
                    titleShow: false,
                }
            },

            //点击确定,添加商品进界面
            ok_addpro() {
                let me = this;
                this.dialogVisible = false;


                let goods = [];
                //自带的默认商品数组 可能为空
                this.selfData.content.forEach((res, index) => {
                    if (res.perch) {
                        goods.push(res);
                    }
                })
                //检测,如果自带的商品数组中还有值,清空
                if (goods.length) {
                    this.selfData.content = [];
                }


                this.goods.forEach(res => {
                    if (res.check == true) {
                        this.selfData.content.push(res);
                    }
                })


            },
            //点击切换布局详情
            layoutbtn(data) {
                let me = this;
                for (let item in this.selfData.layout) {
                    if (item == data) {
                        me.selfData.layout[item] = true;
                    } else {
                        me.selfData.layout[item] = false;
                    }
                }
            },
            add_pro() {
                let me = this;
                $.get(`http://homestead.test/api/test/goods`, res => {
                    let data = res.data;
                    data.forEach(item => {
                        item.check = false;
                    })
                    me.goods = data;
                    me.dialogVisible = true;

                })
            }
        }
    }
</script>
<style>
    [class*="col-"] {
        padding: 0 !important;
        margin: 0 !important;
    }
    .news_content {
        padding-top: 5px;
        color: #666;
        font-size: 13px;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical !important;
        -webkit-line-clamp: 2;
    }
</style>
<style scoped>
    .action {
        margin-top: 5px;
    }

    .add_goods {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed #999;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }

    .add_goods i {
        font-size: 30px;
        color: #999;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .pro_box img {
        height: 86px;
    }

    .dood_img {
        width: 100%;
    }

    .par {
        position: relative;
    }

    .son {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 110%;
        width: 600px;
        height: 600px;
        z-index: 50;
    }

    .pro_box {
        padding: 2.5px 2.5px;
        border: 1px solid rgba(0, 0, 0, .2);
        margin: 2.5px 0;
    }

    .pro_6 {
        /*margin: 5px;*/
        border: 1px solid rgba(0, 0, 0, .3);
        /*padding: 2px;*/
    }

    .pad {
        /*padding: 5px;*/
    }

    .text_goods {
        padding: 0 6px;
    }

    .good_title {
        padding-top: 5px;
        font-size: 13px;
    }

    .goods_price {
        font-size: 13px;
        color: #FC464A;
    }

    .pro_box {
        position: relative;
        display: flex;
    }

    .pro_box img {
        width: 130px;
    }

    .text_box {
        padding: 0 5px;
    }

    .pro_big {
        border: 1px solid rgba(0, 0, 0, .2);
        margin: 2.5px 0;
        padding: 5px 2.5px;
    }

    .hy1 {
        border: 1px solid rgba(0, 0, 0, .2);
        padding: 2.5px;
    }

    .hy1_2, .hy1_1 {
        border: 1px solid rgba(0, 0, 0, .2);
        padding: 2.5px;
        margin-top: 5px;
    }

    .hy1_2 {
        margin-left: 2.5px;
    }

    .hy1_1 {
        margin-right: 2.5px;
    }

    .hy1_text {
        padding: 2.5px;
    }

    .cart {
        color: #96D63E;
        float: right;
        font-size: 16px;
    }
    .pro_box  i{
        position: absolute;
        bottom: 5px;
        right: 6px;
    }
    .pro_big i{
        margin-right: 5px;
    }
    .pro_6_box{
        padding: 5px !important;
    }
</style>
