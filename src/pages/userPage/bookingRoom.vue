<template>
  <div id="bookingRoom">
    <el-dialog
      title="预定会议室"
      :visible.sync="dialogVisible"
      width="20%">
      <div style="min-height:13rem;" v-show="!showAlert">
        <p>您将预定</p>
        <transition name="show-info-1">
          <p v-show="dialogVisible" class="booking-info">{{selectedRoom.bookingDate}}</p>
        </transition>
        <transition name="show-info-2">
          <p v-show="dialogVisible" class="booking-info">{{selectedRoom.startTime}} - {{selectedRoom.endTime}}</p>
        </transition>
        <transition name="show-info-3">
          <p v-show="dialogVisible" class="booking-info">{{selectedRoom.roomFloor | roomFloorFilter}}</p>
        </transition>
        <transition name="show-info-4">
          <p v-show="dialogVisible" class="booking-info">{{selectedRoom.roomName}}会议室</p>
        </transition>
        <transition name="show-info-5">
          <p v-show="dialogVisible" class="booking-info m-t-1">
            <span slot="footer" class="dialog-footer m-t-2">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="success" @click="sureBooking">确 定</el-button>
            </span>
          </p>
        </transition>
      </div>
      <div v-show="showAlert">
        <p class="alert">
          会议室资源紧张，预定成功后请<span style="color: red;">务必在规定时间内</span>使用会议室
        </p>
        <p class="alert">
          谢谢您的配合！
        </p>
        <p class="m-t-2">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </p>

      </div>

    </el-dialog>
    <section class="p-b-3">
      <header>会议室预定</header>
      <article class="m-b-5 p-b-4">
        <ul class="list-none selection">
          <li>
            <el-col :span="3">
              <span>会议室楼层：</span>
            </el-col>
            <el-col :span="3" class="text-left">
              <el-select v-model="selectedFloor" placeholder="请选择">
                <el-option
                  v-for="item in floors"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <span>可容纳人数：</span>
            </el-col>
            <el-col :span="3" class="text-left">
              <el-select v-model="selectedCapacity" placeholder="请选择">
                <el-option
                  v-for="item in persons"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </li>
          <li>
            <el-col :span="3">
              <span>会议室名称：</span>
            </el-col>
            <el-col :span="9">
              <el-input v-model="roomName" placeholder="请输入会议室名称"></el-input>
            </el-col>
          </li>
          <li>
            <el-row>
              <el-col :span="3">
              <span>预定日期：</span>
              </el-col>
              <el-col :span="5" class="text-left">
                <el-date-picker
                  v-model="searchDate"
                  type="date"
                  placeholder="选择预定日期">
                </el-date-picker>
              </el-col>
              <!--<el-col :span="9" class="text-left">-->
                <!--<el-time-select-->
                  <!--v-model="startTime"-->
                  <!--:picker-options="{-->
                  <!--start: '09:00',-->
                  <!--step: '00:30',-->
                  <!--end: '18:00'-->
                <!--}"-->
                  <!--placeholder="起始时间">-->
                <!--</el-time-select>-->
                <!--<el-time-select-->
                  <!--v-model="endTime"-->
                  <!--:picker-options="{-->
                    <!--minTime: startTime,-->
                    <!--start: '09:00',-->
                    <!--step: '00:30',-->
                    <!--end: '18:00',-->
                  <!--}"-->
                  <!--placeholder="结束时间">-->
                <!--</el-time-select>-->
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col :span="3">
                <span>会议室配置：</span>
              </el-col>
              <el-col :span="10">
                <el-checkbox-group v-model="roomConfig" class="text-left">
                  <el-checkbox label="投影仪"></el-checkbox>
                  <el-checkbox label="视频设备"></el-checkbox>
                  <el-checkbox label="电话会议设备"></el-checkbox>
                  <el-checkbox label="欢迎屏"></el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" size="small" @click="getRooms">查询</el-button>
              </el-col>
            </el-row>
          </li>
          <li class="my-el-table">
            <el-table
              style="margin:0.5rem;width:98.5%"
              :data="bookingInfo"
              border
              height="250">
              <el-table-column
                class="text-center"
                fixed
                prop="roomName"
                label="会议室"
                width="150">
              </el-table-column>
              <el-table-column
                class="text-center"
                v-for="time in times"
                :label= time.label
                :prop= time.prop
                :key= time.label
                width="80">
                <template scope="scope">
                  <div class="has-booked" v-show="scope.row[scope.column.property]['booking']">已预定</div>
                  <div class="not-booked" v-show="scope.row[scope.column.property]['selected']">
                    <span style="width:30px;height:30px;" class="el-icon-circle-check"></span>
                  </div>
                  <div class="not-booked" v-show="!scope.row[scope.column.property]['booking'] && !scope.row[scope.column.property]['selected']" @click="selectRoom(scope)"></div>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template scope="scope">
                  <el-button @click="bookingRoom(scope.row)" type="success" size="small" :disabled="scope.row.selectedDisable">预定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        roomName: '',             // 查询的会议室名称
        searchDate: new Date(),           // 查询的会议室预定情况的日期
        startTime: '',            // 预定会议室起始时间
        endTime: '',              // 预定会议室结束时间
        selectedFloor: "0",       // 查询的会议室楼层
        selectedCapacity: "0",    // 查询的会议室容量
        roomConfig: [],           // 查询的会议室配置
        dialogVisible: false,    //  控制弹框的显示
        showAlert: true,         //  控制弹框的内容
        selectedRoom:{},         // 预定会议室的信息
        bookingInfo: [],         // 查询会议室预定情况的结果
        floors: [{
          value: "0",
          label: '全部'
        }, {
          value: "1",
          label: '一楼'
        }, {
          value: "2",
          label: '二楼'
        }, {
          value: "3",
          label: '三楼'
        }],
        persons: [{
          value: "0",
          label: '全部'
        }, {
          value: "1",
          label: '1 - 5 人'
        }, {
          value: "2",
          label: '5 - 10 人'
        }, {
          value: "3",
          label: '10人以上'
        }],
        times: [
          {label:'9:00', prop:'9:00'},{label:'9:30', prop:'9:30'},{label:'10:00', prop:'10:00'},{label:'10:30', prop:'10:30'},{label:'11:00', prop:'11:00'},{label:'11:30', prop:'11:30'},{label:'12:00', prop:'12:00'},{label:'12:30', prop:'12:30'},{label:'13:00', prop:'13:00'},{label:'13:30', prop:'13:30'},{label:'14:00', prop:'14:00'},{label:'14:30', prop:'14:30'},{label:'15:00', prop:'15:00'},{label:'15:30', prop:'15:30'},{label:'16:00', prop:'16:00'},{label:'16:30', prop:'16:30'},{label:'17:00', prop:'17:00'},{label:'17:30', prop:'17:30'},{label:'18:00', prop:'18:00'}],
        timeSteps: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"],
      };
    },
    created() {
      this.getRooms();
    },
    mounted(){
      this.dialogVisible = true;
    },
    methods: {
      getRooms() {
        this.$http.post('api/company/rooms', {
          roomName: this.roomName,
          roomFloor: this.selectedFloor,
          roomCapacity: this.selectedCapacity,
          roomConfig: this.roomConfig,
          bookingDate: this.searchDate.toLocaleString().substring(0, 10),
        }).then(backData => {
          if(backData.body.status == '1'){
            const self = this;
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.bookingInfo = backData.body.data;
            this.bookingInfo.forEach(item => {
              item.selectedTimes = [];
              self.timeSteps.forEach(time => {
                item[time] = {};
                item[time].selected = false;                               // vue检测不到通过索引改变数据和数组长度的变化
                item[time].booking = false;
              })
              item.bookingTime.forEach(time => {
                item[time].booking = true;
              })
              item.selectedDisable = true;
            })
          }else {
            this.$message.error(backData.body.msg);
          }
        })
      },
      sureBooking() {
        this.$http.post('api/company/bookingRoom',this.selectedRoom).then(backData => {
          if(backData.body.status == '1') {
            this.$message({
              message: backData.body.msg,
              type: 'success'
            });
            this.dialogVisible = false;
            this.getRooms();
          }else {
            this.$message.error(backData.body.msg);
          }
        })
      },
      bookingRoom(row) {
        if(this.searchDate) {
          this.selectedRoom = {
            roomId: row.roomId,
            roomName: row.roomName,
            roomFloor: row.roomFloor,
            startTime: this.timeCompare(row.selectedTimes)[0],
            endTime: this.timeCompare(row.selectedTimes)[1],
            bookingDate: this.searchDate.toLocaleString().substring(0, 10),
          }
          this.dialogVisible = true;
          this.showAlert = false;
        } else{
          this.$message.error('请选择预定日期！');
        }
      },
      timeCompare(arr, type) {   // type: 排序方式， 默认false, 从小到大
        var type = type ? type : false;
        var num0 = Number(arr[0].replace(':', ''));
        var num1 = Number(arr[1].replace(':', ''));
        if(!type) {
          if(num0 > num1) {
            return [arr[1], arr[0]];
          } else if(num0 < num1) {
            return [arr[0], arr[1]];
          }
        }else {
          if(num0 > num1) {
            return [arr[0], arr[1]];
          } else if(num0 < num1) {
            return [arr[1], arr[0]];
          }
        }
      },
      selectRoom(data) {
        if(data.row.selectedTimes.length === 0) {
          data.row.selectedTimes.unshift(data.column.property);
          let newData = this.bookingInfo[data.$index];
          newData[data.column.property]['selected'] = true;         // 渲染是有条件的
          this.bookingInfo.splice(data.$index, 1, newData);
        }else if(data.row.selectedTimes.length === 1) {
          data.row.selectedDisable = false;
          data.row.selectedTimes.unshift(data.column.property);
          let newData = this.bookingInfo[data.$index];
          newData[data.column.property]['selected'] = true;         // 渲染是有条件的
          this.bookingInfo.splice(data.$index, 1, newData);
          var selectedTimes = this.timeCompare(data.row.selectedTimes);
          this.selectedRoom = selectedTimes;
        }else{
          data.row.selectedDisable = false;
          data.row.selectedTimes.unshift(data.column.property);
          data.row[data.column.property]['selected'] = true;
          data.row[data.row.selectedTimes.pop()]['selected'] = false;

          let newData = this.bookingInfo[data.$index];
          newData[data.column.property]['selected'] = true;         // 渲染是有条件的
          newData[data.row.selectedTimes.pop()]['selected'] = false;
          this.bookingInfo.splice(data.$index, 1, newData);
          var selectedTimes = this.timeCompare(data.row.selectedTimes);
          this.selectedRoom = selectedTimes;
        }
        console.log(data);
      }
    },
    filters: {
      roomFloorFilter(input) {
        let output;
        switch (input) {
          case '1': output = '一楼';break;
          case '2': output = '二楼';break;
          case '3': output = '三楼';break;
        }
        return output;
      }
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .booking-info{
    height:2.5rem;
    line-height: 2.5rem;
    font-size:1rem;
    font-weight: bolder;
    opacity:1;
  }

  .alert{
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .show-info-1-enter-active{
    line-height:2.5rem;
    opacity:1;
    display: none;
    transition: all .5s linear 0s;
  }

  .show-info-1-enter{
    display: block;
    line-height:0rem;
    opacity:0;
  }

  .show-info-2-enter-active{
    line-height:2.5rem;
    opacity:1;
    transition: all .5s linear 1s;
  }

  .show-info-2-enter{
    line-height:0rem;
    opacity:0;
  }

  .show-info-3-enter-active{
    line-height:2.5rem;
    opacity:1;
    transition: all .5s linear 2s;
  }

  .show-info-3-enter{
    line-height:0rem;
    opacity:0;
  }

  .show-info-4-enter-active{
    line-height:2.5rem;
    opacity:1;
    transition: all .5s linear 3s;
  }

  .show-info-4-enter{
    line-height:0rem;
    opacity:0;
  }

  .show-info-5-enter-active{
    opacity:1;
    transition: all .5s linear 4s;
  }

  .show-info-5-enter{
    opacity:0;
  }

  .has-booked{
    position: relative;
    width:100%;
    height:40px;
    line-height:40px;
    color:#666;
    background-color: #adbbbf;
  }

  .not-booked{
    position: relative;
    width:100%;
    height:40px;
    line-height: 40px;
  }

  .not-booked:hover{
    background-color: #DDD;
  }

  #bookingRoom {
    display: flex;
    min-height: 30rem;
    margin: -.5rem .5rem 1rem .5rem;

    >section {
       flex: 1;
       width:0;
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
      }
    }
  }

  ul.selection{
    margin-top:1rem;
    width:100%;
  }

  ul.selection li{
    width:100%;
    height:2rem;
    line-height:2rem;
    padding:.3rem 0;
  }
</style>
