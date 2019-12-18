import './studentList.scss';
import React from 'react';
import ReactDom from 'react-dom';
import {Table} from 'antd';
import MainTitle from '../../layout/mainTitle'
class StudentList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
        ]
        const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
        ]
        return(
            <div>
                <div>
                    <MainTitle title="123" />  
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}
export default StudentList;