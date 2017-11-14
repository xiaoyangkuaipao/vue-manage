<template>
  <div class="report">
    <header>
      请假单
    </header>

    <div class="report-form">
      <el-form :model="leave" :rules="rules" ref="leave" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工号" prop="jobId" class="text-left">
          <label style="color:#999">{{leave.jobId}}</label>
        </el-form-item>

        <el-form-item label="姓名" prop="name" class="text-left">
          <label style="color:#999">{{leave.name}}</label>
        </el-form-item>

        <el-form-item label="可用年假" prop="annualLeave">
          <span class="pull-left">{{leave.annualDays}} 天</span>
          <span class="pull-left m-l-2">使用年假
            <el-switch class="m-l-1" on-text="是" off-text="否" v-model="leave.annualLeave"></el-switch>
          </span>
        </el-form-item>

        <transition name="show-leave-type">
          <el-form-item label="请假类型" prop="leaveType" v-show="!leave.annualLeave">
            <span class="pull-left">
              <el-radio-group v-model="leave.leaveType">
                <el-radio label="事假"></el-radio>
                <el-radio label="病假"></el-radio>
              </el-radio-group>
            </span>
          </el-form-item>
        </transition>

        <el-form-item label="请假时间段" required>
          <el-col :span="9">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择起始日期" v-model="leave.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="9">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择结束时间" v-model="leave.date2" :disabled="!(leave.date1)" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="请假时间" required>
          <el-col class="line" :span="4">
            <el-switch class="m-l-1" on-text="全天" off-text="半天" v-model="leave.leaveLength"></el-switch>
          </el-col>
          <el-col class="line" :span="4" v-if="!leave.leaveLength">
            <el-switch
              class="m-l-1"
              on-text="上午"
              off-text="下午"
              active-color="#13ce66"
              inactive-color="#20A0FF"
              v-model="leave.leavePeriod"
            ></el-switch>
          </el-col>
        </el-form-item>

        <el-form-item label="请假理由" prop="desc">
          <el-input type="textarea" v-model="leave.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('leave')">发送</el-button>
          <el-button @click="resetForm('leave')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        leave: {
          name: this.$store.state.user.name,
          jobId: this.$store.state.user.jobId,
          date1: '',
          date2: '',
          desc: '',
          annualLeave: true,
          annualDays: 5,
          leaveType: '事假',
          leaveLength: true,
          leavePeriod: true,
        },
        rules: {
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let leaveType = 0;
        if(this.leave.annualLeave){           // leaveType: 0 -> 年假 ； 1 -> 事假 ；2 -> 病假
          leaveType = 0;
        }else {
          switch (this.leaveType) {
            case '事假': leaveType = 1; break;
            case '病假': leaveType = 2; break;
            default: leaveType = 1; break;
          }
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/personal/leave',{
              startTime: this.leave.date1,
              endTime: this.leave.date2,
              reason: this.leave.desc,
              leaveLength: this.leave.leaveLength,
              leavePeriod: this.leave.leavePeriod,
              leaveType: leaveType,
            }).then(backData => {
              if(backData.body.status == '1') {
                this.$message({
                  message: backData.body.msg,
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              }else {
                this.$message.error(backData.body.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      'leave.leaveType': {
        handler(val) {
          if(val === '病假') {
            this.$alert('申请病假，需要在病愈到岗时，向人事部门提交医院开示的病假条，及其他相关材料！', '重要提示', {
              confirmButtonText: '确定',
            });
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .show-leave-type-enter, .show-leave-type-leave{
    opacity: 0;
  }

  .show-leave-type-enter-active, .show-leave-type-leave-active{
    transition:all .5s linear;
  }

  .report{
    padding:0 10rem 3rem 10rem;

  header{
    height:2.5rem;
    line-height:2.5rem;
    background-color: #EEE;
    font-weight:bold;
    font-size: 1.5rem;
    padding:.8rem 0 ;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .report-form{
    padding:1.5rem 5rem 0 5rem ;
    background-color: rgba(239, 239, 239, .8);
    border:1px solid #FFF;
    border-radius:0 0 1.5rem 1.5rem;
  }

  input{
    background-color: #999;
  }
  }
</style>
