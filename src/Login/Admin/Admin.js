import React, {Component} from 'react';
import './Admin.css';
import Setting from './Setting/Setting';
import View from './View/View';

function InterFace(props){
    var th = props.th;
    if (props.goSetting)
        return <Setting line={th.state.line} th={th}/>
    else if (props.goView)
        return <View line={th.state.line} th={th}/> 
}

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {goSetting: false, goView: true, line: 1}
    }


    render(){
        return(
            <div className="adminContainer"> 
                <div className="adminBody"> 
                    <InterFace goSetting={this.state.goSetting} goView={this.state.goView} th={this}/>
                </div>
                <div className="adminMenu">
                    <button className= "adminbutton" name="goSetting" onClick={()=>{this.setState({goSetting: true, goView: false})}}> Cài Đặt </button>
                    <button className= "adminbutton" name="goView" onClick={()=>{this.setState({goSetting: false, goView: true})}}>Xem băng chuyền đang hoạt động </button>
                    <button className= "adminbutton" name="goStore">Xem dữ liệu </button>
                </div>
            </div>
        );
    }
}

export default Admin;