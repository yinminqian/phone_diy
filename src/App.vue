<template>
    <div id="app">

        <router-view/>
    </div>
</template>

<script>
    import goods from './components/components-type/goods'

    export default {
        name: 'App',
        methods: {
            con: function () {
                console.log('1', 2)
            },
            addtype_: function () {
                console.log('1', 1)
            }
        },
        components: {
            goods: goods,
        }
    }
</script>

<style>
    .btn_box {
        text-align: center;
        margin: 20px 0;
        margin-bottom: 40px;
    }
</style>
