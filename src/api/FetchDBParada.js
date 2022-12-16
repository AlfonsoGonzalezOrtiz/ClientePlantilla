import axios from "axios";

const API_BASE_URL = `https://plantilla-fast-api-vyyn.vercel.app`;
//const API_BASE_URL = `http://127.0.0.1:8000`;

export const buscarSentidoYLinea = async (sentido,linea) => {
    const res = await fetch(`${API_BASE_URL}/paradas/sentido/${sentido}/linea/${linea}`);
    const data = await res.json();
    return data;
};

export const getParadas = async () => {
    const res = await fetch(`${API_BASE_URL}/paradas/`);
    var data = await res.json();
    return data;
};

export const getBuscarParada = async (parada) => {
    const res = await fetch(`${API_BASE_URL}/paradas/${parada}`);
    var data = await res.json();
    console.log(data);
    return data;
};