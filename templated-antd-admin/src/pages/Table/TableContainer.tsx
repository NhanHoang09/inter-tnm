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
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IDataType, IStateFilter } from '@lib/types'
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

  const titleInputSelect = (name: string, title: string) => {
    return (
      <div style={styleTitleTable}>
        {name}
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

  const valueInputSelect = (value: boolean) => {
    return value ? <Tag color="blue">YES</Tag> : <Tag color="red">NO</Tag>
  }

  const titleInputSearch = (name: string, value: string) => {
    return (
      <div style={{ ...styleTitleTable, width: 'auto' }}>
        {name}
        <Input
          style={{ width: 'auto' }}
          onChange={debounce(e =>
            handleChangeInputSearch(e.target.value, value)
          )}
        />
      </div>
    )
  }

  const titleInputDate = (name: string, value: string) => {
    return (
      <div style={styleTitleTable}>
        {name}
        <DatePicker
          onChange={(dataDate: moment.Moment | null, dateString: string) =>
            handleChangeDateTime(dateString, value)
          }
        />
      </div>
    )
  }

  const columns = [
    {
      title: titleInputSearch('Quote ID', 'key'),
      dataIndex: 'key',
    },

    {
      title: titleInputSearch('Care Recipient Name', 'q'),
      dataIndex: 'care_recipient_name',
    },

    {
      title: titleInputDate('Care Recipient DOB', 'care_recipient_dob'),
      dataIndex: 'care_recipient_dob',
    },
    {
      title: customTitle('Rate'),
      dataIndex: 'rate',
    },
    {
      title: titleInputSelect('Short Temp', 'short_temp'),
      dataIndex: 'short_temp',

      render: valueInputSelect,
    },
    {
      title: titleInputSelect('Contagion', 'contagion'),
      dataIndex: 'contagion',
      render: valueInputSelect,
    },
    {
      title: titleInputSelect('Emergency', 'emergency'),
      dataIndex: 'emergency',
      render: valueInputSelect,
    },
    {
      title: titleInputSelect('Mileage Surcharge', 'mileage_surcharge'),
      dataIndex: 'mileage_surcharge',
      render: valueInputSelect,
    },
    {
      title: titleInputSelect('Primary Quote', 'primary_quote'),
      dataIndex: 'primary_quote',
      render: valueInputSelect,
    },
    {
      title: titleInputDate('Start Date', 'start_date'),
      dataIndex: 'start_date',
    },
    {
      title: customTitle('Created Date'),
      dataIndex: 'created_date',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        )
      },
    },

    {
      title: customTitle('Created By'),
      dataIndex: 'created_by',
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length
      },
    },
    {
      title: customTitle('Updated Date'),
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
      title: customTitle('Delete'),
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

  const handleChangeInputSelect = (value: string, name: string) => {
    setStateFilter({ ...stateFilter, [name]: value })
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

  const handleChangeInputSearch = (value: string, name: string) => {
    setStateFilter({ ...stateFilter, [name]: value })
  }

  const handleChangeDateTime = (value: string, name: string) => {
    setStateFilter({ ...stateFilter, [name]: value })
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
