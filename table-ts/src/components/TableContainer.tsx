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
import {fetchData,paginationData,statusData,quoteData,nameData,birthdayData,startDateData} from "../api/index";

const { Option } = Select;

function TableContainer() {
  const [filterData, setFilterData] = useState<IDataType[]>([]);
  const [inputStatus, setInputStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<IStateFilter>({
    short_temp: '',
    contagion: '',
    emergency: '',
    mileage_surcharge: '',
    primary_quote: '',
  });

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
            <Input onChange={debounce(handleChangeQuoteId)} />
          </div>
        );
      },
      dataIndex: "key",
    },

    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Care Recipient Name
            <Input onChange={debounce(handleChangeName)} />
          </div>
        );
      },
      dataIndex: "care_recipient_name",
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
      dataIndex: "care_recipient_dob",
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
            <Select onChange={(e) => handleChangeInputSelect(e, "short_temp")}>
              <Option value="true">YES</Option>
              <Option value="false">NO</Option>
            </Select>
          </div>
        );
      },
      dataIndex: "short_temp",

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
            <Select onChange={(e) => handleChangeInputSelect(e, "contagion")}>
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
            <Select onChange={(e) => handleChangeInputSelect(e, "emergency")}>
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
            <Select onChange={(e) => handleChangeInputSelect(e, "mileage_surcharge")}>
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
            <Select onChange={(e) => handleChangeInputSelect(e, "primary_quote")}>
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
      render: () => <DeleteOutlined onClick={handleRemove} />,
    },
  ];

  const rowSelection = {
    onSelect: (record: IDataType, selected: boolean, selectedRows: IDataType[] ) => {
    setStatus(record.status)
    console.log(status);
    },
    onSelectNone: () => {
      setStatus("")
    }
  };


  const handleChangeInputSelect = (value:boolean, key : string) => {
  console.log("🚀 ~ file: TableContainer.tsx ~ line 261 ~ handleChangeInputSelect ~ key", key)
  console.log("🚀 ~ file: TableContainer.tsx ~ line 261 ~ handleChangeInputSelect ~ value", value)
  }

  // const handleChangeShortTerm = async (value: string) => {
  //   setStateFilter({...stateFilter, short_temp :value})
  // };
  
  // const handleChangeContagion = async (value: string) => {

  // };

  // const handleChangeEmergency = async (value: string) => {

  // };

  // const handleChangeMileageSurcharge = async (value: string) => {

  // };

  // const handleChangePrimaryQuote = async (value: string) => {
 
  // };

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number = 1000
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const handleChangeName = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await nameData(e.target.value);
    setFilterData(response.data)
  }

  const handleChangeQuoteId = async (e: ChangeEvent<HTMLInputElement>) => {
    const response = await quoteData(e.target.value);
    setFilterData(response.data)
    // setFilterData(
    //   response.data.filter((item: IDataType) =>
    //     e.target.value
    //       ? item.quote_id.toLowerCase().includes(e.target.value.toLowerCase())
    //       : item
    //   )
    // );
  };

  const handleChangeBirthDay = async (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const response = await birthdayData(dateString);
    setFilterData(response.data);
  };

  const handleChangeStartDate = async (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    const response = await startDateData(dateString);
    setFilterData(response.data);
  };

  const handleChangeStatus = async (value: string) => {
    const response = await statusData(value);
    setFilterData(response.data)
    
  };

  const handleRemove = async (id: any) => {
    const response = await fetchData();
    setFilterData(response.data.filter((item: IDataType) => item.key !== id));
  };


  const handlePaginationChange = async (page: number) => {
    setLoading(true);
    const response = await paginationData(page);
    setFilterData(response.data);
    setCurrentPage(page);
    setTotalPages(response.data.length);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchDataTable = async () => {
      const response = await fetchData();
      setFilterData(response.data);
    setLoading(false);
    };
    fetchDataTable();
  }, []);


  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select
              placeholder="Change status"
              className="select-input"
              defaultValue={status}
            >
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
        loading={loading}
        size="small"
        rowClassName="row-class"
        pagination={{pageSize: 10,total: 50,current: currentPage,onChange: handlePaginationChange}}
      />

    </div>
  );
}

export default TableContainer;
