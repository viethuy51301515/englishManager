import React from 'react';
import {Icon,Dropdown,Menu} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import './header.scss'
class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div className='user-title'>
                    <h5 className='item-tilte'>
                        Huy Phan
                    </h5>
                    <span className='role'>
                        admin
                    </span>
                </div>
                <div>
                    <img src="./user.png" alt=""/>
                </div>
                <div className='language'>
                        <Icon type="global" />
                        <Icon type='down'/>
                </div>
                <div>
                <Menu>
                    <Menu.Item key="1">1st menu item</Menu.Item>
                    <Menu.Item key="2">2nd memu item</Menu.Item>
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                </Menu>
                </div>
            </div>
        )
    }
}
export default Header;