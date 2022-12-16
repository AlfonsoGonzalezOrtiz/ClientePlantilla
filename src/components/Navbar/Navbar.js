import { Nav, Navbar, Container } from "react-bootstrap";

export const NavbarComponent = ({ auth: Auth }) => {

  let user = undefined;

  try {
    user = JSON.parse(localStorage.getItem('profile')).jti;
  } catch (e) {
    console.log(e);
  }

  return (
    <Navbar bg="light">
      <Container className="d-flex justify-content-start align-items-center mx-1">
        <Navbar.Brand
          href="/"
          className="mx-0 d-flex justify-content-center align-items-center"
        >
          <img
            src="https://i.imgur.com/P7KGTpL.png"
            alt="Brand"
            style={{ height: "40px", width: "50px" }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <Nav.Link href="/buscarParada/156">Buscar Parada</Nav.Link>
          <Nav.Link href="/map">Buscar Ubicación</Nav.Link>
        </Nav>
      </Container>
      <div className="ms-auto me-5">
        <Auth />
      </div>
    </Navbar>
  );
};
export default NavbarComponent;
