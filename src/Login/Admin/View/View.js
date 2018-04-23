import React, {Component} from 'react'
import './View.css'
import axios from 'axios'
import Modal from 'react-modal'
import io from 'socket.io-client';
import URL from '../../Host';



function ListBox(props){
    const th = props.t;
    const arr = th.state.data.map((a) => {
        if (a.isActive){
            return(
                <div className="viewBox"  onClick = {() => {th.setState({line: th.state.line, data: th.state.data, id: a.id, delay_time: a.delay_time, move_time: a.move_time, modalIsOpen: true, isActive: a.isActive})}}>
                    <div className="canngangviewBox">
                        <div className="viewId">
                            <div className="candocviewBox"> 
                                <div className="viewTopId"> Id</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.id} </p>
                                </div>
                            </div>
                        </div>     
                        <div className="viewDelay">
                            <div className="candocviewBox"> 
                                <div className="viewTopId"> Time delay</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.delay_time} </p>
                                </div>
                            </div>
                        </div>
                        <div className="viewMove">
                            <div className="candocviewBox">
                                <div className="viewTopId"> Time Move</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.move_time} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canngangviewBox">
                        <div className="viewCount"> 
                            <div className="candocviewBox">
                                <div className="viewTopCount"> Actual Counts </div>
                                <blink className="viewBodyCount"> {a.counter} </blink>
                            </div>
                        </div>
                        <div className="viewDelayCount"> 
                            <div className="candocviewBox">
                                <div className="viewTopCount"> Missed Counts </div>
                                <div className="viewBodyCount"> {a.counter_delay} </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }   
        else{
            return(
                <div className="viewBoxNotActive"  onClick = {() => {th.setState({line: th.state.line, data: th.state.data, id: a.id, delay_time: a.delay_time, move_time: a.move_time, modalIsOpen: true, isActive: a.isActive})}}>
                    <div className="canngangviewBox">
                        <div className="viewId">
                            <div className="candocviewBox"> 
                                <div className="viewTopId"> Id</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.id} </p>
                                </div>
                            </div>
                        </div>     
                        <div className="viewDelay">
                            <div className="candocviewBox"> 
                                <div className="viewTopId"> Time delay</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.delay_time} </p>
                                </div>
                            </div>
                        </div>
                        <div className="viewMove">
                            <div className="candocviewBox">
                                <div className="viewTopId">Time Move</div>
                                <div className="viewBodyId"> 
                                    <p className="viewTextBodyId"> {a.move_time} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canngangviewBox">
                        <div className="viewCount"> 
                            <div className="candocviewBox">
                                <div className="viewTopCount"> Actual Counts </div>
                                <blink className="viewBodyCountNotActive"> {a.counter} </blink>
                            </div>
                        </div>
                        <div className="viewDelayCount"> 
                            <div className="candocviewBox">
                                <div className="viewTopCount"> Missed Counts </div>
                                <div className="viewBodyCountNotActive"> {a.counter_delay} </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    })

    return(
        <div className="zz"> {arr} </div>
    )
}


