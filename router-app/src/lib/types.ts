import type {
  UseQueryOptions as ReactUseQueryOptions,
  UseMutateFunction,
} from 'react-query'

export interface UseQueryOptions extends ReactUseQueryOptions {
  variables?: {
    [key: string]: any
    current?: number
    size?: number
    id?: React.Key
  }
}

export type MutationResult<TData = any, TVariables = any> = [
  boolean,
  UseMutateFunction<TData, Error | undefined, TVariables, unknown>
]

export interface MutationOptions<T = any>
  extends Omit<ReactUseQueryOptions<T>, 'onSuccess'> {
  onSuccess?: (response: any) => any
  successText?: string
  displayMessage?: boolean
  displayError?: boolean
}

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

export interface IStateFilter {
  _page: number,
  quote_id?: string,
  q?: string,
  care_recipient_dob?: string,
  short_temp?: string,
  contagion?: string,
  emergency?: string,
  mileage_surcharge?: string,
  primary_quote?: string,
  start_date?: string,
  status?: string,
}








