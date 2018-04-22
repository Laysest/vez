import React, {Component} from 'react';
import './Store.css';
import axios from 'axios';
import Modal from 'react-modal';
import URL from '../../Host';


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
                height: '5.25cm',
                width: '8cm'
            }
        }

        var data= {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
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
            </div>
        );
    }
}

export default Store;