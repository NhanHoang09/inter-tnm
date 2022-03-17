import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import fetchData from "../api/index";

const { Option } = Select;

function TableContainer() {
  const [filterData, setFilterData] = useState<IDataType[]>([]);
  const [inputStatus, setInputStatus] = useState<string>("");

  const dateFormat = "MM/DD/YYYY";

  const styleTitleTable: object = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "150px",
  };

  const columns = [
    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Quote ID
            <Input onChange={handleChangeQuoteId} />
          </div>
        );
      },
      dataIndex: "quote_id",
    },

    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Care Recipient Name
            <Input onChange={handleChangeName} />
          </div>
        );
      },
      dataIndex: "name",
    },

    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Care Recipient DOB
            <DatePicker onChange={handleChangeBirthDay} format={dateFormat} />
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
          <div style={styleTitleTable}>
            Short Term
            <Select onChange={handleChangeShortTerm}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
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
          <div style={styleTitleTable}>
            Contagion
            <Select onChange={handleChangeContagion}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
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
          <div style={styleTitleTable}>
            Emergency
            <Select onChange={handleChangeEmergency}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
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
          <div style={styleTitleTable}>
            Mileage Surcharge
            <Select onChange={handleChangeMileageSurcharge}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
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
          <div style={styleTitleTable}>
            Primary Quote
            <Select onChange={handleChangePrimaryQuote}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
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
          <div style={styleTitleTable}>
            Start Date
            <DatePicker onChange={handleChangeStartDate} format={dateFormat} />
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
          <div style={styleTitleTable}>
            Status
            <Select onChange={handleChangeStatus} placeholder="Select a status">
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
      render: () => <DeleteOutlined onClick={handleRemove}/>,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      selectedRows.map(item => setInputStatus(item.status))
    },
    selection: (key : string) => {
      console.log(key);
      
    }
  };

  const handleChangeShortTerm = async (value: string) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item : IDataType) => item.short_term + '' === value ))
  };
  const handleChangeContagion = async (value: string) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item : IDataType) => item.contagion + '' === value ))
  };
  const handleChangeEmergency = async (value: string) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item : IDataType) => item.emergency + '' === value ))
  };
  const handleChangeMileageSurcharge = async (value: string) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item : IDataType) => item.mileage_surcharge + '' === value ))
  };
  const handleChangePrimaryQuote = async (value: string) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item : IDataType) => item.primary_quote + '' === value ))
  };

  const handleChangeName = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await fetchData()
    setFilterData(response.data.filter((item : IDataType) => e.target.value ? item.name.toLowerCase().includes(e.target.value.toLowerCase()) : item))
  };

  const handleChangeQuoteId = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await fetchData()
    setFilterData(response.data.filter((item : IDataType) => e.target.value ? item.quote_id.toLowerCase().includes(e.target.value.toLowerCase()) : item))

  };

  const handleChangeBirthDay = async (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const date = new Date(dateString).getTime();
    const response = await fetchData()
    setFilterData(response.data.filter((item : IDataType) => {
      const DataDate = new Date(item.birthday).getTime();
      return dateString ? DataDate === date : item;
    }));
  };

  const handleChangeStartDate = async (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const date = new Date(dateString).getTime();
    const response = await fetchData()
    setFilterData(response.data.filter((item : IDataType) => {
      const DataDate = new Date(item.start_date).getTime();
      return dateString ? DataDate === date : item;
    }));
  };

  const handleChangeStatus = async (value: string) => {
    const response = await fetchData()
    response.data.map((item : IDataType) => { 
      if(item.status === value) {
        const newData = response.data.filter((item : IDataType) => item.status === value);
        setFilterData(newData);
      }
    })

  };

  const handleRemove = async (id: any) => {
    const response = await fetchData()
    setFilterData(response.data.filter((item : IDataType) => item.key !== id));

  };

  useEffect(() => {
    const fetchDataTable = async () => {
      const response = await fetchData();
      setFilterData(response.data);
    };
    fetchDataTable();
  }, []);

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select placeholder="Change status" className="select-input" defaultValue={inputStatus}>
              <Option value="Option1">new</Option>
              <Option value="Option2">approved</Option>
              <Option value="Option3">rejected</Option>
              <Option value="Option4">closed</Option>
            </Select>
          </div>
        </Col>
        <Col span="6">
          <Button className="btn btn-default">Apply</Button>
        </Col>
      </Row>
      <Table
        className="table-container"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={filterData}
        size="small"
        rowClassName="row-class"
      />
      {/* <Pagination defaultCurrent={1} total={50} /> */}
    </div>
  );
}

export default TableContainer;