export default class View extends Component{
    constructor(props){
        super(props);
        this.state = {line: props.line, data: [], modal: false, modalIsOpen: false, id: 0, delay_time: 0, move_time: 0};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);    
        this.pauseone = this.pauseone.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);    
        this.handleChange_delay = this.handleChange_delay.bind(this);
        this.handleChange_move = this.handleChange_move.bind(this);
        this.change = this.change.bind(this);
        this.changeLine = this.changeLine.bind(this);
        this.getData = this.getData.bind(this);
        this.start = this.start.bind(this);
        this.startAll = this.startAll.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.getData();
    }

    componentDidMount(){
        var th = this;
        const socket = io(URL + ':3009');
        socket.on('count1', (count) => {
            console.log(count);
            var i;
            for (i = 0; i < th.state.data.length; i++){
                if (th.state.data[i].id == 1){
                    th.state.data[i].counter = count;
                }
            }
        th.setState({line: th.state.line, data: th.state.data, id: th.state.id, move_time: th.state.move_time, modalIsOpen: th.state.modalIsOpen, delay_time: th.state.delay_time, modal: th.state.modal, isActive: th.state.isActive});
        })

        socket.on('count_delay1', (count) => {
            console.log(count);
            var i;
            for (i = 0; i < th.state.data.length; i++){
                if (th.state.data[i].id == 1){
                    th.state.data[i].counter_delay = count;
                }
            }
        th.setState({line: th.state.line, data: th.state.data, id: th.state.id, move_time: th.state.move_time, modalIsOpen: th.state.modalIsOpen, delay_time: th.state.delay_time, isActive: th.state.isActive});
        })
    }

    getData(){
        var th = this;
        axios.get(URL +':3002/getDataView?line=' + th.state.line).then(function(response){
            th.setState({line: th.state.line, modal: false, data: response.data,  modalIsOpen: false});
        }).catch(function(err){
            console.log('err get mysql');
            console.log(err);
        })
    }

    openModal() {
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: true, isActive: this.state.isActive});
      }
    closeModal() {
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: false, isActive: this.state.isActive});
      }

      openModal1() {
          console.log(this.state.isActive);
        this.setState({line: this.state.line, modal: true, data: this.state.data, modalIsOpen: false, isActive: this.state.isActive});
      }
    closeModal1() {
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: false, isActive: this.state.isActive});
      }

    pauseone(){
        var th = this;
        axios.post(URL + ':3002/pause',{id: th.state.id}).then(function(response){
        if (response.data == 'success'){
                th.getData();
                alert('Belt ' + th.state.id + ' stopped'); 
                th.closeModal();
            }
        }).catch(function(err){
            console.log('err post to server ...');
            console.log('err')
        })
    }  

    changeLine(line){
        var adminThis = this.props.th;
        adminThis.state.line =  line;
        this.state.line = line;
        this.getData();
    }


    change(){
        var th = this;
        if (th.state.id == ""){
            alert('Error'); 
        }
        else if (th.state.move_time < 3 || th.state.move_time > 10){
            alert('Move time must more than 3s and less than 10s.')
        }
        else{
            axios.post(URL + ':3002/changeData', {
                id: th.state.id,
                delay_time: th.state.delay_time,
                move_time: th.state.move_time
            }).then(function(response){
                if (response.data == 'success'){
                    var i;
                    for (i = 0; i < th.state.data.length; i++) // tim trong state.data
                        if (th.state.data[i].id == th.state.id)
                            break;
        
                    th.state.data[i].delay_time = th.state.delay_time;
                    th.state.data[i].move_time = th.state.move_time;
                    th.setState({line: th.state.line, data: th.state.data, id: th.state.id});
                    th.closeModal();
                    alert('Change Belt ' + th.state.id + ' successfully.');
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    }
    handleChange_delay(event) {
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, move_time: this.state.move_time, modalIsOpen: true, delay_time: event.target.value});
    }
    handleChange_move(event) {
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, move_time: event.target.value, modalIsOpen: true, delay_time: this.state.delay_time});
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.change();
        }
      }

    start(){
        var th = this;
        var id = this.state.id;
        axios.post(URL + ':3002/start', {
            id: th.state.id,
            delay_time: th.state.delay_time,
            move_time: th.state.move_time}).then(function(response){
                    if (response.data != 'success'){
                        alert('Cannot start belt ' + id);
                    }
                    else{
                        th.getData();
                        alert('Belt ' + id + ' started!');
                    }
            }).catch(function(error){
                console.log('active is failed from client');
            })            
    }


    startAll(){
        var th = this;
        axios.post(URL + ':3002/startLine', {
            line: th.state.line
            }).then(function(response){
            if (response.data != 'success'){
                alert('Cannot start line');
            }
            else{
                th.getData();
                alert('All belt in line ' + th.state.line + ' started');
            }
        }).catch(function(error){
            console.log('active is failed from client');
        })
    }


    render(){
        var th = this;
        const customStyles = {
            content: {
                height: '6cm',
                width: '15cm'
            }
        }
        const customStyles1 = {
            content: {
                height: '5.25cm',
                width: '8cm'
            }
        }
        
        var k;
        for (k = 0; k < th.state.data.length; k++){
            if (th.state.data[k].id == th.state.id)
                break;
        }
        
        return(
            <div className="viewContainer">
                <div className="viewLine">
                    <div className="clickLine" onClick={this.openModal1}> Line {this.state.line} </div>
                        <button className="viewButtonStartAll" onClick={this.startAll}> Start Line </button>
                        
                        <button className="viewButtonPauseAll" onClick={()=>{
                            axios.post(URL + ':3002/pauseLine?line=' + th.state.line).then(function(response){
                                if (response.data == 'success'){
                                    th.getData();
                                    alert('Line ' + th.state.line + ' stopped');
                                }
                            }).catch(function(err){
                                console.log('err post mysql');
                                console.log(err);
                            })
                        }}> Stop Line </button>
                </div>


                        <Modal
                            isOpen={this.state.modal}
                            style={customStyles1}
                            onRequestClose={this.closeModal1}
                            contentLabel="Example Modal1"
                            >   
                            <div className="modal_chooseLine"> 
                                <div className="modal_header"> Select Line </div>
                                <div className="modal_AllLine">
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(1)}> Line 1 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(2)}> Line 2 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(3)}> Line 3 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(4)}> Line 4 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(5)}> Line 5 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(6)}> Line 6 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(7)}> Line 7 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(8)}> Line 8 </button>
                                    <button className="modal_oneLine" onClick={()=>this.changeLine(9)}> Line 9 </button>
                                </div>
                            </div>
                        </Modal>



                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                            >
                    
                            <div className="view_box_change1"> 
                                <div className="right_box_change">
                                    <div className="line_change"> 
                                        <p className="text_line_change"> Id: </p>
                                        <input type="number" name="id" readonly="readonly" value={th.state.id}
                                        className="input_line_notchange"/>
                                    </div>
                                    <div className="line_change"> 
                                        <p className="text_line_change"> Time Delay(sec): </p>
                                        <input type="number" onKeyPress={this._handleKeyPressId} value={th.state.delay_time} onChange={th.handleChange_delay} name="delay_time" className="input_line_change"/>
                                    </div>
                                    <div className="line_change"> 
                                        <p className="text_line_change"> Time Move(sec): </p>
                                        <input type="number" onKeyPress={this._handleKeyPressId} value={th.state.move_time} onChange={th.handleChange_move} name="time_move" className="input_line_change"/>
                                    </div>
                                </div>
                                <div className="right_box_change">
                                    {!th.state.isActive ? <button className="button_view_start_change" onClick={this.start} > Start </button> : <button className="button_stop_change" onClick={this.pauseone}> Stop </button>}
                                    <button className="button_submit_change" onClick={th.change}> Change </button>
                                </div>
                            </div>
                        </Modal>
                <ListBox t={th} />
            </div>  
        );
    }
}