import React from 'react';
import {Input,Button,Popconfirm} from 'antd';
import './event.scss';
import {useState} from 'react';
import marked from 'marked'
import {eventRef} from '../../firebase';
const {TextArea} = Input;
const Constant = {
    'TUADE':"td",
    'MUCNHO':'mn',
    'CHUINDAM':'cnd',
    'CHUNGHIENG':'cn',
    'HINHANH':'ha',
    'DSCOSO':'dscs',
    'DSLK':'dslk',
    'LIENKET':'lk'
}
marked.setOptions({
    breaks: true,
  });
const Event = (props)=>{
    const [text,setText] = useState("");
    const onChange = ()=>{
        var text = document.getElementById("text-display");
        setText(text.value);
    }
    const saveEvent = ()=>{
        eventRef.push({
            content:text.split("\n").join('\\n'),
            date:new Date(),

        });
    }
    const buttonEvent =(type)=>{
        switch (type) {
            case Constant.TUADE:
                setText(text+"\n"+" change_here \n =");
                break;
            case Constant.MUCNHO:
                setText(text+"\n"+"change_here \n -");
                break;
            case Constant.CHUINDAM:
                setText(text+"\n"+" - **change_here** ");
                break;
            case Constant.CHUNGHIENG:
                setText(text+"\n"+" _change_here_ ");
                break;
            case Constant.HINHANH:
                setText(text+"\n"+" ![](đường dẫn) ");
                break;
            case Constant.DSCOSO:
                setText(text+"\n"+" 1. change_here \n 2. change_here ");
                break;
            case Constant.DSLK:
                setText(text+"\n"+" - change_here ");
                break;
            case Constant.LIENKET:
                setText(text+"\n"+" [liên kết ](https://www.freecodecamp.com) ");
                break;
            default:
                break;
        }
    }
    return(
        <div className='event-layout'>
            <div className='edit-layout'>
                <TextArea id='text-display' value={text} onChange={onChange} placeholder="Nhập bài viết mới vào đây" autoSize autoSize={{ minRows: 1, maxRows: 2 }}/>
                <TextArea id='text-display' value={text} onChange={onChange} placeholder="Nhập bài viết mới vào đây" autoSize autoSize={{ minRows: 15, maxRows: 20 }}/>
                <div className='group-buttons'>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.TUADE)}}>
                    tựa đề
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.MUCNHO)}}>
                    mục nhỏ
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.CHUINDAM)}}>
                    chữ in đậm
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.CHUNGHIENG)}}>
                    chữ nghiêng
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.HINHANH)}}>
                    hình ảnh
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.DSCOSO)}}>
                    danh sách có số
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.DSLK)}}>
                    danh sách liệt kê
                </Button>
                <Button type="primary" size='small' onClick={()=>{buttonEvent(Constant.LIENKET)}}>
                    liên kết
                </Button>
   
                </div>
                <Popconfirm placement="top" title='Bạn có muốn lưu bài viết mới này' onConfirm={saveEvent} okText="Yes" cancelText="No">
                    <Button className='saveButton' type="dash" size='big'>
                        Save
                    </Button>
                </Popconfirm>

            </div>
            <div className='display-layout' dangerouslySetInnerHTML={{__html:marked(text)}}>

            </div>
        </div>

    )
}
export default Event;