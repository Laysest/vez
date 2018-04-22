import React, {Component} from 'react';
import './Store.css';
import axios from 'axios';
import Modal from 'react-modal';
import URL from '../../Host';
import {Bar} from 'react-chartjs-2';

class Store extends Component{
    constructor(props){
        super(props);
        var data;
        this.state = {line: props.line, data: [], modalIsOpen: false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);    
        this.changeLine = this.changeLine.bind(this);
    }

    
    openModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: true, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time});
      }
    closeModal() {
        this.setState({line: this.state.line, data: this.state.data, modalIsOpen: false, id: this.state.id, move_time: this.state.move_time, delay_time: this.state.delay_time});
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
                height: '6.25cm',
                width: '8cm'
            }
        }

        var data= {
            labels: ["18/4", "19/4", "20/4", "21/4", "22/4", "23/4"],
            datasets: [{
            label: "Actual Counts of Belt 1",
            backgroundColor: 'blue',
            borderColor: 'rgb(255, 99, 132)',
            data: [240 ,250, 255, 300, 290, 298, 305, 310]
            }]
        }
    
        var data1= {
            labels: ["18/4", "19/4", "20/4", "21/4", "22/4", "23/4"],
            datasets: [{
            label: "Actual Counts of Belt 2",
            backgroundColor: 'blue',
            borderColor: 'rgb(255, 99, 132)',
            data: [320, 350, 355, 310, 390, 398, 405, 410]
            }]
        }
    
        return(
            <div className="storeContainer"> 
                        <div className="storeLine" onClick={this.openModal}> Line {this.state.line}  </div>
                            
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            onRequestClose={this.closeModal}
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
                        <div className="containerChart">
                            <div className="chart">
                                <Bar data={data} 	width={4} height={2}/>
                            </div>

                            <div className="chart">
                                <Bar data={data1} 	width={4} height={2}/>
                            </div>
                        </div>
            </div>
        );
    }
}

export default Store;