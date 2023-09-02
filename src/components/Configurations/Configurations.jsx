import React, { Component, Fragment } from 'react';
import './Configurations.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CsvExportor from "csv-exportor";
import Ready from '../Ready/Ready';
import { createRoot } from 'react-dom/client';
import examplepicture from '../../videos/examplevideo.png';
import horizontalpath from '../../videos/horizontal.mp4';
import fasthorizontalpath from '../../videos/fasthorizontal.mp4';
import verticalpath from '../../videos/vertical.mp4';
import fastverticalpath from '../../videos/fastVertical.mp4';
import farandnearpath from '../../videos/farandnear.mp4';
import fastNearpath from '../../videos/fastNear.mp4';
import starpath from '../../videos/star.mp4';
import faststarpath from '../../videos/fastStar.mp4';
import smallcirclepath from '../../videos/smallcircle.mp4';
import bigcirclepath from '../../videos/bigcircle.mp4';
import {
  Player,
  ControlBar,
  PlayToggle, 
  ReplayControl, 
  ForwardControl,  
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,  
  VolumeMenuButton
} from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"; 


class Configurations extends React.Component {


    state={
      gestureTime:10,
      gestureFrequency:1,
      pauseTime:5,
      horizontal:false,fastHorizontal:false,vertical:false,neartofar:false,fastVertical:false,fastNeartofar:false,
      fastStar:false,star:false,smallCircle:false,largeCircle:false,
      gesturesNumber:0,
      gestures:["horizontally","horizontally fast","vertically","vertically fast","near to far","near to far fast","square","square fast","left circle","right circle","large circle"],
      header:["gestureTime","gestureFrequency","pauseTime","gestures"]
    }
  
    componentWillMount = () => {
      const shufflearray= this.shuffle(this.state.gestures)
       console.log(shufflearray)
       console.log(this.state) 
       this.setState({gestures:shufflearray})
       console.log(this.state) 
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
    choosehorizontal = (event) => {
      this.setState({
        horizontal: event.target.checked,
      });
    };
    choosefastHorizontal = (event) => {
      this.setState({
        fastHorizontal: event.target.checked,
      });
    };
    choosevertical = (event) => {
      this.setState({
        vertical: event.target.checked,
      });
    };
    chooseneartofar = (event) => {
      this.setState({
        neartofar: event.target.checked,
      });
    };
    choosefastVertical = (event) => {
      this.setState({
        fastVertical: event.target.checked,
      });
    };
    choosefastNeartofar = (event) => {
      this.setState({
        fastNeartofar: event.target.checked,
      });
    };
    choosefastStar = (event) => {
      this.setState({
        fastStar: event.target.checked,
      });
    };
    choosestar = (event) => {
      this.setState({
        star: event.target.checked,
      });
    };
    choosesmallCircle = (event) => {
      this.setState({
        smallCircle: event.target.checked,
      });
    };
    chooselargeCircle = (event) => {
      this.setState({
        largeCircle: event.target.checked,
      });
    };
    chooseAll = () => {
      this.setState({
        horizontal:!this.state.horizontal,fastHorizontal:!this.state.fastHorizontal,vertical:!this.state.vertical,neartofar:!this.state.neartofar,
        fastVertical:!this.state.fastVertical,fastNeartofar:!this.state.fastNeartofar,fastStar:!this.state.fastStar,star:!this.state.star,
        smallCircle:!this.state.smallCircle,largeCircle:!this.state.largeCircle
      });
    };
    startCheck = () => {
        if(this.state.horizontal) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"horizontally"];}
        if(this.state.fastHorizontal) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"horizontally fast"];}
        if(this.state.vertical) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"vertically"];}
        if(this.state.neartofar) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"near to far"];}
        if(this.state.fastVertical) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"vertically fast"];}
        if(this.state.fastNeartofar) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"near to far fast"];}
        if(this.state.fastStar) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"star fast"];}
        if(this.state.star) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"star"];}
        if(this.state.smallCircle) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"small circle"];}
        if(this.state.largeCircle) {this.state.gesturesNumber++;this.state.gestures=[...this.state.gestures,"large circle"];}
        if(this.state.gestureTime<5) {
          alert("The gesture time you choose is too short!");
          return;
        }
        if(this.state.gestureTime===0 || this.state.gestureFrequency===0 || this.state.pauseTime===0) {
          alert("You can't use configuration with 0!");
          return;
        }
        if(this.state.gesturesNumber===0) {
          alert("You must choose at least 1 gesture!");
          return;
        }
        if(this.state.gestures !== []){
                this.exportCsv();
                const container = document.getElementById('root');
                  const root = createRoot(container); 
                  root.render(<Ready gestureTime={this.state.gestureTime} gestureFrequency={this.state.gestureFrequency} pauseTime={this.state.pauseTime}
                    gesturesNumber={this.state.gesturesNumber} gestures={this.state.gestures} remainTime={this.state.gestureFrequency-1}/>);
        }
    };
    exportCsv = () => {
      const csvData = [{gestureTime:this.state.gestureTime,gestureFrequency:this.state.gestureFrequency,pauseTime:this.state.pauseTime,gestures:this.state.gestures}];
      const headers =["Gesture time","Gesture frequency","Pause time","Chosen gestures"];
      CsvExportor.downloadCsv(
        csvData,
        { header:headers},
        "Configurations.csv"
      );
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
            <h3>Then comes the ready and data collecting process with countdowns.</h3>
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


            <Form.Check inline label="Horizontal move" name="horizontal" type="checkbox" id="horizontal" checked={this.state.horizontal} onChange={this.choosehorizontal} />
            <div>
                <video src={horizontalpath} autoPlay muted className="videos" ></video>            
            </div>
           
            <Form.Check inline label="Fast horizontal move" name="fastHorizontal" type="checkbox" id="fastHorizontal" checked={this.state.fastHorizontal} onChange={this.choosefastHorizontal} />
            
              
            <Form.Check inline label="Vertical move" name="vertical" type="checkbox" id="vertical" checked={this.state.vertical} onChange={this.choosevertical} />
            
            <Form.Check inline label="Fast vertical move" name="fastVertical" type="checkbox" id="fastVertical" checked={this.state.fastVertical} onChange={this.choosefastVertical} />
            
            <Form.Check inline label="Near to far move" name="neartofar" type="checkbox" id="neartofar" checked={this.state.neartofar} onChange={this.chooseneartofar} />
            
            <Form.Check inline label="Fast near to far move" name="fastNeartofar" type="checkbox" id="fastNeartofar" checked={this.state.fastNeartofar} onChange={this.choosefastNeartofar} />
            
            <Form.Check inline label="Star" name="star" type="checkbox" id="star" checked={this.state.star} onChange={this.choosestar} />
            
            <Form.Check inline label="Fast star" name="fastStar" type="checkbox" id="fastStar" checked={this.state.fastStar} onChange={this.choosefastStar} />
            
            <Form.Check inline label="Small circle" name="smallCircle" type="checkbox" id="smallCircle" checked={this.state.smallCircle} onChange={this.choosesmallCircle} />
            
            <Form.Check inline label="Large circle" name="largeCircle" type="checkbox" id="largeCircle" checked={this.state.largeCircle} onChange={this.chooselargeCircle} />
            
            <Form.Check inline label="Choose All" name="chooseAll" type="checkbox" id="chooseAll" onChange={this.chooseAll} />

          
            <Button className="startBtn" onClick={this.startCheck}>Start and export csv data!</Button>
            
            </div>
          
    );
    
    }
}

export default Configurations;
/* 
<ControlBar autoHide={false} disableDefaultControls={false}>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton /></ControlBar>
              */