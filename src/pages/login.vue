<template>
  <div class="bg-purple login">
    <section class="panel">
      <header>登 录</header>
      <section>
        <el-form :model="user" :rules="userRules" ref="user" label-width="40px" class="demo-ruleForm">
          <el-form-item label="工号" prop="jobId" class="text-left">
            <el-input type="text" v-model="user.jobId" auto-complete="off" class="w-15">
              <template slot="prepend"><span class="el-icon-my-user1"></span></template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd"  class="text-left">
            <el-input type="password" v-model="user.pwd" auto-complete="off" class="w-15">
              <template slot="prepend"><span class="el-icon-my-Password"></span></template>
            </el-input>
          </el-form-item>
          <el-form-item>
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
          pwd: '',
        },
        userRules : {
          jobId: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          pwd: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/user/login',{
              jobId: this.user.jobId,
              password: this.md5.hex(this.user.pwd),
            }).then((backData) => {
              if(backData.body.status == '1') {
                this.$message({
                  message: backData.body.msg,
                  type: 'success'
                });
                this.$refs[formName].resetFields();
                if(window.localStorage) {
                  const user = JSON.stringify(backData.body.data);
                  sessionStorage.setItem('user', user);
                  this.$store.commit('SET_USER');
                }
                if(backData.body.data.role === 'user') {
                  this.$router.push('/personal/calendar');
                }else {
                  this.$router.push('/admin/register');
                }
              }else {
                this.$message.error(backData.body.msg);
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
  .login{
    width:100%;
    display: flex;
    justify-content: center;

    .panel{
      display: flex;
      flex-direction:column;
      margin-top:4rem;

      header{
        width: 30rem;
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
         background-color: rgba(239, 239, 239, .6);
       }
    }
  }
</style>
