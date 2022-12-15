import axios from "axios";

API_BASE_URL = 'https://api.imgur.com/3/upload'

export async function createHousehold(jsonData){
    await axios.post(`${API_BASE_URL}`,jsonData);
    };
  