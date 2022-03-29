import { useMutation } from 'react-query'
import useQuery from '@lib/useQuery'
import type { UseQueryOptions} from '@lib/types'

export interface IDataType {
  id: number
  key: string
  quote_id: string
  name: string
  care_recipient_dob: string
  rate: number
  short_term: boolean
  contagion: boolean
  emergency: boolean
  mileage_surcharge: boolean
  primary_quote: boolean
  start_date: string
  created_date: string
  created_by: string
  updated_date: string
  status: string
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

export const useUpdateData = (options: any) => {
  const { mutate } = useMutation(
    (data: Partial<IDataType | undefined>) =>
      request('https://tablemanage.herokuapp.com/table/{id}', {
        method: 'PUT',
        body: data,
      }),
    {
      ...options,
    }
  )

  return  mutate
}

export const useDeleteData = (options: any) => {
  const { mutate } = useMutation(
    (data: Partial<IDataType | undefined>) =>
      request('https://tablemanage.herokuapp.com/table/{id}', {
        method: 'DELETE',
        body: data,
      }),
    {
      ...options,
    }
  )

  return  mutate ;
}