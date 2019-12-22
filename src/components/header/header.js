import React from 'react';
import {Icon,Dropdown,Menu,Popover} from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import './header.scss'
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toggleLanguage:false
        }
        this.toggleLang = this.toggleLang.bind(this);
    }
    toggleLang(){
        this.setState({
            toggleLanguage:!this.state.toggleLanguage
            }
        )
    }
    render(){
        const content = (
            <div>
                <Menu
                    mode='inline'
                    theme='light'
                    
                >
                    <Menu.Item key="1">English</Menu.Item>
                    <Menu.Item key="2">Tieng Viet</Menu.Item>
                </Menu>
            </div>
        )
        return(
            <div className='header-title'>
                <div className='user-title'>
                    <h5 className='item-tilte'>
                        Huy Phan
                    </h5>
                    <span className='role'>
                        admin
                    </span>
                </div>
                <div className='image-profile'>
                    <img src="./user.png" alt=""/>
                </div>
                <Popover placement='bottomLeft' trigger='click' content={content}> 
                    <div className='language'>

                            <Icon type="global" onClick={this.toggleLang}/>
                            <h5 onClick={this.toggleLang}>EN</h5>
                            <Icon type='down' onClick={this.toggleLang}/>
    
                    </div>
                </Popover>  
                {/* <div style={{width:120}} className={this.state.toggleLanguage ? 'dropdown-lang show' : 'dropdown-lang'}>
                    <Menu
                        mode='inline'
                        theme='dark'
                        
                    >
                        <Menu.Item key="1">English</Menu.Item>
                        <Menu.Item key="2">Tieng Viet</Menu.Item>
                    </Menu>
                </div> */}
            </div>
        )
    }
}
export default Header;