import React from 'react';
import {Icon,Dropdown} from 'antd';
class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const languageMenu = {
        
        }
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
                    <Dropdown>
                        <Icon type="global" />
                    </Dropdown>
                </div>
            </div>
        )
    }
}
export default Header;