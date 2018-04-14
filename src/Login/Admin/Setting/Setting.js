import React, {Component} from 'react';
import './Setting.css';
import axios from 'axios';
import Modal from 'react-modal';
import URL from '../../Host';

function check(tf){
    if (!tf)
        return "boxsetting";
    else    
        return "boxsetting1";
}

function ListBox(props){
    const th = props.t;
    const ifArr = th.state.data.map((a) => 
    <button className={check(a.tf)} onClick={() => {
            a.tf = !a.tf;
            if (a.tf){
                th.setState({line: th.state.line, data: th.state.data, id: a.id, delay_time: a.delay_time, move_time: a.move_time, modalIsOpen: th.state.modalIsOpen});
            }
            else    
                th.setState({line: th.state.line, data: th.state.data, id: th.state.id, delay_time: th.state.delay_time, move_time: th.state.move_time, modalIsOpen: th.state.modalIsOpen});
        }}> 
        <p className="textboxsetting">Id: {a.id}<br/>
            Time_delay: {a.delay_time} <br/>  
            Time_move: {a.move_time} <br />
        </p>
    </button>
)
    return(
       <div className="settingtop"> {ifArr} </div> 
)}




class Setting extends Component{
    constructor(props){
        super(props);
        var data;
        this.state = {line: props.line, data: [], modalIsOpen: false};
        this.changeData = this.changeData.bind(this);
        this.start = this.start.bind(this);
        this.handleChange_delay = this.handleChange_delay.bind(this);
        this.handleChange_move = this.handleChange_move.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);    
        this.changeLine = this.changeLine.bind(this);
        this.getData = this.getData.bind(this);
        this.getData();
    }

    
    openModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: true, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time});
      }
    closeModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: false, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time});
      }


    getData(){
        var th = this;
        axios.get(URL + ':3002/getDataLine?line=' + th.state.line).then(function(response){
            var z = response.data;
            var i;
            for (i = 0; i < z.length; i++){
                z[i].tf = false;
            }
            th.setState({line: th.state.line, data: z, modalIsOpen: false, modal: false});
        }).catch(function(err){
            console.log('err get mysql');
            console.log(err);
        })
    }
    
    changeData(){
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
                    for (i = 0; i < th.state.data.length; i++)
                        if (th.state.data[i].id == th.state.id)
                            break;
                    
                    th.state.data[i].delay_time = th.state.delay_time;
                    th.state.data[i].move_time = th.state.move_time;
                    th.setState({line: th.state.line, data: th.state.data, id: th.state.id, move_time: th.state.move_time, delay_time: th.state.delay_time, modalIsOpen: th.state.modalIsOpen});
                    alert('Thay đổi băng chuyền số ' + th.state.id + ' thành công.');
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    start(){
        var th = this;
        var i;
        var c = true;
        for (i = 0; i < th.state.data.length; i++){
            if (th.state.data[i].tf == true){
                axios.post(URL + ':3002/start', {
                    id: th.state.data[i].id,
                    delay_time: th.state.data[i].delay_time,
                    move_time: th.state.data[i].move_time
                }).then(function(response){
                    if (response.data != 'success'){
                        alert('Không thể bắt đầu băng chuyền số ' + th.stateate.data[i].id);
                        c = false;
                    }
                }).catch(function(error){
                    console.log('active is failed from client');
                })
            }
        }
        if (c){
            var str = 'Băng chuyền số ';
            for (i = 0; i < th.state.data.length; i++){
                if (th.state.data[i].tf == true){
                    str += th.state.data[i].id + ', ';
                }
            }    
            str += 'đã bắt đầu';
            for (i = 0; i < th.state.data.length; i++){
                th.state.data[i].tf = false;
                th.setState({line: th.state.line, data: th.state.data, id: th.state.id, move_time: th.state.move_time, delay_time: th.state.delay_time, modalIsOpen: th.state.modalIsOpen});
            }
            alert(str);
        }
    }

    handleChange_delay(event){
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, delay_time: event.target.value, move_time: this.state.move_time, modalIsOpen: this.state.modalIsOpen});
    }

    handleChange_move(event){
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, delay_time: this.state.delay_time, move_time: event.target.value, modalIsOpen: this.state.modalIsOpen});
    }

    changeLine(line){
        var adminThis = this.props.th;
        adminThis.state.line =  line;
        this.state.line = line;
        this.getData();
    }

    render(){
        var th = this;
        const customStyles = {
            content: {
                height: '6cm',
                width: '12cm'
            }
        }
        
        return(
            <div className="settingContainer"> 
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal"
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



                <div className="settingLine" onClick={this.openModal}> Line {this.state.line}  </div>
                <ListBox  t={this}/>
                <div className="box_change"> 
                    <div className="left_box_change">
                        <div className="line_change"> 
                            <p className="text_line_change"> Id: </p>
                            <input type="number" name="id" readonly="readonly" value={this.state.id}
                            className="input_line_notchange"/>
                        </div>
                        <div className="line_change"> 
                            <p className="text_line_change"> Time Delay: </p>
                            <input type="number" value={this.state.delay_time} name="delay_time" className="input_line_change" onChange={this.handleChange_delay}/>
                        </div>

                        <div className="line_change"> 
                            <p className="text_line_change"> Time Move: </p>
                            <input type="number" value={this.state.move_time} name="move_time" className="input_line_change" onChange={this.handleChange_move}/>
                        </div>
                    </div>
                    <div className="right_box_change">
                        <button className="button_submit_change1" onClick={this.changeData}> Change </button>
                        <button className="button_start_change" onClick={this.start}> Start </button>
                    </div>
                </div>
                <div className="settingbot"> </div>
            </div>
        );
    }
}

export default Setting;