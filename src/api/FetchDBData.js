import axios from "axios";

const API_BASE_URL = `https://plantilla-fast-api-vyyn.vercel.app`;
//const API_BASE_URL = `http://127.0.0.1:8000`;

export const getHouseholdByID = async (id) => {
    const res = await fetch(`${API_BASE_URL}/households/${id}`);
    const data = await res.json();
    return data;
};

export const gethouseholds = async () => {
    const res = await fetch(`${API_BASE_URL}/households/`);
    var data = await res.json();
    return data;
};

export const getHouseholdsFromUser = async (username) => {
    const res = await fetch(`${API_BASE_URL}/households/filter/username?name=${username}`); 
    const data = await res.json();
    return data;
  };

export async function createHousehold(jsonData){
  console.log(jsonData);
  await axios.post(`${API_BASE_URL}/households/`,jsonData);
  };

  export async function editHousehold(id,jsonData){
    id = "c0a0c167-0ff0-4339-a88b-e0e579020291"
    await axios.put(`${API_BASE_URL}/households/${id}`,jsonData);
    };