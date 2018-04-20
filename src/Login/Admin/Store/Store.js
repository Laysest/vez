import React, {Component} from 'react';
import './Store.css';
import axios from 'axios';
import Modal from 'react-modal';
import URL from '../../Host';

class Setting extends Component{
    constructor(props){
        super(props);
        var data;
        this.state = {line: props.line, data: [], modalIsOpen: false};
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
            th.setState({line: th.state.line, data: response.data, modalIsOpen: false, modal: false});
        }).catch(function(err){
            console.log('err get mysql');
            console.log(err);
        })
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
            <div className="storeContainer"> 
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            onRequestClose={this.closeModal}
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
                <div className="cang_docst1"> 
                    <div className="cang_ngangid"> Id: 1 </div>
                    <div className="cang_ngangst">
                        <div className="boxst"> 
                            Start Time: 10h55m 19/4/2018 <br/>
                            End Time: 15h55m 19/4/2018 <br/>
                            Actual Counts: 250 <br/>
                            Missed Counts: 10
                        </div>

                        <div className="boxst"> 
                            Start Time: 7h55m 18/4/2018 <br/>
                            End Time: 15h55m 18/4/2018 <br/>
                            Actual Counts: 350 <br/>
                            Missed Counts: 19
                        </div>

                        <div className="boxst"> 
                            Start Time: 8h45m 19/4/2018 <br/>
                            End Time: 17h55m 19/4/2018 <br/>
                            Actual Counts: 354 <br/>
                            Missed Counts: 20
                        </div>
                    </div>
                </div>

                <div className="cang_docst"> 
                    <div className="cang_ngangid"> Id: 2 </div>
                    <div className="cang_ngangst">
                        <div className="boxst"> 
                            Start Time: 10h55m 19/4/2018 <br/>
                            End Time: 15h55m 19/4/2018 <br/>
                            Actual Counts: 250 <br/>
                            Missed Counts: 10
                        </div>

                        <div className="boxst"> 
                            Start Time: 7h55m 18/4/2018 <br/>
                            End Time: 15h55m 18/4/2018 <br/>
                            Actual Counts: 350 <br/>
                            Missed Counts: 19
                        </div>

                        <div className="boxst"> 
                            Start Time: 8h45m 19/4/2018 <br/>
                            End Time: 17h55m 19/4/2018 <br/>
                            Actual Counts: 354 <br/>
                            Missed Counts: 20
                        </div>

                    </div>                
                </div>

                <div className="cang_docst1">
                    <div className="cang_ngangid"> Id: 3 </div>
                    <div className="cang_ngangst">
                        <div className="boxst"> 
                            Start Time: 10h55m 19/4/2018 <br/>
                            End Time: 15h55m 19/4/2018 <br/>
                            Actual Counts: 250 <br/>
                            Missed Counts: 10
                        </div>

                        <div className="boxst"> 
                            Start Time: 7h55m 18/4/2018 <br/>
                            End Time: 15h55m 18/4/2018 <br/>
                            Actual Counts: 350 <br/>
                            Missed Counts: 19
                        </div>

                        <div className="boxst"> 
                            Start Time: 8h45m 19/4/2018 <br/>
                            End Time: 17h55m 19/4/2018 <br/>
                            Actual Counts: 354 <br/>
                            Missed Counts: 20
                        </div>

                    </div>                                
                </div>
            </div>
        );
    }
}

export default Setting;