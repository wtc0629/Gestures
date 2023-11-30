import React from 'react';
import './Configurations.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Videos from '../Videos/Videos';
import { createRoot } from 'react-dom/client';
import "../../../node_modules/video-react/dist/video-react.css"; 

class Configurations extends React.Component {
    state={
      dataframe:[],
      gestureTime:10,
      gestureFrequency:1,
      pauseTime:5,
      gesturesNumber:11,
      //gestures:["horizontally fast"],
      gestures:["horizontally","horizontally fast","vertically","vertically fast","near to far","near to far fast","square","square fast","left circle (anticlockwise)","right circle (clockwise)","large right circle (clockwise)"],
    }

    componentWillMount = () => {
      const shufflearray= this.shuffle(this.state.gestures)
       this.setState({gestures:shufflearray})
       const bodyElt = document.querySelector("body");
        bodyElt.style.backgroundColor = "white";
  }

    changeGestureTime1 = (event) => {
        this.setState({
            gestureTime: parseInt(event.target.value),
        });
    };
    changeGestureTime2 = (event) => {
      this.setState({
          gestureTime: Math.round(event.target.value*3/10),
      });
    };
    changeGestureFrequency1 = (event) => {
        this.setState({
            gestureFrequency: parseInt(event.target.value),
        });
    };
    changeGestureFrequency2 = (event) => {
      this.setState({
          gestureFrequency: Math.round(event.target.value/10),
      });
    };
    changePauseTime1 = (event) => {
        this.setState({
          pauseTime: parseInt(event.target.value),
        });
    };
    changePauseTime2 = (event) => {
      this.setState({
        pauseTime: Math.round(event.target.value/10),
      });
    };
    startCheck = () => {
       // if(this.state.gestureTime<5) {
      //    alert("The gesture time you choose is too short!");
       //   return;
       // }
        if(this.state.gestureTime===0 || this.state.gestureFrequency===0 || this.state.pauseTime===0) {
          alert("You can't use configuration with 0!");
          return;
        }
        //this.exportCsv();
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(<Videos gestureTime={this.state.gestureTime} gestureFrequency={this.state.gestureFrequency} pauseTime={this.state.pauseTime}
        gesturesNumber={this.state.gesturesNumber} gestures={this.state.gestures} remainTime={this.state.gestureFrequency-1} df={this.state.dataframe}/>);
    };
    exportCsv = () => {
      /** 
      const csvData = [{gestureTime:this.state.gestureTime,gestureFrequency:this.state.gestureFrequency,pauseTime:this.state.pauseTime,gestures:this.state.gestures}];
      const headers =["Gesture time","Gesture frequency","Pause time","Chosen gestures"];
      CsvExportor.downloadCsv(
        csvData,
        { header:headers},
        "Configurations.csv"
      );
      
       
      const headers =["gaze_timestamp_unix","process"];
      CsvExportor.downloadCsv(
        this.state.dataframe,
        { header:headers},
        "test.csv"
      );*/

    };
    timetest = () => {
      console.log(this.state.dataframe)
      console.log(this.state.dataframe.length)
      console.log(this.state.gestures[0]+'video')
     
    };

    shuffle = (array) => { 
      return array.sort(() => Math.random() - 0.5); 
    }; 
  
    
    render() {
      
       //const isStart = this.state.startFlag;
        return (
            <div>
            
            
            <h1>Eye Tracking Instruction</h1>
            <h3>In the following steps, some configurations will be set up.</h3>
            <h3>There are 11 kinds of gestures need to be completed.</h3>
            <h3>A demo video will be played automatically for every gesture.</h3>
            <h3>Then comes the ready and data collecting process with countdowns. (As far as possibly keep stable smooth gaze on gestures)</h3>
            <h3>After all gestures are completed, an example website and video can be read and watched for different gaze data.</h3>
            <Form.Group className="time1" controlId="time1.control">
              <Form.Label className="label1">How long each gesture needs?(second)</Form.Label>
              <br />
              <Form.Control type="number" placeholder="10" onChange={this.changeGestureTime1} value={this.state.gestureTime} />

              <Form.Range onChange={this.changeGestureTime2} value={this.state.gestureTime * 10 / 3} />
            </Form.Group>

            <Form.Group className="time2" controlId="time2.control">
              <Form.Label>How many times will each gesture repeat?</Form.Label>
              <br />
              <Form.Control type="number" placeholder="1" onChange={this.changeGestureFrequency1} value={this.state.gestureFrequency} />

              <Form.Range onChange={this.changeGestureFrequency2} value={this.state.gestureFrequency * 10} />
            </Form.Group>

            <Form.Group className="time3" controlId="time3.control">
              <Form.Label>How long is the pause time?(second)</Form.Label>
              <br />
              <Form.Control type="number" placeholder="5" onChange={this.changePauseTime1} value={this.state.pauseTime} />

              <Form.Range onChange={this.changePauseTime2} value={this.state.pauseTime * 10} />
            </Form.Group>
          
            
            <Button className="startBtn" onClick={this.startCheck}>Start!</Button>
            
            </div>
          
    );
    
    }
}

export default Configurations;
/* 
<Button className="startBtn" onClick={this.timetest}>Time</Button>
<ControlBar autoHide={false} disableDefaultControls={false}>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton /></ControlBar>
              */