
interface IDataType {
  key: React.Key;
  quote_id: string;
  name: string;
  birthday: dateTime;
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

interface IStateFilter {
  
  quote_id: any;
  name: any;
  birthday: any;
  short_temp: any;
  contagion: any;
  emergency: any;
  mileage_surcharge: any;
  primary_quote: any;
  start_date: any;
  status: any;
}