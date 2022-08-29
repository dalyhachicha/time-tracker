<template>
    <td class="col_1" v-if="this.endTime.length > 0"><h4>Period {{ids}}</h4></td>
    <td class="col_1" v-else><h4>Current Period</h4></td>

    <td class="col_2" v-if="this.endTime.length > 0">{{this.startTime}} - {{this.endTime}}</td>
    <td class="col_2" v-else>Started {{this.startTime}}</td>
    <td class="col_3">
        <span style="font-weight: 900">{{hour}}:{{min}}</span>:{{sec}}
    </td>
</template>
<script>

    export default {
         data(){
                return{
                    timerMinutes: 0,
                    timerSeconds: 0,
                    timeHours:0,
                    timerState : 'Stopped',
                    isTimer:false
                }

            },
            props:{
                totalHours:{
                    type:Number,
                    default:0
                },
                totalMinutes: {
                    type: Number,
                    default: 0
                },
                totalSeconds: {
                    type: Number,
                    default: 0
                },
                estTimer:{
                    type:Boolean,
                    default:false

                },
                id:{
                    type: Number,
                    default: -1
                },
                startTime:{
                    type: String,
                    default: -1
                },endTime:{
                    type: String,
                    default: -1
                }
            },
            beforeMount(){
                this.timerMinutes = this.totalMinutes;
                this.timerSeconds = this.totalSeconds;
                this.timeHours=this.totalHours;
                this.isTimer=this.estTimer;
                if(this.isTimer)
   
                   { this.start();}
                
 },
            methods:{
                start(){
                    this._tick();
                    this.ticking = setInterval(this._tick, 1000);
                    this.timerState = 'Running';
                },
                pause(){
                    clearInterval(this.ticking);
                    this.timerState = 'Paused';
                },
                reset(){
                    this.timerMinutes = this.totalMinutes;
                    this.timerSeconds = this.totalSeconds;
                    clearInterval(this.ticking);
                    this.timerState = 'Stopped';
                },
                loadTimers(){

                },
                saveTimer(){

                },

                _tick(){
                    if(this.timerSeconds !== 59){
                        this.timerSeconds++;
                        return
                    }
                    else{
                        this.timerSeconds=0;
                        if(this.timerMinutes!=59)
                            this.timerMinutes++;
                        else{
                            this.timerMinutes=0;
                            this.timeHours++;
                        }
                       return;
                    }

                    
                }
            },
            computed: {
                min() {
                    if(this.timerMinutes < 10){
                        return '0'+this.timerMinutes;
                    }
                    return this.timerMinutes;
                },
                sec() {
                    if(this.timerSeconds < 10){
                        return '0'+this.timerSeconds;
                    }
                    return this.timerSeconds;
                },
                hour() {
                    
                    return this.timeHours;
                },
                ids(){
                    return this.id;
                },
                isTimerRunning(){
                    return this.timerState === 'Stopped';
                },
                isTimerPaused(){
                    return this.timerState == 'Paused';
                }
            }

    }   
</script>
<style lang="scss">
    $blue-color: #415c73;
    $grey-color: #415c73;

.col_1 {
  width: 500px;
}
.col_2 {
  font-weight: 900;
  font-size: 14px;
  line-height: 16px;
  color: $grey-color;
}
.col_3 {
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  color: $blue-color;
}
</style>