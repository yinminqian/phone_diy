<template>
    <div>
        <div class="container-fluid">
            <div class="row box">
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data: function () {
            return {}
        },
        created: function () {
            axios.get(`http://homestead.test/api/VueTest/read`).then(function (res) {
                let content = JSON.parse(res.data.content);
                console.log('content',content)
                let box=document.querySelector('.box');
                box.innerHTML=content;
            })
        }
    }


</script>
<style scoped>

</style>