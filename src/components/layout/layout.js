import React from 'react';
import MenuLeft from '../menu'
import Header from '../header';
import './layout.scss';
import StudentList from '../student/studentList';
import Student from '../student'
import MenuItem from 'antd/lib/menu/MenuItem';
import Event from '../event';
import {BrowserRouter as Router, Switch,Route,Link,useRouteMatch} from 'react-router-dom'
class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
           <Router>
            <div className='layout'>
                <MenuLeft />
                <div className='left-layout'>
                    <Header />
                    <div className='main-layout'>  
                        <div className="main-body">  
                        <Switch>
                            <Route  exact path='/student' component={Student} />
                            <Route exact path='/studentList' component={StudentList} />
                            <Route exact path='/editEvent' component={Event} />
                        </Switch>                  
                        </div>
                    </div>
                </div>

            </div>
            </Router> 

        )
    }
}
export default Layout;