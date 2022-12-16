import Container from "react-bootstrap/Container";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createHousehold } from "../api/FetchDBData";
import { useEffect,useRef } from "react";



export default function CreateHousehold() {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const url = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dcxme26dj',
      uploadPreset: 'xfqhdhea'

    }, function (error, result) {
      console.log(result);
      if (result.info !== undefined && result.info.url !== undefined) {
        url.current = result.info.url;
      }
      return url;
    });

  }, [url])

  const [formData, setFormData] = useState({
    vendedor: "",
    description: "",
    numero: 0,
    fecha: 1.1,
    images: [
      ""
    ],
    latitud: "",
    longitud: "",
  });

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
      "photos": [url.current],
      "lat": latitud,
      "lon": longitud,
    }
    createHousehold(jsonData);

  };

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
                <Form.Group>
                  <Form.Label className="my-0">Vendedor:</Form.Label>
                  <Form.Control className="mt-3" type="email" name="vendedor" placeholder="Vendedor" onChange={updateFormData} value={formData.vendedor} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Descripción:</Form.Label>
                  <Form.Control className="mt-3" as="textarea" name="description" rows={4} placeholder="Una breve descripción..." onChange={updateFormData} value={formData.description} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Num: </Form.Label>
                  <Form.Control className="mt-3" type="number" name="numero" placeholder="numero" onChange={updateFormData} value={formData.numero} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <MDBCol>
                  <Form.Group className="mw-25">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control className="mt-3" type="date" name="fecha" placeholder="Fecha" onChange={updateFormData} value={formData.fecha} required />
                  </Form.Group>
                </MDBCol>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Imágenes:</Form.Label>
                  <Button onClick={() => widgetRef.current.open()}>
                    Upload
                  </Button>
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Latitud: </Form.Label>
                  <Form.Control className="mt-3" type="text" name="latitud" placeholder="Latitud" onChange={updateFormData} value={formData.latitud} required />
                </Form.Group>
              </MDBRow>

              <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                <Form.Group className="mw-25">
                  <Form.Label >Longitud: </Form.Label>
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
                    Crear
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