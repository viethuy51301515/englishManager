import './studentList.scss';
import React from 'react';
import ReactDom from 'react-dom';
import {Table,Input,Button,Icon} from 'antd';
import Highlighter from 'react-highlight-words';
import MainTitle from '../../layout/mainTitle'
class StudentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            searchedColumn: '',
        }
        this.getColumnSearchProps = this.getColumnSearchProps.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                }}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    render(){
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              sorter : (a,b) => a.name.length - b.name.length,
              ellipsis: true,
              render: text => <a>{text}</a>,
              ...this.getColumnSearchProps('name')
            },
            {
                title:"age",
                key:"age",
                dataIndex:'age',
                sorter : (a,b) => a-b
            },
            {
                title:"age",
                key:"age",
                dataIndex:'age',
                sorter : (a,b) => a-b
            },
            {
                title:"age",
                key:"age",
                dataIndex:'age',
                sorter : (a,b) => a-b
            },
            {
                title:"tags",
                key:"tags",
                dataIndex:"tags",   
            },
            {
              title:"",
                key:"action",
                dataIndex:"action",   
                render: (text, record) =>(
                    <span>
                      <Icon type='delete' />
                    </span>
                )
            }
        ]
        const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags:  'developer',
            },
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags:  'developer',
              },
        ]
        return(
            <div>
                <div>
                    <MainTitle title="Student List" />  
                </div>
                <div style={{background:'white',padding:"15px"}}>
                    <div>
                        <h3>All Students</h3>
                        <Icon type='reload' style={{color:'orange'}} onClick="" />
                    </div>
                    <div className='layoutSearch'>
                        <Input placeholder="Search by student name"></Input>
                        <Input placeholder="Search by class name"></Input>
                        <Button type="primary" style={{background:'orange'}}> Search</Button>
                    </div>
                    <Table style={{border: '1px solid #e0e0e0'}} columns={columns} dataSource={data} pagination={{pageSize:50}}/>
                </div>
            </div>
        );
    }
}
export default StudentList;