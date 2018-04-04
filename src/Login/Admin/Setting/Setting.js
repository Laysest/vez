import React, {Component} from 'react';
import './Setting.css';

function check(tf){
    if (!tf)
        return "boxsetting";
    else    
        return "boxsetting1";
}

var x = {id : "", speed: "", time_delay: "", time_move: ""};

function ListBox(props){
    const th = props.t;
    const ifArr = th.state.data.map((a) => 
    <button className={check(a.tf)} onClick={() => {
            a.tf = !a.tf;
            th.setState({data: th.state.data});
            x.id = a.id;
            x.speed = a.simonedbspeed;
            x.time_delay = a.time_delay;
            x.time_move = a.time_move;
         }}> 
        <p className="textboxsetting">Id: {a.id}<br/>
            Speed: {a.simonedbspeed} <br/>
            Time_delay: {a.time_delay} <br/>  
            Time_move: {a.time_move} <br />
        </p>
    </button>
)
    return(
       <div className="settingtop"> {ifArr} </div> 
)}


class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {data: [{id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 1, simonedbspeed: 1, time_delay: 60, time_move: 3, tf: false},
            {id: 2, simonedbspeed: 29, time_delay: 10, time_move: 4, tf: false}]
        }        
    }
    


    render(){
        return(
            <div className="settingContainer"> 
                <ListBox  t={this}/>
                <div className="box_change"> 
                    <div className="left_box_change">
                        <div className="line_change"> 
                            <p className="text_line_change"> Id: </p>
                            <input type="text" name="id" readonly="readonly" value={x.id}
                            className="input_line_notchange"/>
                        </div>
                        <div className="line_change">
                            <p className="text_line_change"> Speed: </p>
                            <input type="text" value={x.speed} name="speed" className="input_line_change"/> 
                        </div>
                        <div className="line_change"> 
                            <p className="text_line_change"> Time Delay: </p>
                            <input type="text" value={x.time_delay} name="time_delay" className="input_line_change"/>
                        </div>
                        <div className="line_change"> 
                            <p className="text_line_change"> Time move: </p>
                            <input type="text" value={x.time_move} name="time_move" className="input_line_change"/>
                        </div>
                    </div>
                    <div className="right_box_change">
                        <button className="button_submit_change"> Change </button>
                    </div>
                    <div className="right_box_change">
                        <button className="button_start_change"> Start </button>
                    </div>
                </div>
                <div className="settingbot"> </div>
            </div>
        );
    }
}

export default Admin;