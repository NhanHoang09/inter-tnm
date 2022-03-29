
interface IDataType {
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
