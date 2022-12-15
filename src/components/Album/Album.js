import { CardGroup, Container, Row } from "react-bootstrap";
import {gethouseholds} from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const AlbumComponent = () => {

  let user = undefined;

    try{
        user = JSON.parse(localStorage.getItem('profile')).email;
    } catch (e) {
        console.log(e);
    }

  const gethouseholdsMethod = async () => {
    var households = await gethouseholds();
    return households
  };
    const [households, sethouseholds] = useState([
      {
      id: '',
      vendedor: '',
      description: '',
      num: '',
      photos: [''],
      lat: 1.1,
      lon: 1.1,
      stamp: 1.1,
      email: ''
    }]);

    useEffect(() => {
      const temp = async () => {
        sethouseholds(await gethouseholdsMethod())
      }
      temp()
    }, []);

    function emptyList(){
      if(households.length === 0){
          return <h3 className="mx-auto">No hay anuncios disponibles</h3>
      }else{
          return null
      }
  }

  return (
    <CardGroup className="py-5 bg-white">
      <Container>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {emptyList()}
          {households.map((household) => (
            <CardComponent key={household.id}
              household={household}
              user={user}
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;