<template>

  <div class="card">
    <img :src="card.src">
    <p><label>姓名：</label>测试</p>
    <p>
      <span class="wrapper-min">
        <label>性别：</label>男
      </span>
      <span class="wrapper-min">
        <label>年龄：</label>25
      </span>
    </p>
    <p>
      <label>工作年限：</label>3-5年
    </p>
    <p class="radar">
      <span>个人潜质</span>
      <div id="radar"></div>
    </p>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {};
    },
    props: [
      'card'
    ],
    mounted() {
      this.drawRadar();
    },
    methods: {
      drawRadar() {
        require(
          ['echarts', 'echarts/lib/chart/radar', 'echarts/lib/component/tooltip.js', 'echarts/lib/component/title.js'], (ec) => {
          let radar = ec.init(document.getElementById('radar'));
          radar.setOption({
            tooltip : {
              trigger: 'axis'
            },
            polar : [
              {
                indicator : [
                  { text: '领导力', max: 10, color:'#324057'},
                  { text: '自主力', max: 10, color:'#324057'},
                  { text: '适应力', max: 10, color:'#324057'},
                  { text: '性格', max: 10, color:'#324057'},
                  { text: '技术', max: 10, color:'#324057'},
                ]
              }
            ],
            calculable : true,
            series : [
              {
                name:'个人潜质',
                type:'radar',
                color:['#324057'],
                data:[
                  {value:[6, 7, 6, 8, 8]},
                ],
              }]
        })
        })
      },
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .card{
    flex:1;
    height:26rem;
    margin:.5rem;
    background-color: #ADBBBF;
    text-align:center;

    >img{
      margin:.5rem 0;
      width:5rem;
      height:5rem;
      border-radius:100%;
     }
  }

  #radar{
    display: inline-block;
    width:16rem;
    height:13rem;
  }

  .wrapper-min{
    display: inline-block;
    width:4rem;
  }

  .radar{
    margin:.8rem 0;
    padding:0 3rem;
    background-color:rgba(196, 196, 196, .7);

    >span{
      display: inline-block;
      text-decoration: dashed;
      font-weight: bolder;
      color: #555;
    }
  }
</style>
