import React from 'react';
import './menu.scss';
import { Menu, Icon, Button } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
const { SubMenu } = Menu;
class MenuLeft extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed:true,
            menuWidth:'100%'
        }
        this.toogleMenu = this.toogleMenu.bind(this);
    }
    toogleMenu(){
        this.setState({
            collapsed:!this.state.collapsed
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
            <div style={{width:'250px',height:"100vh"}}>
                {/* <div className='header-menu'>
                    <div style={{display:this.state.collapsed ? "" : }}>
                        <img src='/icon.png' className='icon'/>
                        <h3>TTAN</h3>
                    </div>
                    <Button type='primary' onClick={this.toogleMenu} className='menu-button'>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
                    </Button>
                </div> */}
                <Menu 
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='dark'
                    inlineCollapsed={this.state.collapsed}
                    className='leftMenu'
                >
                    <Menu.Item key='0' onClick={this.toogleMenu} style={{background:"linear-gradient(to right, #ff9d01, #ffaa01)",height:"5vh"}}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}></Icon>
                        <span style={{fontSize:'1.4rem'}}>TTAN</span>
                    </Menu.Item>
                    <SubMenu 
                        key='sub1'
                        title={
                            <span>
                                <Icon type='mail'/>
                                <span>Navigation 1</span>
                            </span>
                        }
                    >
                        <MenuItem key='nav1'>
                            <Icon type='mail' />
                            <span>nav 1</span>
                        </MenuItem>
                        <MenuItem key='nav2'>
                            <Icon type='mail' />
                            <span>nav 1</span>
                        </MenuItem>
                    </SubMenu>
                    {
                        iconClass.map((item,index) => {
                            return (
                                <Menu.Item key={index}>
                                    <Icon type={item}></Icon>
                                    <span>option {index}</span>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        )
    }
}
export default MenuLeft;