import { useRouter } from "next/router";
import { useState } from "react";
import {Container,ButtonGroup,Button} from "react-bootstrap"
import Coinlist from "./coinlist";





export default function Home({data}) {
  const {push} = useRouter();

  return (
    <main className="main">
      <Container fluid>
        <div className="main-web">
          <div className="main-web-title">
            <h1 className="h2">Today's Cryptocurrency Prices by Market Cap</h1>
          </div>
          <div className="main-web-section">
            <div className="markettable">
              <Coinlist data={data}/>
            </div>
          </div>
        </div>
        <ButtonGroup aria-label="Basic example" style={{"display":"flex","gap" : "0 15px","justifyContent":"space-between"}}>
          <Button variant="secondary" onClick={()=>push(`/`)}>1</Button>
          <Button variant="secondary" onClick={()=>push(`coinPages/${2}`)}>2</Button>
          <Button variant="secondary" onClick={()=>push(`coinPages/${3}`)}>3</Button>
          <Button variant="secondary" onClick={()=>push(`coinPages/${4}`)}>4</Button>
          <Button variant="secondary" onClick={()=>push(`coinPages/${5}`)}>5</Button>
        </ButtonGroup>
      </Container>
    </main>
  )
}


  export async function getServerSideProps(){
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    const data = await response.json();

    return{
      props : {
        data,
      }
    }
  }