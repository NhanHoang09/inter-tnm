import axios from "axios";

const Url = "https://tablemanage.herokuapp.com/table?";

const fetchData = async () => {
  const response = await axios.get(`${Url}&_page=1`);
  return response;
}

const paginationData = async (page: number) => {
  const response = await axios.get(`${Url}&_page=${page}`);
  return response;
}

const statusData = async (value: string) => {
  const response = await axios.get(`${Url}&status=${value}`);
  return response;
}

const quoteData = async (value: string) => {
  const response = await axios.get(`${Url}&quote=${value}`);
  return response;
}

const nameData = async (value: string) => {
  const response = await axios.get(`${Url}&care_recipient_name=${value}`);
  return response;
}

const birthdayData = async (value: string) => {
  const response = await axios.get(`${Url}&care_recipient_dob=${value}`);
  return response;
}

const startDateData = async (value: string) => {
  const response = await axios.get(`${Url}&start_date=${value}`);
  return response;
}

export  {fetchData, paginationData,statusData,quoteData,nameData,birthdayData,startDateData};