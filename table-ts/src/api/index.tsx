import axios from "axios";

const Url = "https://my.api.mockaroo.com/tablets.json?key=91527ab0";

const fetchData = async () => {
  const response = await axios.get(Url);
  return response;
}

export default fetchData;