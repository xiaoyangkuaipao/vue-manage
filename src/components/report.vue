<template>
  <div class="report">
    <header>
      工 作 报 告
    </header>

    <div class="report-form">
      <el-form :model="reportForm" :rules="rules" ref="reportForm" label-width="100px" class="demo-reportForm" action="api/personal/report">
        <el-form-item label="报告名称" prop="name">
          <el-input v-model="reportForm.name"></el-input>
        </el-form-item>

        <el-form-item label="报告时间段" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择起始日期" v-model="reportForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="选择结束时间" v-model="reportForm.date2" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="上传报告" required>
          <el-upload
            v-bind:auto-upload = autoUpload
            ref="report"
            class="upload-demo"
            style="float:left"
            drag
            :data= reportForm
            action="api/personal/report"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传pdf/word文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="reportForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('reportForm')">发送</el-button>
          <el-button @click="resetForm('reportForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        reportForm: {
          name: '',
          date1: '',
          date2: '',
          desc: ''
        },
        autoUpload: false,
        rules: {
          name: [
            { required: true, message: '请输入报告名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.report.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs.report.clearFiles();
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
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
