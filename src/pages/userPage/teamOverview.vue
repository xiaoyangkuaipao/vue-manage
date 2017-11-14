<template>
  <div id="teamOverview">
    <section>
      <header>团队总览</header>
      <article class="p-t-p5">
        <p class="p-t-p5">
          <label class="title">团队名称：</label>
          <label class="value">中国测试</label>
          <label class="title">团队人数：</label>
          <label class="value">20</label>
        </p>
        <p class="my-el-collapse">
          <keep-alive>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="总览" name="1">
                <div class="div-item">
                  <label>团队配置</label>
                  <div id="staffing"></div>
                </div>
                <div class="div-item">
                  <label>组员资历</label>
                  <div id="edulBg"></div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="组员" name="2">
                <div class="cards">
                  <card card=""></card>
                  <card card=""></card>
                  <card card=""></card>
                </div>
              </el-collapse-item>
            </el-collapse>
          </keep-alive>
        </p>
      </article>
    </section>
  </div>
</template>

<script lang="babel">
  import card from '../../components/card'

  export default {
    data() {
      return {
        activeNames: '1',
      };
    },
    mounted() {
      this.drawStaffing();
      this.drawEdulBg();
    },
    methods: {
      drawStaffing() {
        require(
          ['echarts', '../../../node_modules/echarts/lib/chart/pie', 'echarts/lib/component/tooltip.js', 'echarts/lib/component/title.js'], (ec) => {
            let staffing = ec.init(document.getElementById('staffing'));
            staffing.setOption({
              legend: {
                orient : 'vertical',
                x : 'left',
                data:['产品经理','前端工程师','后端工程师','测试工程师','UI/UX工程师']
              },
              tooltip : {
                trigger: 'item'
              },
              calculable : true,
              color:['#B70A0A', '#121290', '#333', '#5A6C81', '#CC7832'],
              series : [
                {
                  name:'人员配置',
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                    {value:2, name:'产品经理'},
                    {value:5, name:'前端工程师'},
                    {value:8, name:'后端工程师'},
                    {value:4, name:'测试工程师'},
                    {value:1, name:'UI/UX工程师'}
                  ],
                }]
            })
          }
        )
      },
      drawEdulBg() {
        require(
          ['echarts', '../../../node_modules/echarts/lib/chart/bar', 'echarts/lib/component/tooltip.js', 'echarts/lib/component/title.js'], (ec) => {
            let edulBg = ec.init(document.getElementById('edulBg'));
            edulBg.setOption({
              legend: {
                data:['实习生', '应届生', '1-3年', '3-5年', '5-10年', '10年以上']
              },
              tooltip : {
                trigger: 'axis'
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  data:['实习生', '应届生', '1-3年', '3-5年', '5-10年', '10年以上']
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              color:['#B70A0A', '#121290', '#333', '#5A6C81', '#CC7832'],
              series : [
                {
                  name:'人员配置',
                  type:'bar',
                  data:[
                    {value:1, name:'实习生'},
                    {value:2, name:'应届生'},
                    {value:5, name:'1-3年'},
                    {value:8, name:'3-5年'},
                    {value:3, name:'5-10年'},
                    {value:1, name:'10年以上'},
                  ],
                  markPoint : {
                    data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                    ]
                  },
                }]
            })
          }
        )
      }
    },
    components: {
      card,
    },
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #teamOverview {
    display: flex;
    min-height: 30rem;
    margin: -.5rem .5rem 1rem .5rem;

    >section {
       flex: 1;
       position: relative;
       padding-top: 2.5rem;
       background-color: transparent;

      header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 2.8rem;
        line-height: 2.8rem;
        font-weight: bolder;
        font-size: 1.2rem;
        background-color: #EEE;
        border-radius: 1.5rem 1.5rem 0 0;
      }

      article {
        width: 100%;
        height: 100%;
        text-align: left;
        background-color: #adbbbf;
        border-radius: 0 0 1.5rem 1.5rem;
      }
    }

    .my-el-collapse{
      padding:.5rem 2.5rem 0 2.5rem;

      .div-item{
        display: inline-block;
        padding:.3rem;
        margin-right:1rem;
        vertical-align: middle;


        div{
          width:425px;
          height:425px;
          border:1px solid black;
        }

        label{
          font-size:.9rem;
          font-weight: bolder;
        }
      }
    }
  }

  label{
    display: inline-block;
  }

  label.title{
    width:8rem;
    text-align: right;
  }

  label.value{
    min-width:10rem;
    text-align: left;
    font-weight: bolder;
  }

  .cards{
    display: flex;
    flex-direction: row;
    padding:.5rem 1rem .5rem 0;
    text-align: center;
  }
</style>
