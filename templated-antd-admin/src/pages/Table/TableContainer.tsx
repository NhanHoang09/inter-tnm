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
  Modal,
  Layout,
} from 'antd'
import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useData, useUpdateData, useDeleteData, IDataType } from './queries'
import './table.css'

const { Option } = Select

interface IFilter {
  [key: string]: string | number | boolean
}

const TableContainer = () => {
  const [changeStatus, setChangeStatus] = useState<string>('')
  const [valueChecked, setValueChecked] = useState<IDataType[]>([])
  const [stateFilter, setStateFilter] = useState<{
    [key: string]: string | number | boolean
  }>({
    _page: 1,
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const { data, isFetching, refetch } = useData({
    variables: stateFilter,
  })

  let history = useHistory()

  const convertQueryStringToObject = (queryString: string) => {
    const query = queryString.split('&')
    const result: any = {}
    query.forEach((item) => {
      const [key, value] = item.split('=')
      result[key] = value
    })
    return result
  }

  const handleDefaultValue = (value: string) => {
    const params = history.location.search
    return convertQueryStringToObject(params)[value]
  }
  const handleSetUrl = () => {
    const params = history.location.search.substring(1)
    setStateFilter({...stateFilter,...convertQueryStringToObject(params)})
  }

  useEffect(() => {
    handleSetUrl()
  },[]);

  const styleTitleTable: any = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '130px',
  }

  const titleInputSelect = (name: string, title: string) => {
    return (
      <div style={styleTitleTable}>
        {name}
        <Select
          allowClear={true}
          onChange={value => {handleFilter({ [title]: value })}}
          defaultValue={handleDefaultValue(title)}
          >
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

  const titleInputSearch = (name: string, values: string) => {
    return (
      <div style={{ ...styleTitleTable, width: 'auto' }}>
        {name}
        <Input
          value={handleDefaultValue(values)}
          style={{ width: 'auto' }}
          onChange={debounce(e =>
            handleFilter({ [values]: e.target.value.trim() })
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
        defaultValue={handleDefaultValue(value)}
          onChange={(dataDate: moment.Moment | null, dateString: string) =>
            handleFilter({ [value]: dateString })
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
      dataIndex: 'careRecipientName',
    },

    {
      title: titleInputDate('Care Recipient DOB', 'care_recipient_dob'),
      dataIndex: 'careRecipientDob',
    },
    {
      title: customTitle('Rate'),
      dataIndex: 'rate',
    },
    {
      title: titleInputSelect('Short Temp', 'short_temp'),
      dataIndex: 'shortTemp',

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
      dataIndex: 'mileageSurcharge',
      render: valueInputSelect,
    },
    {
      title: titleInputSelect('Primary Quote', 'primary_quote'),
      dataIndex: 'primaryQuote',
      render: valueInputSelect,
    },
    {
      title: titleInputDate('Start Date', 'start_date'),
      dataIndex: 'startDate',
    },
    {
      title: customTitle('Created Date'),
      dataIndex: 'createdDate',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        )
      },
    },

    {
      title: customTitle('Created By'),
      dataIndex: 'createdBy',
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length
      },
    },
    {
      title: customTitle('Updated Date'),
      dataIndex: 'updatedDate',
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
            <Select
              allowClear={true}
              onChange={value => handleFilter({ status: value })}
              placeholder="Select a status">
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
        <DeleteOutlined
          onClick={() => {
            setShowModal(true)
            setValueChecked([record])
          }}
        />
      ),
    },
  ]

  

  const rowSelection = {
    // onSelect: onSelectChange,
    onSelectAll: (selected: boolean, selectedRows: IDataType[]) => {
      setValueChecked(selectedRows)
    },
    onChange: (selectedRowKeys : any, selectedRows: IDataType[]) => {
      setValueChecked(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    },
    preserveSelectedRowKeys: true
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

  const handleConvertObjectToString = (params: {
    [key: string]: string | number | boolean
  }) => {
    let queryString = Object.keys(params)
      .map(key => {
        if (params[key] !== undefined && params[key] !== '') {
          return key + '=' + params[key]
        }
      })
      .join('&')
    return queryString
  }

  const handleQueryString = (params : any) => {
    const queryString = new URLSearchParams(
      handleConvertObjectToString(params)
    ).toString()
    return queryString
  }

  const handleFilter = (value: IFilter) => {
    history.push({ pathname: '/quotes', search: handleQueryString({...stateFilter, ...value}) })
    setStateFilter({ ...stateFilter, ...value })
  }

  const mutationOpts = {
    onSuccess: () => {
      refetch()
    },
  }

  const handleUpdate = useUpdateData(mutationOpts)

  const handleSubmit = () => {
    valueChecked.map(item => {
      return handleUpdate({ ...item, status: changeStatus })
    })
    setValueChecked([])
    setChangeStatus('')
  }

  const handleDelete = useDeleteData(mutationOpts)

  const handleOk = (values: Partial<IDataType[]>) => {
    values.map(value => handleDelete(value))
    setShowModal(false)
    setValueChecked([])
  }

  return (
    <>
      <Layout>
        <Row className="m-12">
          <Col span={24} className="flex items-center justify-start">
            <Select
              allowClear={true}
              placeholder="Change status"
              className="w-280"
              value={changeStatus}
              onChange={setChangeStatus}>
              <Option value="new">new</Option>
              <Option value="approved">approved</Option>
              <Option value="rejected">rejected</Option>
              <Option value="closed">closed</Option>
            </Select>
            <Button
              className="btn btn-default ml-12"
              onClick={handleSubmit}
              disabled={!changeStatus}>
              Apply
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              className="table-container"
              scroll={{ x: 0 }}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              loading={isFetching}
              size="small"
              rowClassName="row-class"
              pagination={false}
            />
            <Pagination
              className="pagination"
              total={100}
              onChange={(page: number) => {
                handleFilter({_page: page })
              }}
              hideOnSinglePage={true}
            />
          </Col>
        </Row>
      </Layout>
      <Modal
        title="Confirm Delete"
        visible={showModal}
        onOk={() => handleOk(valueChecked)}
        onCancel={() => setShowModal(false)}>
        <p>Are you sure?</p>
      </Modal>
    </>
  )
}

export default TableContainer
