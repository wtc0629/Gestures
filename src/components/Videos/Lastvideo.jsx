import React from 'react';
import './Videos.css';
import { createRoot } from 'react-dom/client';
import lastvideopath from '../../videos/Lastvideo.mp4';
import Configurations from '../Configurations/Configurations';
import CsvExportor from "csv-exportor";


class Lastvideo extends React.Component {
    state={
    dataframe:this.props.df
    }

    componentWillMount = () => {
        const bodyElt = document.querySelector("body");
         bodyElt.style.backgroundColor = "white";
   }

    componentDidMount = () => {

    this.timer = setInterval(function () {
    const date= new Date();
    const systemtime= date.getTime()
    this.setState({dataframe:[...this.state.dataframe,
    {gaze_timestamp_unix:systemtime/1000,process:'Lastvideo'},
    {gaze_timestamp_unix:(systemtime+33)/1000,process:'Lastvideo'},
    {gaze_timestamp_unix:(systemtime+66)/1000,process:'Lastvideo'}
  ]})
}.bind(this), 100);
}
    end = () => {
        const container = document.getElementById('root');
        const root = createRoot(container); 
        const headers =["gaze_timestamp_unix","process"];
                CsvExportor.downloadCsv(
                    this.state.dataframe,
                    { header:headers},
                    "instruction.csv"
        );
        root.render(<Configurations/>);
    }  

    render() {
        
        
        return (
        <div>
            {<video src={lastvideopath} autoPlay muted className="videos" onEnded={this.end}></video>}
        </div>
            
        );
    
    }
}

export default Lastvideo;