import { DeleteOutlined } from "@ant-design/icons";
import { Divider, Table, Input, Select, Button, Tag, Row, Col } from "antd";
import axios from "axios";
import React from "react";

const { Option } = Select;

const columns = [
  {
    title: "Quote ID",
    dataIndex: "quote_id",
  },
  {
    title: "Care Recipient Name",
    dataIndex: "name",
  },

  {
    title: "Care Recipient DOB",
    dataIndex: "birthday",
  },
  {
    title: "Rate",
    dataIndex: "rate",
  },
  {
    title: "Short Term",
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
    title: "Contagion",
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
    title: "Emergency",
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
    title: "Mileage Surcharge",
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
    title: "Primary Quote",
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
    title: "Start Date",
    dataIndex: "start_date",
  },
  {
    title: "Created Date",
    dataIndex: "created_date",
  },
  {
    title: "Created By",
    dataIndex: "created_by",
    filterDropdown: () => {return <input />}

  },
  {
    title: "Updated Date",
    dataIndex: "updated_date",
  },
  {
    title: "Status",
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

function TableContainer() {
  const [data, setData] = React.useState<IDataType[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://my.api.mockaroo.com/table.json?key=50de74f0"
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Divider />
      <Row>
        <Col span="8">
          <div className="input-container">
              <Select placeholder="Change status" className="select-input">
                <Option value="Option1">new</Option>
                <Option value="Option2">approved</Option>
                <Option value="Option3">rejected</Option>
                <Option value="Option4">closed</Option>
              </Select>
          </div>
        </Col>
        <Col span="8">
          <Button size="small" className="btn btn-default">
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
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default TableContainer;
