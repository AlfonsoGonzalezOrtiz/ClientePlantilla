import { CardGroup, Container, Row } from "react-bootstrap";
import {getHouseholdsFromEmail} from "../../../src/api/FetchDBData";
import CardComponent from "../Card/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const AlbumComponent = () => {

  var email = null;
  try{
      email = JSON.parse(localStorage.getItem('profile')).email;
  } catch (e) {
      console.log(e);
  }
  const user = useParams().id;

  if(user === undefined && email !== null){
    email = '';
  }
  if(user === undefined && email === null){
    email = '';
  }

  const gethouseholdsFromEmailMethod = async (email) => {
    var households = await getHouseholdsFromEmail(email);
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
        sethouseholds(await gethouseholdsFromEmailMethod(email))
      }
      temp()
    }, [email]);

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
            ></CardComponent>
          ))}
        </Row>
      </Container>
    </CardGroup>
  );
};

export default AlbumComponent;