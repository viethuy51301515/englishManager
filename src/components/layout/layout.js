import React from 'react';
import MenuLeft from '../menu'
import Header from '../header';
import './layout.scss';
import StudentList from '../student/studentList';
import Student from '../student'
class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='layout'>
                <MenuLeft />
                <div className='left-layout'>
                    <Header />
                    <div className='main-layout'>  
                        <div className="main-body">                    
                            <Student />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Layout;