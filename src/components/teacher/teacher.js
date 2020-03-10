import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
// import {eventRef} from '../../../firebase'
import {useEffect,useState} from 'react'
import {Table,Popconfirm,notification,Modal, Form, Icon, Input, Button, Upload, message} from 'antd';
import {teacherRef} from '../../firebase';
import {teacherStore} from '../../firebase';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
        this.props.changeImg(info.file.originFileObj);
        }
      );
    }
  };
  // componentDidMount (){
  //   this.props.changeImg(this.state.imageUrl);
  // }
  render() {
    const uploadButton = (
      <div>
        {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}
const EdtitableTeacher = (props) =>{
  // const {visible,setVisible} = useState(props.isVisible);
  const [data,setData] = useState({
    name:"",
    pos:"",
    des:"",
    id:""
  });
  
  const handleSubmit = ()=>{
    var id = document.getElementById("id").value;
        if(id != ""){
          teacherRef.child(id).update({
                name:data.name,
                pos:data.pos,
                des:data.des,
            });
        }
        else{
          teacherRef.push({
              name:data.name,
              pos:data.pos,
              des:data.des,
            });
        }
      teacherStore.child("1").put(data.image).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });
        props.reload();
  }
  const changeValue = (id) =>{
    var dataTemp = {
      name: id =='name' ? document.getElementById("name").value : data.name,
      pos:id =='pos' ? document.getElementById("pos").value : data.pos,
      des:id =='des' ? document.getElementById("des").value : data.des,
      id:data.id,
      image:data.image
    }
    setData(dataTemp);
  }
  const changeImg = (image) =>{

    var dataTemp = {
      name: data.name,
      pos:data.pos,
      des:data.des,
      id:data.id,
      image:image
    }
    setData(dataTemp);
    console.log(dataTemp);
  }
  useEffect(()=>{
    var dataTemp = {
      "name":props.data.name,
      "pos":props.data.pos,
      "des":props.data.des,
      "id":props.data.id,
    }
    console.log("uf"+props.data.name);
    setData(dataTemp);
  },[props.data])
  return(
    <div>
      <Modal
                visible={props.isVisible}
                footer=''
                title='Thông tin giáo viên'
                onOk={() => props.setModalVisible(false)}
                onCancel={() => props.setModalVisible(false)}
                >
            
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name" id='name' value={data.name} onChange={() =>  changeValue("name")}
                />
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                id='pos'
                placeholder="Position"
                value={data.pos}
                onChange={() =>  changeValue("pos")}
                />
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                id='des'
                placeholder="Description"
                value={data.des}
                onChange={() =>  changeValue("des")}
                />
            <Avatar changeImg={changeImg} />
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                id='id'
                placeholder="id"
                value={data.id}
                onChange={() =>  changeValue("id")}
                />
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                Save
            </Button>
        </Modal>
    </div>
  )
}
function Teacher(props){
    const data = useSelector(state => state.dataRe);
    const [selectedData,setSelectedData] = useState({});
    const [isShowModal,setShowModal] = useState(false);
    const [listTeacher,setListTeacher] = useState([]);
    const [isReload,setReload] = useState(false);
    useEffect(()=>{
      teacherRef.orderByChild('name').once('value',function(snapshot) {
          var list = [];
          snapshot.forEach(function(childSnapShot) {
              var element = childSnapShot.val();
              list.push({
                  name:element.name ,
                  pos:element.pos ,
                  des: element.des,
                  id:childSnapShot.key,
                  image:element.image 
              });
          })
          setListTeacher(list);
          console.log("!23");
      })
    },[isReload]);
    const changeReload = ()=>{
      setReload(!isReload);
    }
    const columns = [
        { title: 'NAME', dataIndex: 'name', key: 'name',editable: true },
        { title: 'POSITION', dataIndex: 'pos', key: 'pos',sorter: (a, b) => a.name.length - b.name.length, },
        { title: 'DESCRIPTION', dataIndex: 'des', key: 'des',sorter: (a, b) => a.name.length - b.name.length,  },
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Image', dataIndex: 'image', key: 'image',render: (text,record) => <div><img style={{height:'40px',width:"auto"}} src={record.image} ></img></div> },
        {
          title: '',
          dataIndex: '',
          key: 'x',
          render: (text,record) => <Popconfirm title='Bạn có muốn xóa sự kiện này không' placement='topRight' onConfirm={()=> {setSelectedData(record);setShowModal(true)}} okText="Yes" cancelText="No"><a>Edit</a></Popconfirm>,
        },
      ];
      const setModalVisible = (visible) =>{
        setShowModal(visible);
      }
    return(
        <div className='event-list'>
            <Table
                columns={columns}
               
                dataSource={listTeacher}
            />
            <EdtitableTeacher reload={changeReload} data={selectedData} isVisible={isShowModal} setModalVisible={setModalVisible} />
        </div>
    )
}
export default Teacher;