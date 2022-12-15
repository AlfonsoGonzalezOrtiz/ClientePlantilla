import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import { useParams} from 'react-router-dom';
import { getHouseholdByID } from "../../src/api/FetchDBData";
import { useEffect, useState } from "react";
import React from 'react';
import { Carousel, Container, Form, Image } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { MapContainer } from "react-leaflet";
import { HouseholdMarkers } from "../components/Map/HouseholdMarkers";

//Esto es pa crear una linea divisora
//<div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>

const MyMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    //Center map on position
    map.flyTo([position.lat, position.lng]);
  }, [position, map]);

  return null;
};

export default function Household() {

  const params = useParams().id;

  const gethouseholdMethod = async (params) => {
    const household = await getHouseholdByID(params);
    return household;
  };
  const [household, sethousehold] = useState([
    {
      id: '',
      vendedor: '',
      description: '',
      num: '',
      photos: [''],
      lat: 1.1,
      lon: 1.1,
      stamp: 1.1
    }]);

  useEffect(() => {
    const temp = async () => {
      sethousehold(await gethouseholdMethod(params));
    };
    temp();
  }, [params]);

  var latlngObject1 = {
    lat: 0,
    lng: 0
  };
  if (household.lat !== undefined && household.lon) {
    latlngObject1 = {
      lat: household.lat,
      lng: household.lon
    };
  }
  const latlngObject = latlngObject1;

  //let enlaceCancel = `/household/${params}?startingDate=${startingDate}&endingDate=${endingDate}&personas=${personas}`;
  //let enlaceOK = `/paypalGateway/${price_total}`;

  var fecha = new Date().toISOString().slice(0, 10);
  if (household.stamp !== undefined) {
    fecha = new Date(household.stamp * 1000).toISOString().slice(0, 10);
  }

  const constfecha = fecha;

  var photos = [];
  if (household.photos !== undefined) {
    photos = household.photos;
  }
  const photos_const = photos;

  return (
    <>
      <Container>
        <MDBRow>
          <Form className="list-group mt-5 d-flex">
            <MDBCol>
              <MDBRow className="justify-content-center">
                <Carousel className="col-sm-6">
                  {photos_const.map((url) => (
                    <Carousel.Item key={url}>
                      <Image src={url}
                        style={{
                          height: "300px"
                        }}
                      ></Image>
                    </Carousel.Item>
                  ))}
                </Carousel>
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
                  <HouseholdMarkers requestData={[household]} />
                </MapContainer>
              </MDBRow>
              <MDBRow className="list-group-item d-flex justify-content-between lh-sm mt-5">
                <Form.Group controlId="vendedor">
                  <Form.Label className="my-0">Vendedor:</Form.Label>
                  <Form.Control className="mt-3" type="text" placeholder="Vendedor" defaultValue={household.vendedor} />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="description">
                  <Form.Label >Descripción:</Form.Label>
                  <Form.Control className="mt-3" as="textarea" rows={4} placeholder="Una breve descripción..." defaultValue={household.description} />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="Numero">
                  <Form.Label >Num: </Form.Label>
                  <Form.Control className="mt-3" type="text" placeholder="Numero" defaultValue={household.num} />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol>
                  <Form.Group className="mw-25" controlId="Fecha">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control className="mt-3" type="text" placeholder="Fecha" defaultValue={constfecha} />
                  </Form.Group>
                </MDBCol>
                <MDBCol>
                  <Form.Group className="mw-25" controlId="maxNumOccupants">
                    <Form.Label>Número máximo de huéspedes:</Form.Label>
                    <Form.Control className="mt-3" type="number" placeholder="Ej: 5" />
                  </Form.Group>
                </MDBCol>
                <Button className="mt-5" variant="primary" type="submit" href="../">
                    Volver
                </Button>
              </MDBRow>
            </MDBCol>
          </Form>
        </MDBRow>
      </Container>
    </>
  );
}
