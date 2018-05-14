<template>
    <div class="container-fluid par">
        <div class="row pad">
            <div class="col-md-12" v-for="item in selfData.content">
                <div class="news_pro">
                    <div class="su">
                        <img class="news_img" :src="item.image" alt="">
                    </div>
                    <div class="su">
                        <div class="news_title">{{item.title}}</div>
                        <div class="news_content" style="-webkit-box-orient: vertical">{{item.description}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="son">
            <div>
                添加新闻:
                <div class="add_goods" @click="begdata">
                    <i class="fa fa-plus"></i>
                </div>
            </div>
            <div style="margin: 20px 0 0 0 ">
                <el-button size="mini" @click="reset" type="danger">重置数据</el-button>
            </div>
        </div>

        <el-dialog
                title="添加新闻"
                :visible.sync="dialogVisible"
                width="50%">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12" v-for="item in news">
                        <el-checkbox v-model="item.state" :label="item.title" :key="item.id">{{item.title}}
                        </el-checkbox>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add_news">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        props: {
            data: Object,
            index: Number,
        },
        data() {
            return {
                //控制弹出框
                dialogVisible: false,
                selfData: this.data,
                news: [],
            }
        },
        watch: {
            news: {
                handler(val) {
                    let i = 0;
                    val.forEach(res => {
                        if (res.state == true) {
                            i++;
                            if (i > 4) {
                                res.state = false;
                            }
                        }
                    })
                },
                deep: true,
            },
            data(val) {
                console.log('组件数据修改了')
                if (this.selfData == val) {
                    return
                }

                this.selfData = val;
            },
            selfData: {
                handler(val) {
                    console.log('页面数据修改了')
                    this.$emit('changeData', this.index, val);
                },
                deep: true,
            }
        },
        methods: {
            reset() {
                this.selfData = {content: [
                        {title: '热烈欢迎党的十九大胜利召开', image: `https://dummyimage.com/600x400/84D5F8/00bfff.png`, description: `8月31日，习近平总书记主持召开中共中央政治局会议，研究党的十八届七中全会和党的十九大筹备工作。会议决定，党的十八届七中全会于2017年10月11日在北京召开，中共中央政治局将向全会建议，党的十九大于2017年10月18日在北京召开。这是凝心聚力、振奋人心的消息。根据中央政治局的建议，全球瞩目、万众期待的中国共产党第十九次全国代表大会！`, raw: true,},
                        {title: '热烈欢迎党的十九大胜利召开', image: `https://dummyimage.com/600x400/84D5F8/00bfff.png`, description: `8月31日，习近平总书记主持召开中共中央政治局会议，研究党的十八届七中全会和党的十九大筹备工作。会议决定，党的十八届七中全会于2017年10月11日在北京召开，中共中央政治局将向全会建议，党的十九大于2017年10月18日在北京召开。这是凝心聚力、振奋人心的消息。根据中央政治局的建议，全球瞩目、万众期待的中国共产党第十九次全国代表大会！`, raw: true,},
                        {title: '热烈欢迎党的十九大胜利召开', image: `https://dummyimage.com/600x400/84D5F8/00bfff.png`, description: `8月31日，习近平总书记主持召开中共中央政治局会议，研究党的十八届七中全会和党的十九大筹备工作。会议决定，党的十八届七中全会于2017年10月11日在北京召开，中共中央政治局将向全会建议，党的十九大于2017年10月18日在北京召开。这是凝心聚力、振奋人心的消息。根据中央政治局的建议，全球瞩目、万众期待的中国共产党第十九次全国代表大会！`, raw: true,},
                        {title: '热烈欢迎党的十九大胜利召开', image: `https://dummyimage.com/600x400/84D5F8/00bfff.png`, description: `8月31日，习近平总书记主持召开中共中央政治局会议，研究党的十八届七中全会和党的十九大筹备工作。会议决定，党的十八届七中全会于2017年10月11日在北京召开，中共中央政治局将向全会建议，党的十九大于2017年10月18日在北京召开。这是凝心聚力、振奋人心的消息。根据中央政治局的建议，全球瞩目、万众期待的中国共产党第十九次全国代表大会！`, raw: true,},
                    ]};

            },
            add_news() {
                let me = this, __cache = [];
                this.selfData.content.forEach(res => {
                    if (res.raw) {
                        __cache.push(res);
                    }
                })

                if (__cache.length) {
                    this.selfData.content = [];
                }


                this.dialogVisible = false;
                this.news.forEach(item => {
                    if (item.state == true) {
                        me.selfData.content.push(item)
                    }
                })
            },
            begdata() {
                let me = this;
                this.dialogVisible = true;
                $.get(`https://api4.yx8.tv/article/diy`, res => {
                    let data = res.success.items;
                    data.forEach(item => {
                        item.state = false;
                    })
                    me.news = data;
                })
            },
        },
        created() {
            console.log('NewsTemplate init');
            //如果是新加的界面,那么给新加的数组赋值
            if (!this.data.content.length) {
                let _cache = {
                    title: '热烈欢迎党的十九大胜利召开',
                    image: `https://dummyimage.com/600x400/84D5F8/00bfff.png`,
                    description: `8月31日，习近平总书记主持召开中共中央政治局会议，研究党的十八届七中全会和党的十九大筹备工作。会议决定，党的十八届七中全会于2017年10月11日在北京召开，中共中央政治局将向全会建议，党的十九大于2017年10月18日在北京召开。这是凝心聚力、振奋人心的消息。根据中央政治局的建议，全球瞩目、万众期待的中国共产党第十九次全国代表大会！`,
                    raw: true,
                }
                for (let i = this.data.content.length; i < 4; i++) {
                    this.data.content.push(_cache);
                }
            }
        }
    }
</script>
<style scoped>
    img {
        max-width: 100%;
    }

    .par {
        position: relative;
    }

    .news {
        border: 1px solid red;
    }

    .pad {
        padding: 5px;
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

    .news_pro {
        border: 1px solid rgba(0, 0, 0, .3);
        margin: 2.5px 0;
        padding: 2.5px;
    }

    .news_img {
        display: inline-block;
        text-overflow: ellipsis;
        height: 70px;
    }

    .news_title {
        font-size: 14px;
        width: 140px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .news_content {
        padding-top: 5px;
        color: #666;
        font-size: 13px;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .news_img {
        width: 100px;
    }

    .su {
        vertical-align: top;
        display: inline-block;
    }


</style>