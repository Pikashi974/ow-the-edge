import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PortalButton from "./PortalExample";

export default function NavbarApp() {
  return (
    <Navbar className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Ow the Edge</Navbar.Brand>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <NavDropdown title="Yu-Gi-Oh">
            <NavDropdown.Item href="/Tierlist">Tierlist</NavDropdown.Item>
            <NavDropdown.Item href="/Numbers-Evaille">
              Numbers Eveil
            </NavDropdown.Item>
            <NavDropdown.Item href="/yugioh-converter">
              Yu-Gi-Oh Converter
            </NavDropdown.Item>
            <NavDropdown.Item href="/ow-the-edge">Ow the Edge</NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className="d-flex clipping-container">
          <PortalButton />
        </div>
      </Container>
    </Navbar>
  );
}
