import React from 'react';
import './Videos.css';
import Ready from '../Ready/Ready';
import { createRoot } from 'react-dom/client';
import horizontalpath from '../../videos/Horizontal.mp4';
import fasthorizontalpath from '../../videos/Fasthorizontal.mp4';
import verticalpath from '../../videos/Vertical.mp4';
import fastverticalpath from '../../videos/Fastvertical.mp4';
import farandnearpath from '../../videos/Far.mp4';
import fastNearpath from '../../videos/Fastfar.mp4';
import squarepath from '../../videos/Square.mp4';
import fastsquarepath from '../../videos/Fastsquare.mp4';
import leftcirclepath from '../../videos/Leftcircle.mp4';
import rightcirclepath from '../../videos/Rightcircle.mp4';
import largecirclepath from '../../videos/Largecircle.mp4';
import wikipath from '../../videos/Wiki.mp4';
import Lastvideo from './Lastvideo';


class Videos extends React.Component {
    state={
        dataframe:this.props.df,
      }

      componentWillMount = () => {
         const bodyElt = document.querySelector("body");
          bodyElt.style.backgroundColor = "white";
    }

    componentDidMount() {
        if(this.props.gestures.length !== 0){
            this.timer = setInterval(function () {
            const date= new Date();
            const systemtime= date.getTime()
            this.setState({dataframe:[...this.state.dataframe,
            {gaze_timestamp_unix:systemtime/1000,process:this.props.gestures[0]+'_video'},
            {gaze_timestamp_unix:(systemtime+33)/1000,process:this.props.gestures[0]+'_video'},
            {gaze_timestamp_unix:(systemtime+66)/1000,process:this.props.gestures[0]+'_video'}
          ]})
        }.bind(this), 100);
        }
        else{
            this.timer = setInterval(function () {
                const date= new Date();
                const systemtime= date.getTime()
                this.setState({dataframe:[...this.state.dataframe,
                {gaze_timestamp_unix:systemtime/1000,process:'wikivideo'},
                {gaze_timestamp_unix:(systemtime+33)/1000,process:'wikivideo'},
                {gaze_timestamp_unix:(systemtime+66)/1000,process:'wikivideo'}
              ]})
            }.bind(this), 100);
        }
    }

    linkTo = () => {
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(<Ready gestureTime={this.props.gestureTime} gestureFrequency={this.props.gestureFrequency} pauseTime={this.props.pauseTime} 
                    gesturesNumber={this.props.gesturesNumber} gestures={this.props.gestures} remainTime={this.props.remainTime} df={this.state.dataframe}/>);
    }  

    lastVideo = () => {
        const container = document.getElementById('root');
        const root = createRoot(container); 
        root.render(<Lastvideo df={this.state.dataframe}/>);
    }  

    render() {
        let renderInfo;
        
        let nowgesture= this.props.gestures[0];
        switch (nowgesture) {
            case "horizontally":{
                renderInfo=(<video src={horizontalpath} autoPlay muted className="videos" onEnded={this.linkTo} ></video>)
                break;}
            case "horizontally fast":{
                renderInfo=(<video src={fasthorizontalpath} autoPlay muted className="videos" onEnded={this.linkTo} ></video>)
                break;}
            case "vertically":{
                renderInfo=(<video src={verticalpath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "vertically fast":{
                renderInfo=(<video src={fastverticalpath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "near to far":{
                renderInfo=(<video src={farandnearpath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "near to far fast":{
                renderInfo=(<video src={fastNearpath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "square":{
                renderInfo=(<video src={squarepath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "square fast":{
                renderInfo=(<video src={fastsquarepath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "left circle (anticlockwise)":{
                renderInfo=(<video src={leftcirclepath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "right circle (clockwise)":{
                renderInfo=(<video src={rightcirclepath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            case "large right circle (clockwise)":{
                renderInfo=(<video src={largecirclepath} autoPlay muted className="videos" onEnded={this.linkTo}></video>)
                break;}
            default:{
                renderInfo=(<video src={wikipath} autoPlay muted className="videos" onEnded={this.lastVideo}></video>)
                break;}
        }

        
        return (
        <div>
            {renderInfo}
        </div>
            
        );
    
    }
}

export default Videos;