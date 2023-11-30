import React from 'react';
import './Ready.css';
import GestureTime from '../GestureTime/GestureTime';
import { createRoot } from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import Configurations from '../Configurations/Configurations';
import CsvExportor from "csv-exportor";


class Ready extends React.Component {
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
        bodyElt.style.backgroundColor = "#ff8263";
        }

      

    componentDidMount = () => {
        this.countDown(this.props.pauseTime+1,this.waitTimeStateChange,this.linkTo);

        this.timer = setInterval(function () {
            const date= new Date();
            const systemtime= date.getTime()
            this.setState({dataframe:[...this.state.dataframe,
            {gaze_timestamp_unix:systemtime/1000,process:this.props.gestures[0]+'_Ready'+this.props.remainTime},
            {gaze_timestamp_unix:(systemtime+33)/1000,process:this.props.gestures[0]+'_Ready'+this.props.remainTime},
            {gaze_timestamp_unix:(systemtime+66)/1000,process:this.props.gestures[0]+'_Ready'+this.props.remainTime}
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
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(<GestureTime gestureTime={this.props.gestureTime} gestureFrequency={this.props.gestureFrequency} pauseTime={this.props.pauseTime} 
                    gesturesNumber={this.props.gesturesNumber} gestures={this.props.gestures} remainTime={this.props.remainTime} df={this.state.dataframe}/>);
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
        //console.log(1,this.props.gestures, this.props.gesturesNumber)
        
        return (
        <div  className="Ready">
            <h1>Ready to gesture {this.props.gestures[0]}!</h1>
            <h2>{this.state.time}</h2>
            <Button className="pauseBtn" onClick={this.pauseBtn}>Pause!</Button>
            <Button className="stopBtn" onClick={this.stop}>Stop and go back!</Button>
        </div>
            
        );
    
    }
}

export default Ready;