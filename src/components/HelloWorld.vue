<template>

  <div class="container-fluid">
    <iframe id="c_iframe" height="0" width="0" src="https://mp4.yx8.tv/diy/index" style="display:none"></iframe>
    <div class="row">
      <div class="col-md-8">
        <button @click="testpar">fdshf</button>
        <div class="box_">
          <div class="box">
            <div class="header">
              <div class="state">
                        <span>
                            <i class="fa fa-signal"></i>
                            <i class="fa fa-wifi"></i>
                        </span>
                <span>12:00 AM</span>
                <span>
                            100%
                            <i class="fa fa-battery-full"></i>
                        </span>
              </div>
              <div class="info_bar">
                        <span>
                            <i class="fa fa-angle-left"> 返回</i>
                        </span>
                <span>微页面</span>
                <span class="share">...</span>
              </div>
            </div>
            <div class="container-fluid box_title" v-for="(item ,n) in range">
              <div class="component-wrapper" @click="focusComponent(n)" :class="{'_focus':focusC == n}">
                <component :is="item.name" :index="n" :data="item.data"
                           @changeData="changeData"></component>
                <div class="component-controls">
                  <div class="btn-item" @click.self="upRecord(n)">
                    Up
                  </div>
                  <div class="btn-item" @click.self="downRecord(n)">
                    Down
                  </div>
                  <div class="btn-item" @click.self="removeComponent(n)">
                    remove
                  </div>

                </div>
              </div>
            </div>
            <div class="btns">
              <div class="btn" v-for="item in addtype">
                <div class="btn_box_" @click="addComponent(item.component)">
                  {{item.title}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 btn_box">
        <div class="btn_inst">
          <el-button @click="save_data" size="mini" type="primary">保存</el-button>
          <el-button size="mini" type="success">保存并预览</el-button>
        </div>
      </div>
    </div>
    <!--<div class="btn_box">-->
    <!--<div></div>-->
    <!--</div>-->
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn_inst {
    background-color: #FFFECE;
    width: 50%;
    margin: 0 auto;
    padding: 3px 0;
    border-radius: 5px;
  }

  .btn_box {
    height: 20px;
    position: fixed;
    bottom: 5%;
    width: 100%;
    z-index: 999999999999999999 !important;
  }

  .box_title {
    padding: 0;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
  }

  .btns {
    margin-top: 30px;
  }

  .btn {
    display: inline-block;
    width: 33.33%;
    text-align: center;
    padding: 0;
  }

  .btn_box_ {
    background-color: rgb(197, 197, 197);
    width: 100%;
    margin: 3px;
    border-radius: 5px;
  }

  .header {
    background-color: rgb(28, 28, 32);
  }

  .state {
    font-size: 10px;
    padding: 2px 5px;
    background-color: rgb(28, 28, 32);
    display: flex;
    justify-content: space-between;
    color: #fff;
  }

  .info_bar {
    padding: 2px 5px;
    background-color: rgb(28, 28, 32);
    display: flex;
    justify-content: space-between;
    color: #fff;
    align-items: baseline;
  }

  .info_bar span {
    font-size: 15px;
  }

  .info_bar span i {
    font-size: 16px;
  }

  .share {
    width: 57px;
    text-align: right;
  }

  .box_ {
    margin: 0 auto;
    margin-top: 50px;
    position: relative;
    width: 300px;
    height: 100%;
    /*border: 10px solid rgba(0,0,0,0);*/
  }

  .box {
    width: 300px;
    height: 100%;
    /*margin: 0 auto;*/
    /*margin-top: 50px;*/
    /*position: relative;*/
    padding-top: 33px;
  }

  .component-wrapper {
    border: 2px;
    border-color: transparent;
    position: relative;
  }

  .component-wrapper._focus {
    border: 2px dashed #27A343;
  }

  .component-wrapper .component-controls {
    visibility: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .component-wrapper._focus .component-controls {
    visibility: visible;
  }

  .component-wrapper._focus .component-controls .btn-item {
    display: inline-block;
    color: #f8f8f8;
    font-size: 10px;
    line-height: 18px;
    padding-left: 10px;
    padding-right: 10px;
    background: rgba(0, 0, 0, .7);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .component-wrapper._focus >>> .son {
    visibility: visible;
  }

</style>

<style>

  .pro_box img {
    width: 100%;
    height: 135px;
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

</style>


<script>


  import axios from 'axios'
  import $ from 'jquery'
  import goods from './components-type/goods'
  import title_ from './components-type/title'
  import news from './components-type/news'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        title: '123',
        focusC: null,
        componentTypes: {
          goods: {
            name: 'goods',
            data: {
              style: {
                layout: 1,
              },
              layout: {
                card: false,
                four: true,
                bigImg: false,
                hybrid: false,
              },
              content: [],
              priceShow: true,
              titleShow: true,
              cartShow: false,
            },
          },
          news: {
            name: 'news',
            data: {
              content: [],
            },
          },
          title_: {
            name: 'title_',
            data: {
              content: `
                          <div>
                          <span>点击编辑富文本的内容------></span>
                          <span>你可以对文字进行加粗,斜体,下划线,删除线,文字颜色,文字背景颜色,以及字号进行简单的排版操作.</span>
                          <span>也可以在这里进行插入图片然后</span>
                          <span>也可以在这里进行插入图片然后</span>
                          </div>
                            `
            }
          }
        },
        range: [],
        addtype: [
          {id: 2, title: '文章', component: "news"},
          {id: 3, title: '商品', component: "goods"},
          {id: 8, title: '富文本', component: "title_"},
        ],
      }
    },
    components: {
      goods,
      title_,
      news,
    },
    methods: {
      testpar() {
        console.log('$("#iframe",parent.document)', $("#iframe", parent.document))
      },
      height_save() {

        var b_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
        var b_height = document.querySelector('.box').offsetHeight;
        var c_iframe = document.getElementById("c_iframe");
        let height = `${b_width}|${b_height}`;
        let su = `https://mp4.yx8.tv/diy/index`;
        c_iframe.src = su + '?' + height;
        console.log('c_iframe', c_iframe)
        console.log('c_iftame.src', c_iframe.src);
      },
      save_data() {
        let data = JSON.stringify(this.range);
        $.post(`https://api4.yx8.tv/diy/add`, {
          content_json: data,
          template_id: 1,
        }, res => {
          console.log('res', res);
        })
      },

      newObj(obj) {
        return JSON.parse(JSON.stringify(obj));
      },
      addComponent(name) {
        this.range.push(this.newObj(this.componentTypes[name]));
        let arr = this.range.length - 1;
        this.focusC = arr;
        this.height_save();
      },


      removeComponent(index) {
        return this.range.splice(index, 1);
      },

      recordComponent(index, nIndex) {
        let _cache = this.removeComponent(index)[0];
        this.range.splice(nIndex, 0, _cache);
        this.focusC = nIndex;
      },
      upRecord(index) {
        if (index == 0)
          return;
        this.recordComponent(index, index - 1);
      },

      downRecord(index) {
        if (index == this.range.length - 1)
          return;
        this.recordComponent(index, index + 1);
      },
      changeData(index, data) {
        console.log('index', index)
        console.log('data', data)
        //页面的数据被修改的时候,子组件接收到数据,调用父组件本次事件,把值存进数组中
        this.range[index].data = data;
      },
      focusComponent(index) {
        console.log('index', index)
        this.focusC = index;
      }
    },
    computed: {},
  }
</script>
