<template>
  <div class="bg-purple register">
    <section class="panel">
      <header>员 工 注 册</header>
      <section>
        <el-form :model="user" :rules="userRules" ref="user" label-width="80px" class="demo-ruleForm">
          <el-form-item label="工号" prop="jobId" class="text-left">
            <el-input type="text" v-model="user.jobId" auto-complete="off" class="w-15">
              <template slot="prepend"><span class="el-icon-my-gonghao"></span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name"  class="text-left">
            <el-input type="text" v-model="user.name" auto-complete="off" class="w-15">
              <template slot="prepend"><span class="el-icon-my-geren1"></span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="部门" prop="dept" class="text-left">
            <el-select v-model="user.dept" placeholder="请选择部门">
              <el-option label="技术部门" value="1"></el-option>
              <el-option label="销售部门" value="2"></el-option>
              <el-option label="行政部门" value="3"></el-option>
              <el-option label="产品部门" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" prop="duty"  class="text-left">
            <el-input type="text" v-model="user.duty" auto-complete="off" class="w-15">
              <template slot="prepend"><span class="el-icon-my-geren1"></span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="entryTime" class="text-left">
            <el-date-picker
              v-model="user.entryTime"
              type="date"
              placeholder="选择入职日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="m-t-5">
            <el-button type="primary" @click="submitForm('user')">提交</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </section>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      var checkEmpty = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('该项不能为空'));
        }else{
          return callback();
        }
      }
      return {
        user: {
          jobId: '',
          name: '',
          dept: '1',
          duty: '',
          entryTime: '',
        },
        userRules : {
          jobId: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          name: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          duty: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          dept: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          entryTime: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/user/register',{
              jobId: this.user.jobId,
              name: this.user.name,
              duty: this.user.duty,
              dept: this.user.dept,
              entryTime: this.user.entryTime,
            }).then((backData) => {
              if(backData.body.status == '1'){
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
                this.$refs[formName].resetFields();
              }else {
                this.$message.error('创建失败');
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .register{
    width:100%;
    display: flex;
    justify-content: center;

    .panel{
      display: flex;
      flex-direction:column;

      header{
        width: 55rem;
        height: 3rem;
        line-height: 3rem;
        font-weight: bolder;
        font-size: 1.2rem;
        background-color: #EEE;
        border-radius: 1.5rem 1.5rem 0 0;
      }

      >section{
         display: flex;
         justify-content: center;
         padding-top:2rem;
         padding-right:5rem;
         background-color: rgba(239, 239, 239, .6);
      }
    }
  }
</style>
