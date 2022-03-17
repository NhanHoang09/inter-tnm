import axios from "axios";

const Url = "https://my.api.mockaroo.com/table.json?key=50de74f0";

const fetchData = async () => {
  const response = await axios.get(Url);
  return response;
}

export default fetchData;