import React, {useState} from 'react'
import useQuery from '@lib/useQuery'
import { UseQueryOptions } from '@lib/types'


export interface IDataType {
  id: number;
  key: string;
  quote_id: string;
  name: string;
  care_recipient_dob: string;
  rate: number;
  short_term: boolean;
  contagion: boolean;
  emergency: boolean;
  mileage_surcharge: boolean;
  primary_quote: boolean;
  start_date: string;
  created_date: string;
  created_by: string;
  updated_date: string;
  status: string;
}


export const useData = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<IDataType[]>(
    `https://tablemanage.herokuapp.com/table`,
    options
  )
  return {
    ...rest,
    data,
  }
}

export const useQueryData = ({
  variables,
  ...options
}: UseQueryOptions = {}) => {
  const [query, setQuery] = useState<{ [key: string]: any }>()
  const { data, ...rest } = useQuery<IDataType>(
    `https://tablemanage.herokuapp.com/table/{id}`,
    {
      ...options,
      variables: { ...variables, ...query },
      enabled: !!variables?.id || !!query?.id,
    }
  )

  const refetch = (values: { [key: string]: any }) => {
    setQuery(values)
  }

  return {
    ...rest,
    data,
    refetch,
  }
}

const updateData = (data: { [key: string]: any }) => {
  console.log(data)
}