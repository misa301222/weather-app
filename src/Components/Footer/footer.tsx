import { Link } from "react-router-dom";
import './FooterStyles.scss';
import {
    Box,
    Container,
    Row,
    Column,
    Heading,
} from "./FooterStyles";

function Footer() {

    return (
        <Box className="bg-dark">
            <h1 className="yellowish" style={{
                color: "#FFD4A8",
                textAlign: "center",
                marginTop: "-50px",
                marginBottom: '0.7em'
            }}>
                <u> Weather App </u><i className="fas fa-laptop"></i>
            </h1>
            <Container>
                <Row>
                    <Column>
                        <Heading>About Us</Heading>
                        <Link className="link-style" to="/about-us">About</Link>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <Link className="link-style" to="/send-job-application">Send Job Application</Link>
                        <Link className="link-style" to="/search-by-country">Search by Country</Link>
                        <Link className="link-style" to="/search-by-city">Search by City</Link>
                    </Column>
                    <Column>
                        <Heading>About this App</Heading>
                        <Link className="link-style" to="/about-this-app">About this App</Link>
                    </Column>
                </Row>
            </Container>
        </Box>
    );

}

export default Footer;