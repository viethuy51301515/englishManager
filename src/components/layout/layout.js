import React from 'react';
import MenuLeft from '../menu'
import Header from '../header';
import './layout.scss';
import StudentList from '../student/studentList';
import Student from '../student';
import Login from '../../components/login';
import MenuItem from 'antd/lib/menu/MenuItem';
import Event from '../event';
import {BrowserRouter as Router, Switch,Route,Link,useRouteMatch,Redirect} from 'react-router-dom';
import {useSelector,connect} from 'react-redux';

const ProtectedRoute = ({component:Component,...rest})=>{
    const authUser = useSelector(state => state.login)
    return(
        <Route {...rest} render={(props) => (
            authUser.isLoggedIn === true
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    )
}
class LayoutItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // const authUser = useSelector(state => state.login)
        // if(this.props.data.isLoggedIn ===  false){
        //     return(
        //         <Router>
        //             <ProtectedRoute exact path='/' component={Event} />
        //             <Route exact path='/login' component={Login} />
        //         </Router>
        //     )
        // }
        return(
           <Router>
            <div className='layout'>
                <MenuLeft />
                <div className='left-layout'>
                    <Header />
                    <div className='main-layout'>  
                        <div className="main-body">  
                        <Switch>
                            <ProtectedRoute exact path='/' component={Event} />
                            <Route exact path='/login' component={Login} />
                            <ProtectedRoute  exact path='/student' component={Student} />
                            <ProtectedRoute exact path='/studentList' component={StudentList} />
                            <ProtectedRoute exact path='/editEvent' component={Event} />
                        </Switch>                  
                        </div>
                    </div>
                </div>

            </div>
            </Router> 

        )
    }
}
const mapStateToProp = (state)=>{
    return(
        {
            data:state.login
        }
    )
}
const Layout = connect(mapStateToProp,null)(LayoutItem);
export default Layout;