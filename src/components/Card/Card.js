import { ButtonGroup, Card, Col, Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardComponent = ({ household, user }) => {

    //const startDate= new Date(household['availability'][0][0]['$date']).toLocaleDateString()
    //const endDate = new Date(household['availability'][0][1]['$date']).toLocaleDateString()
    
    function Editar() {
        if (user !== undefined) {
            return <Link to={`/editHousehold/${household.id}`}><button type="button" className="btn btn-md btn-success">Editar</button></Link>
        }
        return null;
    }

    return (
        <Col>
            <Card>
                <Carousel>
                    {household.photos.map((url) => (
                        <Carousel.Item key={url}>
                            <Image src={url}
                                style={{
                                    height: "300px"
                                }}
                            ></Image>
                        </Carousel.Item>
                    ))}

                </Carousel>
                <Card.Body>
                    <Card.Title>{household.vendedor}</Card.Title>
                    <Card.Text className='p-2 mb-4'>{household.description}</Card.Text>
                    <ButtonGroup>
                        <Link to={`/household/${household.id}`}><button type="button" className="btn btn-md btn-primary">Mostrar</button></Link>
                        {Editar()}
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CardComponent;