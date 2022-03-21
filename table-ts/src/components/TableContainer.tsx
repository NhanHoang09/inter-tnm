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
// import {fetchData,paginationData,statusData,quoteData,nameData,birthdayData,startDateData} from "../api/index";
import axios from "axios";

const { Option } = Select;

const TableContainer: React.FC = () => {
  const [filterData, setFilterData] = useState<IDataType[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<any>({
    _page: 1,
    quote_id: null,
    name: null,
    birthday: null,
    short_temp: null,
    contagion: null,
    emergency: null,
    mileage_surcharge: null,
    primary_quote: null,
    start_date: null,
    status: null,
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
            <Select
              onChange={(e) => handleChangeInputSelect(e, "mileage_surcharge")}
            >
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
            <Select
              onChange={(e) => handleChangeInputSelect(e, "primary_quote")}
            >
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
    onSelect: (
      record: IDataType,
      selected: boolean,
      selectedRows: IDataType[]
    ) => {
      setStatus(record.status);
      console.log(status);
    },
    onSelectNone: () => {
      setStatus("");
    },
  };


  const handleFilter = async (params: object) => {
    const response = await axios.get(
      "https://tablemanage.herokuapp.com/table?",
      { params: params }
    );
    console.log(
      "🚀 ~ file: TableContainer.tsx ~ line 286 ~ handleFilter ~ response",
      response
    );
    setFilterData(response.data);
  };

  useEffect(() => {
    handleFilter(stateFilter);
  }, [stateFilter]);


  const handleChangeInputSelect = (value: string, key: string) => {
    if (key === "short_temp") {
      setStateFilter({ ...stateFilter, short_temp: value });
    }
    if (key === "contagion") {
      setStateFilter({ ...stateFilter, contagion: value });
    }
    if (key === "emergency") {
      setStateFilter({ ...stateFilter, emergency: value });
    }
    if (key === "mileage_surcharge") {
      setStateFilter({ ...stateFilter, mileage_surcharge: value });
    }
    if (key === "primary_quote") {
      setStateFilter({ ...stateFilter, primary_quote: value });
    }
  };

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

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter({ ...stateFilter, name: e.target.value });
  };

  const handleChangeQuoteId = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter({ ...stateFilter, quote_id: e.target.value });
  };

  const handleChangeBirthDay = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setStateFilter({ ...stateFilter, birth_day: dateString });
  };

  const handleChangeStartDate = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setFilterData({ ...stateFilter, start_date: dateString });
  };

  const handleChangeStatus = (value: string) => {
    setStateFilter({ ...stateFilter, status: value });
  };

  // const handleRemove = async (id: any) => {
  //   const response = await fetchData();
  //   setFilterData(response.data.filter((item: IDataType) => item.key !== id));
  // };

  const handlePaginationChange = (page: number) => {
  console.log("🚀 ~ file: TableContainer.tsx ~ line 340 ~ handlePaginationChange ~ page", page)
    setFilterData({ ...stateFilter, _page: page });
    console.log("🚀 ~ file: TableContainer.tsx ~ line 342 ~ handlePaginationChange ~ stateFilter", stateFilter)
  };

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
        pagination={{
          pageSize: 10,
          total: 100,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
};

export default TableContainer;
