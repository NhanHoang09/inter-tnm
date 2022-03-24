import { DeleteOutlined } from '@ant-design/icons'
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
} from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import {IDataType,IStateFilter} from "@lib/types"
import './table.css'

const { Option } = Select

const TableContainer = () => {
  const [filterData, setFilterData] = useState<IDataType[]>([])
  const [changeStatus, setChangeStatus] = useState<string>('')
  const [valueChecked, setValueChecked] = useState<IDataType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [reLoader, setReLoader] = useState<boolean>(false)
  const [totalPage, setTotalPage] = useState<number>()

  const [stateFilter, setStateFilter] = useState<IStateFilter>({
    _page: 1,
  })

  const styleTitleTable: any = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '150px',
  }

  const titleInputSelect = (title: string) => {
    return (
      <div style={styleTitleTable}>
        {title}
        <Select onChange={e => handleChangeInputSelect(e, title)}>
          <Option value="true">YES</Option>
          <Option value="false">NO</Option>
        </Select>
      </div>
    )
  }

  const customTitle = (title: string) => {
    return (
      <div style={{ ...styleTitleTable, marginBottom: '32px' }}>{title}</div>
    )
  }

  const columns = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            Quote ID
            <Input onChange={debounce(handleChangeQuoteId)} />
          </div>
        )
      },
      dataIndex: 'key',
    },

    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Care Recipient Name
            <Input onChange={debounce(handleChangeName)} />
          </div>
        )
      },
      dataIndex: 'care_recipient_name',
    },

    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Care Recipient DOB
            <DatePicker onChange={handleChangeBirthDay} />
          </div>
        )
      },
      dataIndex: 'care_recipient_dob',
    },
    {
      title: customTitle("Rate"),
      dataIndex: 'rate',
    },
    {
      title: titleInputSelect('Short Temp'),
      dataIndex: 'short_temp',

      render: (shortTerm: boolean) => {
        return shortTerm ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        )
      },
    },
    {
      title: titleInputSelect('Contagion'),
      dataIndex: 'contagion',
      render: (contagion: boolean) => {
        return contagion ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        )
      },
    },
    {
      title: titleInputSelect('Emergency'),
      dataIndex: 'emergency',
      render: (emergency: boolean) => {
        return emergency ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        )
      },
    },
    {
      title: titleInputSelect('Mileage Surcharge'),
      dataIndex: 'mileage_surcharge',
      render: (mileageSurcharge: boolean) => {
        return mileageSurcharge ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        )
      },
    },
    {
      title: titleInputSelect('Primary Quote'),
      dataIndex: 'primary_quote',
      render: (primaryQuote: boolean) => {
        return primaryQuote ? (
          <Tag color="blue">YES</Tag>
        ) : (
          <Tag color="red">NO</Tag>
        )
      },
    },
    {
      title: () => {
        return (
          <div style={styleTitleTable}>
            Start Date
            <DatePicker onChange={handleChangeStartDate} />
          </div>
        )
      },
      dataIndex: 'start_date',
    },
    {
      title: customTitle("Created Date"),
      dataIndex: 'created_date',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        )
      },
    },

    {
      title: customTitle("Created By"),
      dataIndex: 'created_by',
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length
      },
    },
    {
      title: customTitle("Updated Date"),
      dataIndex: 'updated_date',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.updated_date).getTime() -
          new Date(b.updated_date).getTime()
        )
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
        )
      },
      dataIndex: 'status',
    },
    {
      title: customTitle("Delete"),
      render: (record: IDataType) => (
        <DeleteOutlined onClick={() => handleRemove(record.key)} />
      ),
    },
  ]

  const onSelectChange = (
    record: IDataType,
    selected: boolean,
    selectedRows: IDataType[]
  ) => {
    setValueChecked(selectedRows)
  }

  const rowSelection = {
    onSelect: onSelectChange,
    onSelectNone: () => {
      // setStatus("");
    },
  }

  const handleFilter = async (params: IStateFilter) => {
    setLoading(true)
    const response = await axios.get(
      'https://tablemanage.herokuapp.com/table?',
      { params: params }
    )
    setFilterData(response.data)
    setLoading(false)
    setTotalPage(response.data.length)
  }

  useEffect(() => {
    handleFilter(stateFilter)
  }, [stateFilter, reLoader])

  const handleChangeInputSelect = (value: string, key: string) => {
    if (key === 'Short Temp') {
      setStateFilter({ ...stateFilter, short_temp: value })
    }
    if (key === 'Contagion') {
      setStateFilter({ ...stateFilter, contagion: value })
    }
    if (key === 'Emergency') {
      setStateFilter({ ...stateFilter, emergency: value })
    }
    if (key === 'Mileage Surcharge') {
      setStateFilter({ ...stateFilter, mileage_surcharge: value })
    }
    if (key === 'Primary Quote') {
      setStateFilter({ ...stateFilter, primary_quote: value })
    }
  }

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number = 1000
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter({ ...stateFilter, q: e.target.value })
  }

  const handleChangeQuoteId = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter({ ...stateFilter, quote_id: e.target.value })
  }

  const handleChangeBirthDay = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setStateFilter({ ...stateFilter, care_recipient_dob: dateString })
  }

  const handleChangeStartDate = (
    dataDate: moment.Moment | null,
    dateString: string
  ) => {
    setStateFilter({ ...stateFilter, start_date: dateString })
  }

  const handleChangeStatus = (value: string) => {
    setStateFilter({ ...stateFilter, status: value })
  }

  const handleRemove = async (key: string) => {
    setFilterData(filterData.filter((item: IDataType) => item.key !== key))
  }

  const handlePaginationChange = (page: number) => {
    setStateFilter({ ...stateFilter, _page: page })
  }

  const handleSubmit = () => {
    valueChecked.map(async item => {
      await axios.put(`https://tablemanage.herokuapp.com/table/${item.id}`, {
        ...item,
        status: changeStatus,
      })
      setReLoader(!reLoader)
    })
  }

  return (
    <div className="container">
      <Row gutter={16}>
        <Col span="6">
          <div className="input-container">
            <Select
              placeholder="Change status"
              className="select-input"
              onChange={(value: string) => setChangeStatus(value)}>
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
          type: 'checkbox',
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
  )
}

export default TableContainer
