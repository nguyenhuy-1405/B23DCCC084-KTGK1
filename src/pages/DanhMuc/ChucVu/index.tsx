import TableBase from '@/components/Table';
import { type IColumn } from '@/components/Table/typing';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import { useModel } from 'umi';
import Form from './components/Form';
import moment from 'moment';

const ChucVuPage = () => {
  const { setEdit, setVisibleForm, setRecord, getModel, page, limit, deleteModel } =
    useModel('danhmuc.chucvu');

  const handleEdit = (record: ChucVu.IRecord) => {
    setRecord(record);
    setVisibleForm(true);
    setEdit(true);
  };

  const columns: IColumn<ChucVu.IRecord>[] = [
    {
      title: 'Mã',
      dataIndex: 'ma',
      width: 80,
      filterType: 'select',
      filterData: ['M01', 'M02', 'M03'],
      sortable: true,
    },
    {
      title: 'Tên chức vụ',
      dataIndex: 'ten',
      width: 250,
      filterType: 'string',
      sortable: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'center',
      width: 120,
      filterType: 'datetime',
      sortable: true,
      render: (val) => moment(val).format('HH:mm DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: ChucVu.IRecord) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <Button onClick={() => handleEdit(record)} type="primary" shape="circle">
              <EditOutlined />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Xóa">
            <Popconfirm
              onConfirm={() => deleteModel(record._id, getModel)}
              title="Bạn có chắc chắn muốn xóa chức vụ này?"
              placement="topLeft"
            >
              <Button danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <TableBase
      columns={columns}
      dependencies={[page, limit]}
      modelName="danhmuc.chucvu"
      title="Chức vụ"
      Form={Form}
      buttons={{ import: true }}
    />
  );
};

export default ChucVuPage;
