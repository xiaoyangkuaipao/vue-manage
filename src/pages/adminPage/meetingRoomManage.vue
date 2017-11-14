<template>
  <div class="bg-purple register">
    <section class="panel">
      <header>会 议 室 管 理</header>
      <section>
        <aside>
          <ul class="list-none">
            <!--<li class="title" style="position: relative">-->
              <!--会议室-->
            <!--</li>-->
            <li class="addRoom" @click="addRoom()" :class="{'list-active': -1 === activeList}">
              + 添加会议室
            </li>
            <li v-for="(room, index) in rooms" @click="editRoom(room, index)" :class="{'list-active': index === activeList}">
              {{room.roomName}} ({{room.roomFloor | floorFilter}})
            </li>
          </ul>
        </aside>
        <article>
          <el-form :model="meetingRoom" :rules="meetingRoomRules" ref="meetingRoom" label-width="120px" class="demo-ruleForm">
            <el-form-item label="会议室名称" prop="roomName" class="text-left">
              <el-input type="text" v-model="meetingRoom.roomName" auto-complete="off" class="w-15" :disabled="editType === 'edit'">
              </el-input>
            </el-form-item>
            <el-form-item label="会议室楼层" prop="roomFloor" class="text-left">
              <el-col :span="6">
                <el-select v-model="meetingRoom.roomFloor" placeholder="请选择楼层" :disabled="editType === 'edit'">
                  <el-option label="一楼" value= "1"></el-option>
                  <el-option label="二楼" value= "2"></el-option>
                  <el-option label="三楼" value= "3"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="会议室容量" prop="roomCapacity" class="text-left">
              <el-col :span="9">
                <el-select v-model="meetingRoom.roomCapacity" placeholder="请选择可容纳的人数">
                  <el-option label="1 - 5 人"  value= "1"></el-option>
                  <el-option label="5 - 10 人" value= "2"></el-option>
                  <el-option label="10人以上"  value= "3"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="会议室配置" prop="roomConfig" class="text-left">
              <el-checkbox-group v-model="meetingRoom.roomConfig" class="text-left">
                <el-checkbox label="投影仪"></el-checkbox>
                <el-checkbox label="视频设备"></el-checkbox>
                <el-checkbox label="电话会议设备"></el-checkbox>
                <el-checkbox label="欢迎屏"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="会议室是否可用" prop="roomConfig" class="text-left">
              <el-switch
                v-model="meetingRoom.isUseful"
                on-text="是"
                off-text="否"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item class="m-t-5 text-left">
              <el-button type="primary" @click.prevent="submitForm('meetingRoom')" v-if="editType === 'edit'">修改</el-button>
              <el-button type="primary" @click.prevent="submitForm('meetingRoom')" v-if="editType === 'add'">新增</el-button>
              <el-button type="warning" @click.prevent="removeRoom('meetingRoom')" v-if="editType === 'edit'">移除</el-button>
              <el-button @click="resetForm('meetingRoom')" v-if="editType === 'add'">重置</el-button>
            </el-form-item>
          </el-form>
        </article>
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
        meetingRoom: {
          roomName: "",
          roomFloor: "",
          roomCapacity: "",
          roomConfig: [],
          isUseful: true,
        },
        rooms:[],
        activeList: -1,
        editType: 'add',
        meetingRoomRules : {
          roomName: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          roomFloor: [
            {validator: checkEmpty, trigger: 'blur'}
          ],
          roomCapacity: [
            {validator: checkEmpty, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.getRooms();
    },
    filters: {
      floorFilter(value) {
        switch (value) {
          case '1' : value = '一楼';break;
          case '2' : value = '二楼';break;
          case '3' : value = '三楼';break;
        }
        return value;
      }
    },
    methods: {
      addRoom() {
        this.$refs['meetingRoom'].resetFields();
        this.meetingRoom.isUseful = true;
        this.meetingRoom.roomConfig = [];
        this.editType = 'add';
        this.activeList = -1;
      },
      editRoom(room, index) {
        this.editType = 'edit';
        this.activeList = index;
        this.meetingRoom = {
          roomName: room.roomName,
          roomFloor: room.roomFloor,
          roomConfig: room.roomConfig,
          roomCapacity: room.roomCapacity,
          isUseful: room.isUseful,
        };
      },
      getRooms() {
        this.$http.get('api/admin/allRooms').then((dataData) => {
          this.rooms = dataData.body.data;
          this.rooms.forEach(item => {
            let roomConfig = [];
            if(item.roomConfigProjector) {roomConfig.push('投影仪')};
            if(item.roomConfigVideo) {roomConfig.push('视频设备')};
            if(item.roomConfigTelephone) {roomConfig.push('电话会议设备')};
            if(item.roomConfigBigScreen) {roomConfig.push('欢迎屏')};
            item.roomConfig = roomConfig;
          });
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let meetingRoom = {
              type: this.editType,
              roomName: this.meetingRoom.roomName,
              roomFloor: this.meetingRoom.roomFloor,
              roomCapacity: this.meetingRoom.roomCapacity,
              isUseful: this.meetingRoom.isUseful,
              roomConfigProjector : false,
              roomConfigVideo : false,
              roomConfigTelephone : false,
              roomConfigBigScreen : false,
            };
            if(this.meetingRoom.roomConfig) {
              this.meetingRoom.roomConfig.forEach(item => {
                if(item === '投影仪') {meetingRoom.roomConfigProjector = true}
                if(item === '视频设备') {meetingRoom.roomConfigVideo = true}
                if(item === '电话会议设备') {meetingRoom.roomConfigTelephone = true}
                if(item === '欢迎屏') {meetingRoom.roomConfigBigScreen = true}
              })
            }
            this.$http.post('api/admin/manageRoom',meetingRoom).then((backData) => {
              if(backData.body.status == '1'){
                this.$message({
                  message: backData.body.msg,
                  type: 'success'
                });
                this.editType = 'add';
                this.$refs[formName].resetFields();
                this.activeList = -1;
                this.getRooms();
              }else {
                this.$message.error(backData.body.msg);
              }
            })
          } else {
            return false;
          }
        });
      },
      removeRoom(formName) {
        this.$http.post('api/admin/manageRoom',{
          type: 'delete',
          roomName: this.meetingRoom.roomName,
          roomFloor: this.meetingRoom.roomFloor,
        }).then((backData) => {
          if(backData.body.status == '1'){
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.getRooms();
            this.editType = 'add';
            this.$refs[formName].resetFields();
            this.activeList = -1;
          }else {
            this.$message.error(backData.body.msg);
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .list-active:before{
    content: '';
    position:absolute;
    width:0;
    height:0;
    vertical-align: middle;
    border-top: 1rem solid #475669;
    border-right: 1rem solid transparent;
    left:0;
  }
  .addRoom{
    height:1.8rem !important;
    line-height:1.8rem !important;
    background-color: #888 !important;
    font-size: .7rem;
    color:#EEE;
  }
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
       background-color: rgba(239, 239, 239, .6);
       height:28rem;

      >article{
        flex:1;
        padding:2rem;
      }

      >aside {
        width:12rem;
        height:100%;
        overflow-y: auto;
        border-right:1px #AAA solid;

        ul li{
          position: relative;
          height:2.5rem;
          line-height:2.5rem;
          cursor: pointer;
        }

        li.title {
          background-color: #99A9BF;
          height:3rem;
          line-height: 3rem;
          color: #EEE;
        }

        li:not(.title):nth-of-type(even) {
          background-color: rgba(191, 191, 191, .4);
        }

        li:not(.title):nth-of-type(odd) {
          background-color: rgba(191, 191, 191, .2);
        }
      }
     }
    }
  }
</style>

