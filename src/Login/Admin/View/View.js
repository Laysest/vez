import React, {Component} from 'react'
import './View.css'


function ListBox(props){
    const th = props.t;
    const arr = th.state.data.map((a) => 
    <div className="viewBox">
        <div className="canngangviewBox">
            <div className="viewId">
                <div className="candocviewBox"> 
                    <div className="viewTopId"> Id</div>
                    <div className="viewBodyId"> 
                        <p className="viewTextBodyId"> 10 </p>
                    </div>
                </div>
            </div>
            <div className="viewDelay">
                <div className="candocviewBox"> 
                    <div className="viewTopId"> Delay time</div>
                    <div className="viewBodyId"> 
                        <p className="viewTextBodyId"> 1000 </p>
                    </div>
                </div>
            </div>
            <div className="viewMove">
                <div className="candocviewBox"> 
                    <div className="viewTopId"> Move</div>
                    <div className="viewBodyId"> 
                        <p className="viewTextBodyId"> 10 </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="canngangviewBox">
            <div className="viewCount"> 
                <div className="candocviewBox">
                    <div className="viewTopCount"> Count </div>
                    <blink className="viewBodyCount"> 999 </blink>
                </div>
            </div>
            <div className="viewDelayCount"> 
                <div className="candocviewBox">
                    <div className="viewTopCount"> Delay </div>
                    <div className="viewBodyCount"> 999 </div>
                </div>
            </div>
        </div>
    </div>)

    return(
        <div className="zz"> {arr} </div>
    )
}

export default class View extends Component{
    constructor(props){
        super(props);
        this.state = {data : [{id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},                     
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},   
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
                              {id: 1, delay_time: 600, move: 5, count: 900, delay: 10},
                              {id: 2, delay_time: 500, move: 5, count: 680, delay: 10},
        ]}
    }

    render(){
        return(
            <div className="viewContainer">
                    
                <ListBox t={this} />
            </div>  
        );
    }
}