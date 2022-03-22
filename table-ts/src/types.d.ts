
interface IDataType {
  id: number;
  key: string;
  quote_id: string;
  name: string;
  care_recipient_dob: dateTime;
  rate: number;
  short_term: boolean;
  contagion: boolean;
  emergency: boolean;
  mileage_surcharge: boolean;
  primary_quote: boolean;
  start_date: dateTime;
  created_date: dateTime;
  created_by: string;
  updated_date: dateTime;
  status: string;
}
