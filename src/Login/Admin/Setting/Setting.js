import React, {Component} from 'react';
import './Setting.css';
import axios from 'axios';
import Modal from 'react-modal';
import URL from '../../Host';



function check(tf){
    if (!tf)
        return "boxsetting";
    return "boxsetting1";
}

function checkdelete(tf){
    if (!tf)
        return "textboxsettingdelete_hidden";
    return "textboxsettingdelete";
}

function ListBox(props){
    const th = props.t;
    const ifArr = th.state.data.map((a) =>{
        if (a.id != -1){ 
            return(
                <button className={check(a.tf)} onClick={() => {
                        a.tf = !a.tf;
                        if (a.tf){
                            th.setState({line: th.state.line, data: th.state.data, id: a.id, delay_time: a.delay_time, move_time: a.move_time, modalIsOpen: th.state.modalIsOpen, modal: th.state.modal});
                        }
                        else    
                            th.setState({line: th.state.line, data: th.state.data, id: th.state.id, delay_time: th.state.delay_time, move_time: th.state.move_time, modalIsOpen: th.state.modalIsOpen, modal: th.state.modal});
                    }}> 
                    <div className="textboxsetting">
                        <div className="textboxsettingtop">
                            <div className="textboxsettingId"> Id : {a.id} </div>
                            <button className={checkdelete(a.tf)} onClick={()=>{
                                axios.post(URL + ':3002/deleteBelt', {
                                    id: a.id
                                    }).then(function(res){
                                        if (res.data == 'success'){
                                            th.getData();
                                            alert('Removed Belt ' + a.id);
                                        }
                                        else{
                                            alert('Remove Belt ' + a.id + ' failed');
                                        }
                                    }).catch(function(err){
                                        console.log('err get mysql');
                                        console.log(err);
                                    })
                                }}> 
                            </button>
                        </div>
                        <div className="textboxsettingdelay">    Time Delay (s): {a.delay_time} </div>  
                        <div className="textboxsettingmove">    Time Move (s): {a.move_time} </div>
                    </div>
                </button>
            )
        }
        else{
            return(
                <div className="boxAdd" onClick={()=>{th.openModal1()}}> </div>        
            )
        }
    }
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
        this.stop = this.stop.bind(this);
        this.handleChange_delay = this.handleChange_delay.bind(this);
        this.handleChange_move = this.handleChange_move.bind(this);
        this.handleChange_id = this.handleChange_id.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);        
        this.changeLine = this.changeLine.bind(this);
        this.getData = this.getData.bind(this);
        this.add = this.add.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._handleKeyPressId = this._handleKeyPressId.bind(this);
        this.getData();
    }

    
    openModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: true, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time, modal: false});
      }
    closeModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: false, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time, modal: false});
      }

      openModal1() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: false, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time, modal: true});
      }
    closeModal1() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: false, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time, modal: false});
      }

    getData(){
        var th = this;
        axios.get(URL + ':3002/getDataLine?line=' + th.state.line).then(function(response){
            var z = response.data;
            var i;
            for (i = 0; i < z.length; i++){
                z[i].tf = false;
            }
            z.push({id: -1});
            th.setState({line: th.state.line, data: z, modalIsOpen: false, modal: false});
        }).catch(function(err){
            console.log('err get mysql');
            console.log(err);
        })
    }
    
    changeData(){
        var th = this;
        if (th.state.id == ""){
            alert('Please fill id & time delay'); 
        }
        else if (parseInt(th.state.move_time) > 10 || parseInt(th.state.delay_time) < 3)
            alert('Time Move must more than 3 seconds and less than 10 seconds');
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
                    th.setState({line: th.state.line, data: th.state.data, id: th.state.id, move_time: th.state.move_time, delay_time: th.state.delay_time, modalIsOpen: th.state.modalIsOpen, modal: th.state.modal});
                    alert('Submit belt ' + th.state.id + ' successfully.');
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
                        alert('Cannot start belt ' + th.state.data[i].id);
                        c = false;
                    }
                }).catch(function(error){
                    console.log('active is failed from client');
                })
            }
        }
        if (c){
            var str = 'Belt ';
            var dem = 0;
            for (i = 0; i < th.state.data.length; i++){
                if (th.state.data[i].tf == true){
                    str += th.state.data[i].id + ', ';
                    dem++;
                }
            }    
            str += ' started';
            if (dem != 0){
                alert(str);
            }
            else{
                alert('Please choose belt to start')
            }
        }
    }

    stop(){
        var th = this;
        var i;
        var c = true;
        for (i = 0; i < th.state.data.length; i++){
            if (th.state.data[i].tf == true){
                axios.post(URL + ':3002/pause', {
                    id: th.state.data[i].id
                }).then(function(response){
                    if (response.data != 'success'){
                        alert('Cannot stop belt ' + th.state.data[i].id);
                        c = false;
                    }
                }).catch(function(error){
                    console.log('active is failed from client');
                })
            }
        }
        if (c){
            var str = 'Belt ';
            var dem = 0;
            for (i = 0; i < th.state.data.length; i++){
                if (th.state.data[i].tf == true){
                    str += th.state.data[i].id + ', ';
                    dem++;
                }
            }    
            str += ' stopped';
            if (dem != 0){
                alert(str);
                for (i = 0; i < th.state.data.length; i++){
                    th.state.data[i].tf = false;
                    th.setState({line: this.state.line, data: this.state.data, id: this.state.id, delay_time: this.state.delay_time, move_time: this.state.move_time, modalIsOpen: this.state.modalIsOpen, modal: this.state.modal})
                }
            }
            else{
                alert('Please choose belt to stop')
            }
        }
    }

    add(){
        var th = this;
        axios.post(URL+':3002/addBelt',{
            id: th.state.idChange,
            line: th.state.line
        }).then(function(response){
            if (response.data != 'success'){
                alert('Cannot add belt ' + th.state.idChange + ' to line ' + th.state.line);
            }
            else{
                th.getData(); // not optimize
                alert('Add belt ' + th.state.idChange + ' to line ' + th.state.line + ' success');
            }
        }).catch(function(err){
            console.log('err in add');
        })
    }

    handleChange_delay(event){
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, delay_time: event.target.value, move_time: this.state.move_time, modalIsOpen: this.state.modalIsOpen, modal: this.state.modal});
    }

    handleChange_id(event){
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, idChange: event.target.value, modalIsOpen: this.state.modalIsOpen, modal: this.state.modal});
    }

    handleChange_move(event){
        this.setState({line: this.state.line, data: this.state.data, id: this.state.id, delay_time: this.state.delay_time, move_time: event.target.value, modalIsOpen: this.state.modalIsOpen, modal: this.state.modal});
    }

    changeLine(line){
        var adminThis = this.props.th;
        adminThis.state.line =  line;
        this.state.line = line;
        this.getData();
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          this.changeData();
        }
      }

      _handleKeyPressId = (e) => {
        if (e.key === 'Enter') {
          this.add();
        }
      }

    render(){
        var th = this;
        const customStyles1 = {
            content: {
                height: '5.25cm',
                width: '8cm'
            }
        }
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',            
                height: '3cm',
                width: '10cm'
            }
          };
          
        return(
            <div className="settingContainer"> 

                        <Modal
                            isOpen={this.state.modalIsOpen}
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
                            isOpen={this.state.modal}
                            style={customStyles}
                            onRequestClose={this.closeModal1}
                            >   
                                <div className="right_box_change">
                                    <div className="line_change"> 
                                        <p className="text_line_change"> Id: </p>
                                        <input type="number" name="id" className="input_line_change" onKeyPress={this._handleKeyPressId} onChange={this.handleChange_id}/>
                                    </div>
                                </div>
                                <div className="right_box_change">
                                    <button className="modal_Add_button" onClick={this.add}> Add </button>
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
                            <p className="text_line_change"> Time Delay (s): </p>
                            <input type="number" value={this.state.delay_time} name="delay_time" className="input_line_change" onKeyPress={this._handleKeyPress} onChange={this.handleChange_delay}/>
                        </div>

                        <div className="line_change"> 
                            <p className="text_line_change"> Time Move (s): </p>
                            <input type="number" value={this.state.move_time} name="move_time" className="input_line_change" onKeyPress={this._handleKeyPress} onChange={this.handleChange_move}/>
                        </div>
                    </div>
                    <div className="right_box_change_setting">
                        <button className="button_submit_change1" onClick={this.changeData}> Submit </button>
                        <button className="button_start_change" onClick={this.start}> Start</button>
                        <button className="button_start_all" onClick={this.stop}> stop</button>
                    </div>
                </div>
                <div className="settingbot"> </div>
            </div>
        );
    }
}

export default Setting;