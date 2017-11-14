<template>
  <div class="calendar">
    <header>日 程 表</header>
    <full-calendar :events="fcEvents" lang="zh" class="my-full-calendar">
      <div slot="fc-header-right" class="fc-header-right">
        <el-button type="text" @click="dialogVisible = true" class="el-icon-date edit">
        </el-button>
      </div>
    </full-calendar>

    <el-dialog
      title="新增行程"
      :visible.sync="dialogVisible"
      size="small" class="new-stroke">
      <div>
        <span class="title">行程日期：</span><el-date-picker v-model="daterange" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions"></el-date-picker>
      </div>
      <div>
        <span class="top-title">行程内容：</span><el-input v-model="note" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入行程内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="babel">
  import fullCalendar from 'vue-fullcalendar'

  export default {
    data() {
      return {
        daterange: '',
        note: '',
        fcEvents: [],
        dialogVisible: false,
        pickerOptions: {
          editable: false,
          disabledDate(time) {
            return time.getTime() < new Date(new Date() - 24*3600*1000).getTime();
          }
        },
      };
    },
    created() {
      this.getData();
    },
    mounted() {
    },
    computed: {
    },
    components: {
      fullCalendar,
    },
    methods: {
      sure() {
        this.dialogVisible = false;
        let item = {};
        if(this.daterange){
          item.start = new Date(this.daterange[0]).toLocaleDateString().replace(/\//g, '-');
          item.end = new Date(this.daterange[1]).toLocaleDateString().replace(/\//g, '-');
          item.title = this.note;
          this.fcEvents.push(item);
          this.$http.post('api/personal/calendar/addItem',{
            jobId: '0001',
            fcEvents: this.fcEvents,
          }).then((backData) => {
            if(backData.body.status == '1'){
              this.getData();
              this.$message({
                message: backData.body.msg,
                type: 'success'
              });
            }else {
              this.$message.error(backData.body.msg);
            }
          });
          this.daterange = "";
          this.note = "";
        }else{
          this.$message.error('请选择行程日期！');
        }
      },
      cancel() {
        this.dialogVisible = false;
        this.daterange = "";
        this.note = "";
      },
      getData() {
        this.$http.get('api/personal/calendar/items').then((backData) => {
          if(backData.body.status == '1'){
            this.fcEvents = backData.body.fcEvents;
          }else {
            this.$message.error('查询失败');
          }
        });
      },
    },
    watch: {
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .calendar{
    width:100%;

    >header{
       max-width: 100%;;
       margin:0 .5rem;
       height:2.8rem;
       line-height:2.8rem;
       font-weight: bolder;
       font-size:1.2rem;
       background-color:#EEE;
       border-radius:1.5rem 1.5rem 0 0 ;
     }

    .my-full-calendar{
      max-width: 100%;;
      margin:0 .5rem;
    }
  }

  .edit{
    position: relative;
    background-color:transparent;
    border:none;
    font-size:1.12rem;
    margin-left:8rem;
    cursor: pointer;
    color:#666;
  }

  .edit:hover{
    color:#333
  }

  .new-stroke{
    text-align: left;

    div{
      margin:.5rem 0;
    }

    .el-input{
      width:15rem;
    }

    .el-textarea{
      width:30rem;
    }
  }

  span.title{
    display: inline-block;
    width:5rem;
    margin-right:.5rem;
    text-align: right;
  }

  span.top-title{
    display: inline-block;
    width:5rem;
    padding-top:.5rem;
    margin-right:.5rem;
    text-align: right;
    vertical-align: top;
  }

</style>
