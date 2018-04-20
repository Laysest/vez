import React, {Component} from 'react';
import './Admin.css';
import Setting from './Setting/Setting';
import View from './View/View';
import Store from './Store/Store';

function InterFace(props){
    var th = props.th;
    if (props.goSetting)
        return <Setting line={th.state.line} th={th}/>
    else if (props.goView)
        return <View line={th.state.line} th={th}/> 
    else if (props.goStore)
        return <Store line={th.state.line} th={th}/>
}

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {goSetting: false, goView: true, line: 1, goStore: false}
    }


    render(){
        return(
            <div className="adminContainer"> 
                <div className="adminBody"> 
                    <InterFace goSetting={this.state.goSetting} goView={this.state.goView} goStore={this.state.goStore} th={this}/>
                </div>
                <div className="adminMenu">
                    <button className= "adminbutton" name="goSetting" onClick={()=>{this.setState({goSetting: true, goView: false, goStore: false})}}> Register </button>
                    <button className= "adminbutton" name="goView" onClick={()=>{this.setState({goSetting: false, goView: true, goStore: false})}}>Monitor</button>
                    <button className= "adminbutton" name="goStore" onClick={()=>{this.setState({goSetting: false, goView: false, goStore: true})}}>Store Data</button>
                </div>
            </div>
        );
    }
}

export default Admin;