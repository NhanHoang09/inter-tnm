import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select, Table, Tag } from "antd";
import fetchData from "../api/index";
import React from "react";

const { Option } = Select;

function TableContainer() {
  const [data, setData] = React.useState<IDataType[]>([]);

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Quote ID
            <Input />
          </div>
        );
      },
      dataIndex: "quote_id",
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Care Recipient Name
            <Input />
          </div>
        );
      },
      dataIndex: "name",
    },

    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Care Recipient DOB
            <DatePicker />
          </div>
        );
      },
      dataIndex: "birthday",
    },
    {
      title: "Rate",
      dataIndex: "rate",
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Short Term
            <Select onChange={handleChangeInput}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "short_term",

      render: (shortTerm: boolean) => {
        return shortTerm ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Contagion
            <Select>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "contagion",
      render: (contagion: boolean) => {
        return contagion ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Emergency
            <Select>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "emergency",
      render: (emergency: boolean) => {
        return emergency ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Mileage Surcharge
            <Select>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "mileage_surcharge",
      render: (mileageSurcharge: boolean) => {
        return mileageSurcharge ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Primary Quote
            <Select>
              <Option value={true}>YES</Option>
              <Option value={false}>NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "primary_quote",
      render: (primaryQuote: boolean) => {
        return primaryQuote ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Start Date
            <DatePicker />
          </div>
        );
      },
      dataIndex: "start_date",
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        );
      },
    },

    {
      title: "Created By",
      dataIndex: "created_by",
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length;
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updated_date",
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.updated_date).getTime() -
          new Date(b.updated_date).getTime()
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            Status
            <Select showSearch placeholder="Select a status">
              <Option value="new">new</Option>
              <Option value="approved">approved</Option>
              <Option value="rejected">rejected</Option>
              <Option value="closed">closed</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "status",
    },
    {
      title: "Delete",
      render: () => <DeleteOutlined />,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement> ) => {
    console.log(e.target.value);

      const newData: IDataType[] = data.filter(item => item.short_term === true)
      setData(newData);
    

  }

  React.useEffect(() => {
    const fetchDataTable = async () => {
      const response = await fetchData();
      setData(response.data);
    };
    fetchDataTable();
  }, []);

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select placeholder="Change status" className="select-input">
              <Option value="Option1">new</Option>
              <Option value="Option2">approved</Option>
              <Option value="Option3">rejected</Option>
              <Option value="Option4">closed</Option>
            </Select>
          </div>
        </Col>
        <Col span="6">
          <Button size="large" className="btn btn-default">
            Apply
          </Button>
        </Col>
      </Row>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default TableContainer;
