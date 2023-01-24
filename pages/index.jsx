import {Container} from "react-bootstrap"
import Coinlist from "./coinlist";


export default function Home({data}) {
  return (
    <main className="main">
      <Container fluid>
        <div className="main-web">
          <div className="main-web-title">
            <h1 className="h2">Today's Cryptocurrency Prices by Market Cap</h1>
          </div>
          <div className="main-web-section">
            <div className="markettable">
              <Coinlist data={data} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}


export async function getStaticProps(){
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
  const data = await response.json();

  return{
    props : {
      data,
    }
  }
}