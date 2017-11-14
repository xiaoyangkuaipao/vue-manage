<template>
  <div id="message">
    <section>
      <header>个 人 通 知</header>
      <article class="m-b-p5">
        <aside>
          <el-radio-group v-model="messageMode" class="m-t-1">
            <el-radio-button label="这一天"></el-radio-button>
            <el-radio-button label="这一周"></el-radio-button>
            <el-radio-button label="这一月"></el-radio-button>
            <el-radio-button label="全部"></el-radio-button>
          </el-radio-group>
          <ul class="list-none m-t-1 ">
            <li>
              <label>1</label>
              <p><span class="title">通知时间：</span>2017-10-14</p>
              <p><span class="title">通知人：</span>测试</p>
              <p><span class="title">通知主题：</span>2017-10-14</p>
            </li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
          </ul>
          <el-pagination
            class="m-t-1"
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </aside>
      </article>
    </section>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        messageMode: '这一天',
      };
    },
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #message{
    display: flex;
    min-height: 30rem;
    margin:-.5rem .5rem 1rem .5rem;

    >section{
      flex: 1;
      position: relative;
      padding-top:2.5rem;
      background-color: transparent;

      header{
        position: absolute;
        top:0;
        width:100%;
        height:2.8rem;
        line-height: 2.8rem;
        font-weight: bolder;
        font-size:1.2rem;
        background-color:#EEE;
        border-radius:1.5rem 1.5rem 0 0 ;
      }

      article{
        width:100%;
        height:100%;
        background-color: #adbbbf;
        border-radius:0 0 1.5rem 1.5rem;

        aside{
          width:20rem;
          height:100%;
          padding:0rem .3rem;
          border-right:1px solid #DDD;
        }

        ul li{
          position:relative;
          height:3.5rem;
          line-height:3.5rem;
          padding-left:.5rem;
          border-bottom:1px solid #FFF;
          background-color: rgba(239, 239 ,239, .5);
          text-align:left;

          label{
            position: absolute;
          }

          p{
            height:1.15rem;
            line-height:1.15rem;
            font-size:.7rem;

            .title{
              display: inline-block;
              width:5.5rem;
              text-align: right;
            }
          }
        }

        ul>li:first-child{
          border-top:1px solid #FFF;
        }

        ul>li:nth-of-type(even){
          background-color: rgba(239, 239 ,239, .7);
        }
      }
    }
  }


</style>

