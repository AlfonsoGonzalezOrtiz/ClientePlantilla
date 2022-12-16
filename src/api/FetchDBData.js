import axios from "axios";

//const API_BASE_URL = `https://plantilla-fast-api-vyyn.vercel.app`;
const API_BASE_URL = `http://127.0.0.1:8000`;

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

export const getHouseholdsFromEmail = async (email) => {
    var queryparam = '?email='
    if(email === ''){
      queryparam = '';
    }
    const res = await fetch(`${API_BASE_URL}/households/from/${queryparam}${email}`); 
    const data = await res.json();
    return data;
  };

export async function createHousehold(jsonData){
  console.log(jsonData);
  await axios.post(`${API_BASE_URL}/households/`,jsonData);
  };

  export async function editHousehold(id,jsonData){
    await axios.put(`${API_BASE_URL}/households/${id}`,jsonData);
    };