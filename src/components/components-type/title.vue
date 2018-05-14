<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div v-html="selfData.content   " class="text_box">

                </div>
            </div>
        </div>
        <div class="son">
            <div ref="editor" style="text-align:left"></div>
            <button v-on:click="getContent">查看内容</button>
            <!--<VueUEditor @ready="editorReady" style="width: 700px"></VueUEditor>-->

            <!--<quillEditor v-model="content"></quillEditor>-->
        </div>
    </div>
</template>

<script>
    // import 'quill/dist/quill.core.css'
    // import 'quill/dist/quill.snow.css'
    // import 'quill/dist/quill.bubble.css'
    // import {quillEditor} from 'vue-quill-editor'
    // import VueUEditor from '../UEditor';

    import E from 'wangeditor'


    export default {
        props: {
            data: Object,
            index: Number,
        },
        data() {
            return {
                selfData: this.data,
                editorContent: ''
            }
        },

        components: {
            // VueUEditor
        },
        watch: {
            data(val) {
                console.log('组件的数据被修改了', 组件的数据被修改了)
                if (this.selfData == val) {
                    return
                }
                this.selfData = val;
            },
            selfData: {
                handler(val) {
                    console.log('页面的数据被改变了')
                    this.$emit('changeData', this.index, val)
                },
                deep: true,
            },
            editorContent() {
                this.selfData.content = this.editorContent;
            }
        },
        created() {
            console.log('this.data', this.data)
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            editor.customConfig.uploadImgShowBase64 = true
            editor.create()
        },
        methods: {
            getContent: function () {
                console.log(this.editorContent);
            }
        }


    }
</script>


<style scoped>
    .son {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 110%;
        width: 600px;
        height: 600px;
        z-index: 50;
    }

    .text_box {
        word-break: break-all;
        word-wrap: break-word;
    }
</style>
<style>
    .w-e-toolbar {
        flex-wrap: wrap !important;
    }
</style>
