import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {eventRef} from '../../../firebase'
import {useEffect,useState} from 'react'
import {Table,Popconfirm,notification} from 'antd';
function EventList(props){
    const data = useSelector(state => state.dataRe);
    const [listEvent,setListEvent] = useState([]);
    useEffect(()=>{
        eventRef.orderByChild('date').once('value',function(snapshot) {
            var list = [];
            snapshot.forEach(function(childSnapShot) {
                var element = childSnapShot.val();
                list.push({
                    title:element.title ,
                    date:element.date ,
                    image:element.image ,
                    id:childSnapShot.key
                });
            })
            setListEvent(list);
        })
    },[listEvent]);
    const handleDelete = (id)=>{
        setListEvent([]);
        eventRef.child(id).remove();
        notification.success({
            message: 'Tựa đề thông báo',
            description:
                'Bạn đã xóa sự kiện thành công'
            })
    }
    const columns = [
        { title: 'TITLE', dataIndex: 'title', key: 'title' },
        { title: 'DATE', dataIndex: 'date', key: 'date' },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
          title: '',
          dataIndex: '',
          key: 'x',
          render: (text,record) => <Popconfirm title='Bạn có muốn xóa sự kiện này không' placement='topRight' onConfirm={()=> handleDelete(record.id)} okText="Yes" cancelText="No"><a>Delete</a></Popconfirm>,
        },
      ];
    return(
        <div className='event-list'>
            <Table
                columns={columns}
               
                dataSource={listEvent}
            />
        </div>
    )
}
export default EventList;