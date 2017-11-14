<template>
  <div id="morningReport">
    <el-carousel :interval="5000" arrow="always" height="29.5rem">
      <el-carousel-item v-for="item in pics" :key="item">
        <div style="width:97.3%;height:99%;margin:0rem 1rem;background-size: cover;background-repeat: no-repeat" v-bind:style="{backgroundImage:'url('+item.src+')'}"></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        pics: [
          {
            src: '../../static/image/slider-1.jpg'
          }, {
            src: '../../static/image/slider-2.jpg'
          }, {
            src: '../../static/image/slider-3.jpg'
          }, {
            src: '../../static/image/slider-4.jpg'
          },
        ],
      };
    },
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #morningReport{
    height:100%;
  }
</style>
