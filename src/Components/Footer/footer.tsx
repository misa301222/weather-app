import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
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
                        <FooterLink href="/about-us">About</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <FooterLink href="/send-job-application">Send Job Application</FooterLink>                        
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>                        
                    </Column>                   
                </Row>
            </Container>
        </Box>
    );

}

export default Footer;