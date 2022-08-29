<template>
 <section class="header">
        <div class="time">{{todayDate}}</div>
        <div class="ui">
          <button class="stopbtn" @click="arreter" :disabled="!isCurrent">
            <div class="stopicon"></div>
            <span>Stop</span>
          </button>
          <button class="startbtn" @click="demarrer" :disabled="isCurrent">
            <img class="starticon" src="./assets/Vector.png" />
            <span>Start new</span>
          </button>
          <span class="hour"
            ><span style="font-weight: 900">{{totalHours}}:{{totalMinutes}}</span>:{{totalSeconds}}</span
          >
        </div>
  </section>
      <section class="tab_sec">
        <table>
          <tbody>
            <tr v-if="isCurrent==true" >              
              <TimerRow ref="courant" :total-hours="0" :total-minutes="0" :total-seconds="0" :estTimer="true" :startTime="this.startFormated"></TimerRow>
            </tr>
            <tr v-for="(item, index) in items" :key="index">              
              <TimerRow :total-hours=item.h :total-minutes=item.m :total-seconds=item.s :id=item.id :startTime=item.startTime.slice(11,-8) :endTime=item.endTime.slice(11,-8)></TimerRow>
            </tr>
          
          </tbody>
          <tfoot class="footer" v-if="items.length>0">
            <tr style="border: none">
              <td style="padding:1.5rem"></td>
              <td style="padding:1.5rem">
                <span
                  style="
                    font-weight: 900;
                    color: #6a7480;
                    font-size: 25px;
                    margin-left: 3rem;
                  "
                  >Total</span
                >
              </td>
              <td style="padding:1.5rem">
                <div class="footer_total" >
                  <span style="font-weight: 900">{{totalHours}}:{{totalMinutes}}</span>:{{totalSeconds}}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
</template>

<script>
import TimerRow from './components/TimerRow.vue'
import axios from 'axios'



export default {
  name: 'App',
  components: {
    TimerRow
},
data() {
  return {
    isCurrent:false,
    startFormated: new Date(),
    start:new Date(),
    end:new Date(),
    totalSeconds: 0,
    totalMinutes: 0,
    totalHours: 0,
    todayDate: new Date().toLocaleDateString("en-us", {weekday:"long", month:"short", day:"2-digit"}),
    items: []
  }
},
beforeMount(){
  this.getData().then((data)=>{
    this.items=data
  })
},
methods: {
  async getData(){
  let res = await axios.get('http://localhost:3000/api/timers')
  let data = res.data
  data.forEach(element => {
    
  element["h"] =parseInt(this.calcDiff(element["startTime"],element["endTime"])[0])
  element["m"] = parseInt(this.calcDiff(element["startTime"],element["endTime"])[1])
  element["s"] = parseInt(this.calcDiff(element["startTime"],element["endTime"])[2])
  this.totalSeconds += element["s"]
  this.totalMinutes += element["m"]
  this.totalHours += element["h"]
  if (this.totalSeconds>=60){
    this.totalSeconds -= 60
    this.totalMinutes += 1
  }
  if (this.totalMinutes>=60){
    this.totalMinutes -= 60
    this.totalHours += 1
  }
  });
  return data
},
calcDiff(startTime,endTime){
    var time = new Date(endTime).getTime() - new Date(startTime).getTime()
    time = time /1000
    let hours = Math.floor(time / 3600);
    time %= 3600;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return [hours,minutes,seconds]
},

demarrer(){
    this.start=new Date();
    this.startFormated = this.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    this.isCurrent=true;
  },
  
arreter()
  {
    this.$refs.courant.pause();
    this.end=new Date();
    axios.post('http://localhost:3000/api/timers',{startTime:this.start,endTime:this.end}).then(()=>{
      location.reload(true)
    })
  }
},
}
</script>

<style lang="sass">
*
  box-sizing: border-box
  padding: 0
  margin: 0
  scroll-behavior: smooth
  transition: all 0.5s ease
  font-family: "Roboto", sans-serif

body
  margin: 5rem
  padding: 4rem

.header
  display: flex
  justify-content: space-around

.time
  font-weight: 900
  font-size: 30px
  line-height: 35.16px
  color: #415c73

.ui
  display: flex
  align-items: center
  width: 300px

.stopbtn
  height: 38px
  border: 1px solid #cc5252
  border-radius: 5px
  display: flex
  width: 86px
  align-items: center
  justify-content: center
  color: #cc5252
  font-weight: 600
  font-size: 16px
  background: transparent
  margin-right: 0.6rem
  cursor: pointer

.stopicon
  width: 12px
  height: 12px
  margin-right: 0.3rem
  background: #cc5252

.startbtn
  border: 1px solid #60b669
  border-radius: 5px
  height: 38px
  width: 126px
  font-weight: 600
  font-size: 16px
  background: transparent
  margin-right: 0.6rem
  color: #60b669
  display: flex
  align-items: center
  justify-content: center
  margin-right: 1rem
  cursor: pointer

.starticon
  margin-right: 0.3rem

.hour
  color: #60b669
  font-size: 25px

.tab_sec
  display: flex
  justify-content: center
  margin-top: 4rem

  table
    width: 895px
    border-collapse: collapse

    tr
      border-top: 1px solid #e8e8e8
      border-bottom: 1px solid #e8e8e8

      td
        padding: 2rem

.col_1
  width: 500px

.col_2
  font-weight: 900
  font-size: 14px
  line-height: 16px
  color: #6b7581

.col_3
  font-weight: 500
  font-size: 25px
  line-height: 29px
  color: #415c73

.tab_sec table tr
  &:first-child
    border-top: 1px solid #60b669
    border-bottom: 1px solid #60b669

  &:last-child td
    padding-bottom: 6rem

  &:first-child .col_3
    font-weight: 500
    font-size: 25px
    line-height: 29px
    color: #60b669

.footer_total
  font-weight: 500
  font-size: 25px
  line-height: 29px
  color: #60b669

.tab_sec table tr h4
  color: #6d7783
  font-weight: 900
  font-size: 16px
  line-height: 19px

.total
  display: flex
  justify-content: end
  margin: 2rem 12rem 0 0
  border-bottom: 1px solid #e8e8e8
  align-items: center
  font-weight: 500
  font-size: 25px
  line-height: 29px
  color: #60b669

.footer
  border-bottom: 1px solid #e8e8e8

tfoot
  padding: 0
</style>
