import React from 'react';
import {Input,Button,Popconfirm,DatePicker} from 'antd';

import './event.scss';
import {useState} from 'react';
import marked from 'marked'
import {eventRef} from '../../firebase';
import { moment } from 'moment';
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
    const [date,setDate] = useState("");
    const onChange = ()=>{
        var text = document.getElementById("text-display");
        setText(text.value);
    }
    function changeDate(date, dateString) {
        setDate(dateString);
    }
    const saveEvent = ()=>{
        eventRef.push({
            content:text.split("\n").join('\\n'),
            date:date,
            image:document.getElementById("main-image").value,
            title:document.getElementById("title-display").value
        });
    }
    const genExample = ()=>{
        const test = `
Giáo dục trực tuyến là giải pháp tối ưu cho học sinh đối phó dịch bệnh?
========================
[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-

1. Type in stuff on the left.
2.See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.
![](https://goo.gl/Umyytc)

Why Markdown?
-------------

_It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [123](https://www.freecodecamp.com) says,_

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/
![](https://goo.gl/Umyytc)
            `;
            setText(test);
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
                <TextArea id='title-display'  placeholder="Nhập bài viết mới vào đây" autoSize autoSize={{ minRows: 1, maxRows: 2 }}/>
                <Input id='main-image' placeholder='hình ảnh lớn'></Input>
                <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" onChange={changeDate}/>
                <TextArea id='text-display' value={text} onChange={onChange} placeholder="Nhập bài viết mới vào đây" autoSize autoSize={{ minRows: 15, maxRows: 15 }}/>
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
                <Button className='example' type="dash" size='big' onClick={genExample}>
                        Example 
                </Button>
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