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
            if (a.tf){
                x.id = a.id;
                x.speed = a.simonedbspeed;
                x.time_delay = a.time_delay;
                x.time_move = a.time_move;
            }
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
        this.changeText_speed = this.changeText_speed.bind(this);       
        this.deleteText_speed = this.deleteText_speed.bind(this)
        this.changeText_time_delay = this.changeText_time_delay.bind(this);       
        this.deleteText_time_delay = this.deleteText_time_delay.bind(this)
        this.changeText_time_move = this.changeText_time_move.bind(this);       
        this.deleteText_time_move = this.deleteText_time_move.bind(this)
    }
    
    changeText_speed(a){
        if (a.key > '0' && a.key < '9'){
            x.speed += a.key;
            this.setState({data: this.state.data});
        }
    }
    deleteText_speed(a){
        if (a.keyCode == 8 && x.speed != ""){
            var n = 0;
            n = parseInt(x.speed)
            if (n < 10)
                x.speed = "";
            else
                x.speed = parseInt(n/10).toString();
            
            this.setState({data: this.state.data});
        }
    }

    changeText_time_delay(a){
        if (a.key > '0' && a.key < '9'){
            x.time_delay += a.key;
            this.setState({data: this.state.data});
        }
    }
    deleteText_time_delay(a){
        if (a.keyCode == 8 && x.speed != ""){
            var n = 0;
            n = parseInt(x.time_delay)
            if (n < 10)
                x.time_delay = "";
            else
                x.time_delay = parseInt(n/10).toString();
            
            this.setState({data: this.state.data});
        }
    }
    changeText_time_move(a){
        if (a.key > '0' && a.key < '9'){
            x.time_move += a.key;
            this.setState({data: this.state.data});
        }
    }
    deleteText_time_move(a){
        if (a.keyCode == 8 && x.speed != ""){
            var n = 0;
            n = parseInt(x.time_move)
            if (n < 10)
                x.time_move = "";
            else
                x.time_move = parseInt(n/10).toString();
            
            this.setState({data: this.state.data});
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
                            <input type="number" name="id" readonly="readonly" value={x.id}
                            className="input_line_notchange"/>
                        </div>
                        <div className="line_change">
                            <p className="text_line_change"> Speed: </p>
                            <input type="number" value={x.speed}  name="speed" className="input_line_change" onKeyPress={this.changeText_speed} onKeyDown={this.deleteText_speed}/> 
                        </div>
                        <div className="line_change"> 
                            <p className="text_line_change"> Time Delay: </p>
                            <input type="number" value={x.time_delay} name="time_delay" className="input_line_change" onKeyPress={this.changeText_time_delay} onKeyDown={this.deleteText_time_delay}/>
                        </div>
                        <div className="line_change"> 
                            <p className="text_line_change"> Time move: </p>
                            <input type="number" value={x.time_move} name="time_move" className="input_line_change" onKeyPress={this.changeText_time_move} onKeyDown={this.deleteText_time_move}/>
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