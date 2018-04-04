import React, {Component} from 'react';
import './Admin.css';
import Setting from './Setting/Setting';


// function InterFace(props){
//     if (props.setting)
//         return <Setting/>
// }

class Admin extends Component{
    constructor(props){
        super(props);
        this.state
    }


    render(){
        return(
            <div className="adminContainer"> 
                <div className="adminBody"> 
                    <Setting />
                </div>
                <div className="adminMenu">
                    <button className= "adminbutton" name="goSetting"> Cài Đặt </button>
                    <button className= "adminbutton" name="goView">Xem băng chuyền đang hoạt động </button>
                    <button className= "adminbutton" name="goStore">Xem dữ liệu </button>
                </div>
            </div>
        );
    }
}

export default Admin;