import { useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { ParadaMarkers } from "../components/Map/ParadaMarkers";
import { useEffect, useState } from "react"; 
import { getParadas } from "../api/FetchDBParada";
import { MDBRow,MDBCol } from "mdbreact";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const MyMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      //Center map on position
      map.flyTo([position.lat, position.lng]);
    }, [position, map]);
  
    return null;
  };

export default function HomeParada() {
    
    const getParadasMethod = async () => {
        const parada = await getParadas();
        return parada;
      };
      const [parada, setparada] = useState([
        {
          codLinea: 1,
          nombreLinea: '',
          sentido: 1,
          orden: 1,
          codParada: 1,
          nombreParada: '',
          direccion: '',
          lat: 1.1,
          lon: 1.1,
        }]);
    
      useEffect(() => {
        const temp = async () => {
          setparada(await getParadasMethod());
        };
        temp();
      }, []);
    
      const latlngObject = {
        lat: 36.737835,
        lng: -4.4222507
      };

      const [formData, setFormData] = useState({
        codLinea: 1,
        sentido: 1,
      });

      const updateFormData = (event) => {
        const { name, value } = event.target;
        const res = { [name]: value };
    
        setFormData((prev) => {
          if (
            name === "codLinea"
          ) {
            res["codLinea"] = value;
          }
          if (
            name === "sentido"
          ) {
            res["sentido"] = value;
          } 
          return {
            ...prev,
            ...res,
          };
        });
      };
      const [isLoading, setIsLoading] = useState(false);

    return (
      <>
        <h1 className="d-flex justify-content-center"> Paradas </h1>
        <MapContainer
                  className="rounded-5 order-lg-last col-sm-6"
                  style={{
                    height: "300px"
                  }}
                  center={latlngObject}
                  zoom={16.5}
                  scrollWheelZoom={false}
                >
                  <MyMap position={latlngObject} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ParadaMarkers requestData={parada} />
                </MapContainer>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >N??mero de L??nea: </Form.Label>
                  <Form.Control className="mt-3" type="number" name="codLinea" placeholder="codLinea" onChange={updateFormData} value={formData.codLinea} required />
                </Form.Group>
              </MDBRow>
              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Sentido (1/2): </Form.Label>
                  <Form.Control className="mt-3" type="number" name="sentido" placeholder="sentido" onChange={updateFormData} value={formData.sentido} required />
                </Form.Group>
              </MDBRow>
              <MDBCol className="d-flex justify-content-start col-sm-6">
                  <Button variant="primary" type="submit" href={`/sentido/${formData.sentido}/linea/${formData.codLinea}`}>
                    Buscar
                  </Button>
                </MDBCol>
      </>
    );
  }
  