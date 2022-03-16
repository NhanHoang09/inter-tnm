import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select, Table, Tag } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import fetchData from "../api/index";

const { Option } = Select;

function TableContainer() {
  const [data, setData] = useState<IDataType[]>([]);
  const [filterData, setFilterData] = useState<IDataType[]>([]);
  



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

  const handleChangeShortTerm = (value: string) => {
    if (value === "true") {
      const newData = data.filter((item) => item.short_term === true);
      setFilterData(newData);
    }
    if (value === "false") {
      const newData = data.filter((item) => item.short_term === false);
      setFilterData(newData);
    }
  };
  const handleChangeContagion = (value: string) => {
    if (value === "true") {
      const newData = data.filter((item) => item.contagion === true);
      setFilterData(newData);
    }
    if (value === "false") {
      const newData = data.filter((item) => item.contagion === false);
      setFilterData(newData);
    }
  };
  const handleChangeEmergency = (value: string) => {
    if (value === "true") {
      const newData = data.filter((item) => item.emergency === true);
      setFilterData(newData);
    }
    if (value === "false") {
      const newData = data.filter((item) => item.emergency === false);
      setFilterData(newData);
    }
  };
  const handleChangeMileageSurcharge = (value: string) => {
    if (value === "true") {
      const newData = data.filter((item) => item.mileage_surcharge === true);
      setFilterData(newData);
    }
    if (value === "false") {
      const newData = data.filter((item) => item.mileage_surcharge === false);
      setFilterData(newData);
    }
  };
  const handleChangePrimaryQuote = (value: string) => {
    if (value === "true") {
      const newData = data.filter((item) => item.primary_quote === true);
      setFilterData(newData);
    }
    if (value === "false") {
      const newData = data.filter((item) => item.primary_quote === false);
      setFilterData(newData);
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((item: IDataType) => {
      return e.target.value
        ? item.name.toLowerCase().includes(e.target.value.toLowerCase())
        : item;
    });
    setFilterData(newData);
  };

  const handleChangeQuoteId = (e: ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((item: IDataType) => {
      return e.target.value
        ? item.quote_id.toLowerCase().includes(e.target.value.toLowerCase())
        : item;
    });
    setFilterData(newData);
  };

  const handleChangeBirthDay = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const date = new Date(dateString).getTime();

    const newData = data.filter((item: IDataType) => {
      const DataDate = new Date(item.birthday).getTime();
      return dateString ? DataDate === date : item;
    });
    setFilterData(newData);
  };

  const handleChangeStartDate = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const date = new Date(dateString).getTime();

    const newData = data.filter((item: IDataType) => {
      const DataDate = new Date(item.start_date).getTime();
      return dateString ? DataDate === date : item;
    });
    setFilterData(newData);
  };

  const handleChangeStatus = (value: string) => {
    if (value === "new") {
      const newData = data.filter((item) => item.status === "new");
      setFilterData(newData);
    }
    if (value === "approved") {
      const newData = data.filter((item) => item.status === "approved");
      setFilterData(newData);
    }
    if (value === "rejected") {
      const newData = data.filter((item) => item.status === "rejected");
      setFilterData(newData);
    }
    if (value === "closed") {
      const newData = data.filter((item) => item.status === "closed");
      setFilterData(newData);
    }
  };

  const handleRemove = (id: any) => {
    const newData = data.filter((dataItem: IDataType) => {
      return dataItem.key !== id.id;
    });
    setData(newData);
  };

  useEffect(() => {
    const fetchDataTable = async () => {
      const response = await fetchData();
      setData(response.data);
      setFilterData(response.data);
    };
    fetchDataTable();
  }, []);

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select placeholder="Change status" className="select-input">
              <Option value="Option"> </Option>
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
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={filterData}
        size="small"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default TableContainer;
