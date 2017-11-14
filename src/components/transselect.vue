<template>
  <div id="trans-select">
    <section>
      <header>团队分组</header>
      <article class="m-b-p5">
        <aside>
          <ul class="list-none">
            <li>小组一</li>
            <li>小组二</li>
            <li>小组三</li>
          </ul>
        </aside>

        <section class="my-el-transfer">
          <el-transfer
            class="text-left"
            :titles="titles"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入组员拼音"
            v-model="team_name"
            :data="team">
          </el-transfer>

          <el-button class="m-t-2" type="primary">确定分组</el-button>
        </section>

      </article>
    </section>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        const team = ['赵一', '钱二', '孙三', '李四', '周五', '吴六', '郑七'];
        const pinyin = ['zhaoyi', 'qianer', 'sunsan', 'lisi', 'zhouwu', 'wuliu', 'zhengqi'];
        team.forEach((member, index) => {
          data.push({
            label: member,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        titles: ['全部组员', '分配组员'],
        team: generateData(),
        team_name: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #trans-select {
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
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #adbbbf;
        border-radius: 0 0 1.5rem 1.5rem;

        aside{
          width:10rem;
          height:100%;
          border-right:1px solid #DDD;
        }
      }
    }
  }

  ul li{
    height:3.5rem;
    line-height:3.5rem;
    padding-left:.5rem;
    border-bottom:1px solid #FFF;
    background-color: rgba(239, 239 ,239, .5);
  }

  ul>li:first-child{
    border-top:1px solid #FFF;
  }

  ul>li:nth-of-type(even){
    background-color: rgba(239, 239 ,239, .7);
  }

  .my-el-transfer{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>

