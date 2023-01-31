import Image from 'next/image'
import { useRouter } from "next/router";
import { useState } from 'react';
import {useSession} from "next-auth/react";
import {Container,Button} from "react-bootstrap"

import myimg from 'public/assets/img/boga.jpg'



const Footer = () => {

  const {data : session} = useSession() 
  const {push} = useRouter()
  
  const  goSignup = () => push("../auth/signup")
  return (
    <footer className='footer'>
      <Container fluid>
        <div className="footer-web">
          <div className="footer-web-left">
            <h4>Be the first to know about crypto news every day</h4>
            <p>Get crypto analysis, news and updates right to your inbox! Sign up here so you don't miss a single newsletter.</p>
            {session ? "" : <Button onClick={goSignup}>Sign up</Button>}
            <div style={{"marginTop":`${session ? "60px" : "0"}`}}>&copy; 2023 CoinMarket. All rights reserved</div>
          </div>
          <div className="footer-web-right" >
            <Image src={myimg} alt="/" />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer