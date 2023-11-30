import React from 'react';
import './GestureTime.css';
import { createRoot } from 'react-dom/client';
import Ready from '../Ready/Ready';
import Videos from '../Videos/Videos';
import Configurations from '../Configurations/Configurations';
import Button from 'react-bootstrap/Button';
import CsvExportor from "csv-exportor";


class GestureTime extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time:0,
            pause:false,
            stop:false,
            dataframe:this.props.df,
        };
      }
      componentWillMount = () => {
        const bodyElt = document.querySelector("body");
        bodyElt.style.backgroundColor = "#3afe64";
    }

    componentDidMount = () => {
        this.countDown(this.props.gestureTime+1,this.waitTimeStateChange,this.linkTo);
        this.timer = setInterval(function () {
            const date= new Date();
            const systemtime= date.getTime()
            this.setState({dataframe:[...this.state.dataframe,
            {gaze_timestamp_unix:systemtime/1000,process:this.props.gestures[0]+'_GestureTime'+this.props.remainTime},
            {gaze_timestamp_unix:(systemtime+33)/1000,process:this.props.gestures[0]+'_GestureTime'+this.props.remainTime},
            {gaze_timestamp_unix:(systemtime+66)/1000,process:this.props.gestures[0]+'_GestureTime'+this.props.remainTime}
          ]})
        }.bind(this), 100);
    }

    countDown = (waitTime,doSomethingDuringCountDown,doSomethingAfterCountDown) => {
        if (waitTime > 0) {
            waitTime--;
            if(this.state.pause) {
               waitTime++;
            }
            if(this.state.stop) {
                const container = document.getElementById('root');
                const root = createRoot(container); 
                const headers =["gaze_timestamp_unix","process"];
                CsvExportor.downloadCsv(
                    this.state.dataframe,
                    { header:headers},
                    "instruction.csv"
                );
                root.render(<Configurations />);
                return;
            }
            if(doSomethingDuringCountDown){
                doSomethingDuringCountDown(waitTime)
            } 
        } else {
        if(doSomethingAfterCountDown){
         doSomethingAfterCountDown()
        } 
        return;
       } 
        setTimeout(() => {
         this.countDown(waitTime,doSomethingDuringCountDown,doSomethingAfterCountDown);
        }, 1000);
      }

    waitTimeStateChange = (time) => {
        this.setState({
         time: time,
        })
       }
    linkTo = () => {
        let newGestures=[];
        let newGesturesNumber=0;
        if(this.props.remainTime>0){
            const container = document.getElementById('root');
            const root = createRoot(container); 
            root.render(<Ready gestureTime={this.props.gestureTime} gestureFrequency={this.props.gestureFrequency} pauseTime={this.props.pauseTime} 
                    gesturesNumber={this.props.gesturesNumber} gestures={this.props.gestures} remainTime={this.props.remainTime-1} df={this.state.dataframe}/>);

        }else {
                if(this.props.gestures.length === 1){
                    const container = document.getElementById('root');
                    const root = createRoot(container); 
                    //root.render(<Configurations />);
                    root.render(<Videos gestureTime={this.props.gestureTime} gestureFrequency={this.props.gestureFrequency} pauseTime={this.props.pauseTime} 
                        gesturesNumber={newGesturesNumber} gestures={newGestures} remainTime={this.props.gestureFrequency-1} df={this.state.dataframe}/>); 
                }else{
                for(let i=1;i<this.props.gestures.length;i++){
                    newGestures=[...newGestures,this.props.gestures[i]];
                }
                newGesturesNumber=this.props.gesturesNumber-1;
                const container = document.getElementById('root');
                const root = createRoot(container); 
                root.render(<Videos gestureTime={this.props.gestureTime} gestureFrequency={this.props.gestureFrequency} pauseTime={this.props.pauseTime} 
                    gesturesNumber={newGesturesNumber} gestures={newGestures} remainTime={this.props.gestureFrequency-1} df={this.state.dataframe}/>); 
                }  

        }
    }  

    pauseBtn = () => {
        
        this.setState({
            pause: !this.state.pause,
           })
        
    }

    stop = () => {
        this.setState({
            stop: true,
           })
    }
    
    render() {
        //console.log(2,this.props.gestures, this.props.gesturesNumber)
        return (
        <div className="gestureTime">
            <h1>Gesture {this.props.gestures[0]}！ (still remain {this.props.remainTime} times) </h1>
            <h2>{this.state.time}</h2>
            <Button className="pauseBtn" onClick={this.pauseBtn}>Pause!</Button>
            <Button className="stopBtn" onClick={this.stop}>Stop and go back!</Button>
            </div>
            
        );
    
    }
}

export default GestureTime;