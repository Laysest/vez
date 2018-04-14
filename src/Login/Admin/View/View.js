import React, {Component} from 'react'
import './View.css'
import axios from 'axios'
import Modal from 'react-modal'
import io from 'socket.io-client';
import URL from '../../Host';

const socket = io(URL +':3009');

function ListBox(props){
    const th = props.t;
    const arr = th.state.data.map((a) => 
    <button className="viewBox"  onClick = {() => {th.setState({line: th.state.line, data: th.state.data, id: a.id, delay_time: a.delay_time, move_time: a.move_time, modalIsOpen: true})}}>
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
                    <div className="viewTopId">Time move</div>
                    <div className="viewBodyId"> 
                        <p className="viewTextBodyId"> {a.move_time} </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="canngangviewBox">
            <div className="viewCount"> 
                <div className="candocviewBox">
                    <div className="viewTopCount"> Count </div>
                    <blink className="viewBodyCount"> {a.counter} </blink>
                </div>
            </div>
            <div className="viewDelayCount"> 
                <div className="candocviewBox">
                    <div className="viewTopCount"> Delay </div>
                    <div className="viewBodyCount"> {a.counter_delay} </div>
                </div>
            </div>
        </div>
    </button>)

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
        this.getData();
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
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: true});
      }
    closeModal() {
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: false});
      }

      openModal1() {
        this.setState({line: this.state.line, modal: true, data: this.state.data, modalIsOpen: false});
      }
    closeModal1() {
        this.setState({line: this.state.line, modal: false, data: this.state.data, modalIsOpen: false});
      }

    pauseone(){
        var th = this;
        axios.post(URL + ':3002/pause',{id: th.state.id}).then(function(response){
        if (response.data == 'success'){
                th.getData();
                alert('Băng chuyền ' + th.state.id + ' đã dừng'); 
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
            alert('Chọn và nhập đủ thông tin'); 
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
                    alert('Thay đổi băng chuyền số ' + th.state.id + ' thành công.');
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
                height: '6cm',
                width: '12cm'
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
                        <button className="viewButtonPauseAll" onClick={()=>{
                            axios.post(URL + ':3002/pauseLine?line=' + th.state.line).then(function(response){
                                if (response.data == 'success'){
                                    alert('Đã dừng Line ' + th.state.line);
                                    th.setState({line: th.state.line, data: []});
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
                                <button className="modal_oneLine" onClick={()=>this.changeLine(1)}> Line 1 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(2)}> Line 2 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(3)}> Line 3 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(4)}> Line 4 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(5)}> Line 5 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(6)}> Line 6 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(7)}> Line 7 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(8)}> Line 8 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(9)}> Line 9 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(10)}> Line 10 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(11)}> Line 11 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(12)}> Line 12 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(13)}> Line 13 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(14)}> Line 14 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(15)}> Line 15 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(16)}> Line 16 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(17)}> Line 17 </button>
                                <button className="modal_oneLine" onClick={()=>this.changeLine(18)}> Line 18 </button>
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
                                        <p className="text_line_change"> Time Delay: </p>
                                        <input type="number" value={th.state.delay_time} onChange={th.handleChange_delay} name="delay_time" className="input_line_change"/>
                                    </div>
                                    <div className="line_change"> 
                                        <p className="text_line_change"> Time move: </p>
                                        <input type="number" value={th.state.move_time} onChange={th.handleChange_move} name="time_move" className="input_line_notchange"/>
                                    </div>
                                </div>
                                <div className="right_box_change">
                                    <button className="button_stop_change" onClick={th.pauseone} > Stop </button>
                                    <button className="button_submit_change" onClick={th.change}> Change </button>
                                </div>
                            </div>
                        </Modal>
                <ListBox t={th} />
            </div>  
        );
    }
}