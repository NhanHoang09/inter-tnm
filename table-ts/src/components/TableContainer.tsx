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
import axios from "axios";

const { Option } = Select;

const TableContainer: React.FC = () => {
  const [filterData, setFilterData] = useState<IDataType[]>([]);
  const [changeStatus, setChangeStatus] = useState<string>("");
  const [valueChecked, setValueChecked] = useState<IDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reLoader, setReLoader] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>();
  const [stateFilter, setStateFilter] = useState<Object>({
    _page: 1,
    quote_id: null,
    q: null,
    care_recipient_dob: null,
    short_temp: null,
    contagion: null,
    emergency: null,
    mileage_surcharge: null,
    primary_quote: null,
    start_date: null,
    status: null,
  });

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
          <div style={{ textAlign: "center" }}>
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
            <DatePicker onChange={handleChangeBirthDay} />
          </div>
        );
      },
      dataIndex: "care_recipient_dob",
    },
    {
      title: () => {
        return (
          <div style={{ ...styleTitleTable, marginBottom: "32px" }}>Rate</div>
        );
      },
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
            <DatePicker onChange={handleChangeStartDate} />
          </div>
        );
      },
      dataIndex: "start_date",
    },
    {
      title: () => {
        return (
          <div style={{ ...styleTitleTable, marginBottom: "32px" }}>
            Created Date
          </div>
        );
      },
      dataIndex: "created_date",
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        );
      },
    },

    {
      title: () => {
        return (
          <div style={{ ...styleTitleTable, marginBottom: "32px" }}>
            Created By
          </div>
        );
      },
      dataIndex: "created_by",
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length;
      },
    },
    {
      title: () => {
        return (
          <div style={{ ...styleTitleTable, marginBottom: "32px" }}>
            Updated Date
          </div>
        );
      },
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
      render: (record: IDataType) => (
        <DeleteOutlined onClick={() => handleRemove(record.key)} />
      ),
    },
  ];

  const onSelectChange = (
    record: IDataType,
    selected: boolean,
    selectedRows: IDataType[]
  ) => {
    setValueChecked(selectedRows);
  };

  const rowSelection = {
    onSelect: onSelectChange,
    onSelectNone: () => {
      // setStatus("");
    },
  };

  const handleFilter = async (params: object) => {
    setLoading(true);
    const response = await axios.get(
      "https://tablemanage.herokuapp.com/table?",
      { params: params }
    );
    setFilterData(response.data);
    setLoading(false);
    setTotalPage(response.data.length);
  };

  useEffect(() => {
    handleFilter(stateFilter);
  }, [stateFilter, reLoader]);

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
    setStateFilter({ ...stateFilter, q: e.target.value });
  };

  const handleChangeQuoteId = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter({ ...stateFilter, quote_id: e.target.value });
  };

  const handleChangeBirthDay = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setStateFilter({ ...stateFilter, care_recipient_dob: dateString });
  };

  const handleChangeStartDate = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setStateFilter({ ...stateFilter, start_date: dateString });
  };

  const handleChangeStatus = (value: string) => {
    setStateFilter({ ...stateFilter, status: value });
  };

  const handleRemove = async (key: string) => {
    setFilterData(filterData.filter((item: IDataType) => item.key !== key));
  };

  const handlePaginationChange = (page: number) => {
    setStateFilter({ ...stateFilter, _page: page });
  };

  const handleSubmit = () => {
    valueChecked.map(async (item) => {
      await axios.put(`https://tablemanage.herokuapp.com/table/${item.id}`, {
        ...item,
        status: changeStatus,
      });
      setReLoader(!reLoader);
    });
  };

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select
              placeholder="Change status"
              className="select-input"
              onChange={(value: string) => setChangeStatus(value)}
            >
              <Option value="new">new</Option>
              <Option value="approved">approved</Option>
              <Option value="rejected">rejected</Option>
              <Option value="closed">closed</Option>
            </Select>
          </div>
        </Col>
        <Col span="6">
          <Button className="btn btn-default" onClick={handleSubmit}>
            Apply
          </Button>
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
        pagination={false}
      />
      <Pagination
        className="pagination"
        total={100}
        onChange={handlePaginationChange}
        hideOnSinglePage={true}
      />
    </div>
  );
};

export default TableContainer;
