import React from 'react';
import GestureTime from '../GestureTime/GestureTime';
import { createRoot } from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import Configurations from '../Configurations/Configurations';


class Ready extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            time:0,
            pause:false,
            stop:false,
        };
      }
    componentDidMount = () => {
        this.countDown(this.props.pauseTime+1,this.waitTimeStateChange,this.linkTo);
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
                    gesturesNumber={this.props.gesturesNumber} gestures={this.props.gestures} remainTime={this.props.remainTime}/>);
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
        
        return (
        <div>
            <h1>Ready to gesture {this.props.gestures[0]}!</h1>
            <h1>{this.state.time}</h1>
            <Button onClick={this.pauseBtn}>Pause!</Button>
            <Button onClick={this.stop}>Stop and go back!</Button>
        </div>
            
        );
    
    }
}

export default Ready;