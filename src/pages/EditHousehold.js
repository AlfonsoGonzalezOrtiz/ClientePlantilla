import Container from "react-bootstrap/Container";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { editHousehold } from "../api/FetchDBData";
import { getHouseholdByID } from "../../src/api/FetchDBData";
import { useParams } from 'react-router-dom';

export default function EditHousehold() {

  const params = useParams().id;

  const gethouseholdMethod = async (params) => {
    const household = await getHouseholdByID(params);
    return household;
  };
  useEffect(() => {
    const temp = async () => {
      sethousehold(await gethouseholdMethod(params));
    };
    temp();
  }, [params]);

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



  var fecha = new Date().toISOString().slice(0, 10);
  if (household.stamp !== undefined) {
    fecha = new Date(household.stamp * 1000).toISOString().slice(0, 10);
  }

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { vendedor, description, numero, fecha, latitud, longitud } = formData;
    var jsonData = {
      "vendedor": vendedor,
      "description": description,
      "num": numero,
      "stamp": new Date(fecha).getTime(),
      "photos": ["C:\\fakepath\\vivienda.jpg"],
      "lat": latitud,
      "lon": longitud,
    }
    editHousehold(household.id, jsonData);

  };

  const [formData, setFormData] = useState({
    vendedor: "",
    description: "",
    numero: 0,
    fecha: "yyyy-MM-dd",
    images: [
      ""
    ],
    latitud: "",
    longitud: "",
  });


  const updateFormData = (event) => {
    const { name, value } = event.target;
    const res = { [name]: value };

    setFormData((prev) => {
      if (
        name === "vendedor"
      ) {
        res["vendedor"] = value;
      }
      if (
        name === "description"
      ) {
        res["description"] = value;
      }

      if (
        name === "numero"
      ) {
        res["numero"] = value;
      }

      if (
        name === "fecha"
      ) {
        res["fecha"] = value;
      }
      if (
        name === "images"
      ) {
        res["images"] = value;
      }
      if (
        name === "latitud"
      ) {
        res["latitud"] = value;
      }
      if (
        name === "longitud"
      ) {
        res["longitud"] = value;
      }
      return {
        ...prev,
        ...res,
      };
    });
  };
  

  return (
    <>
      <Container>
        <MDBRow>
          <Form onSubmit={submitHandler} className="list-group mb-3 d-flex">
            <MDBCol>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm mt-5">
                <Form.Group controlId="vendedor">
                  <Form.Label className="my-0">Vendedor: {household.vendedor}</Form.Label>
                  <Form.Control className="mt-3" type="email" name="vendedor" placeholder="Vendedor" onChange={updateFormData} value={formData.vendedor} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="description">
                  <Form.Label >Descripción: {household.description} </Form.Label>
                  <Form.Control className="mt-3" as="textarea" name="description" rows={4} placeholder="Una breve descripción..." onChange={updateFormData} value={formData.description} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="numero">
                  <Form.Label >Num: {household.num} </Form.Label>
                  <Form.Control className="mt-3" type="text" name="numero" placeholder="numero" onChange={updateFormData} value={formData.num} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol>
                  <Form.Group className="mw-25" controlId="fecha">
                    <Form.Label>Fecha: {fecha} </Form.Label>
                    <Form.Control className="mt-3" type="date" name="fecha" placeholder="Fecha" onChange={updateFormData} value={formData.fecha} required />
                  </Form.Group>
                </MDBCol>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="images">
                  <Form.Label >Imágenes: </Form.Label>
                  <Form.Control className="mt-3" type="file" name="images" multiple placeholder="Dirección de la vivienda" accept=".png,.jpg" onChange={updateFormData} />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="latitud">
                  <Form.Label >Latitud: {household.lat} </Form.Label>
                  <Form.Control className="mt-3" type="text" name="latitud" placeholder="Latitud" onChange={updateFormData} value={formData.latitud} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25" controlId="longitud">
                  <Form.Label >Longitud: {household.lon} </Form.Label>
                  <Form.Control className="mt-3" type="text" name="longitud" placeholder="Longitud" onChange={updateFormData} value={formData.longitud} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol className="d-flex justify-content-end col-sm-6">
                  <Button variant="primary" href="../">
                    Volver
                  </Button>
                </MDBCol>
                <MDBCol className="d-flex justify-content-start col-sm-6">
                  <Button variant="primary" type="submit">
                    Editar
                  </Button>
                </MDBCol>
              </MDBRow>

            </MDBCol>
          </Form>
        </MDBRow>
      </Container>
    </>
  );
}