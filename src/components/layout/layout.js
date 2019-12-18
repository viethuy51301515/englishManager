import React from 'react';
import MenuLeft from '../menu'
import Header from '../header';
import './layout.scss';
import StudentList from '../student/studentList';
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
                        <div className='main-title'>
                        </div>                    
                        <StudentList />
                    </div>
                </div>

            </div>
        )
    }
}
export default Layout;