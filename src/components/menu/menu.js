import React from 'react';
import './menu.scss';
import { Menu, Icon, Button } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;
const menuWidth = '250px';

class MenuLeft extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed:false,
            menuWidth:menuWidth
        }
        this.toogleMenu = this.toogleMenu.bind(this);
    }
    toogleMenu(){
        this.setState({
            collapsed:!this.state.collapsed,
            menuWidth: this.state.menuWidth == 'auto' ? menuWidth : 'auto'
        })
    }
    render(){
        const iconClass=  [
            "pie-chart",
            "desktop",
            "inbox",
            "pie-chart",
            "desktop",
            "inbox",
            "pie-chart",
            "desktop",
            "inbox"
        ]
        return(
            <div style={{width:this.state.menuWidth,height:"100vh"}} id='menu-layout'>
                <Menu 
                    mode='inline'
                    theme='dark'
                    inlineCollapsed={this.state.collapsed}
                    className='leftMenu'
                >
                    <Menu.Item key='0' onClick={this.toogleMenu} style={{background:"linear-gradient(to right, #ff9d01, #ffaa01)",height:"9vh"}}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
                        <span style={{fontSize:'1.4rem'}}>TTAN</span>
                    </Menu.Item>
                    <SubMenu 
                        key='sub1'
                        title={
                            <span>
                                <Icon type='mail'/>
                                <span>Student</span>
                            </span>
                        }
                    >
                            <MenuItem key='nav1'>
                                <Icon type='mail' />
                                <span><Link to='/studentList'> Student List </Link></span>
                            </MenuItem>
                            <MenuItem key='nav2'>
                                <Icon type='mail' />
                                <span><Link to='/student'> Student Detail </Link></span>
                            </MenuItem>
                    </SubMenu>
                    <Menu.Item key='event'>
                        <Icon type='mail'></Icon>
                        <span><Link to='/editEvent'> Edit Content </Link></span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default MenuLeft;