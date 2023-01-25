import { useRouter } from "next/router";
import { useState } from "react";
import {Container,ButtonGroup,Button} from "react-bootstrap"
import Coinlist from "../coinlist";
const CoinPages = ({data}) => {
  const {push} = useRouter()
  const [pageNumber,setPageNumber] = useState(1)

  const keno = () => {
    push(`${pageNumber+1}`);
    setPageNumber(pageNumber+1)
    console.log(pageNumber);
  }
  
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
        <Button variant="secondary" onClick={()=>push(`../`)}>1</Button>
        <Button variant="secondary" onClick={keno}>{pageNumber+ 1}</Button>
        <Button variant="secondary" onClick={keno}>{pageNumber+ 2}</Button>
        <Button variant="secondary" onClick={keno}>{pageNumber+ 3}</Button>
        <Button variant="secondary" onClick={keno}>{pageNumber+ 4}</Button>
      </ButtonGroup>
    </Container>

  </main>
  )
}

export default CoinPages


export async function getServerSideProps({params}) {
	const request = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${params.id}&sparkline=false`);
	const data = await request.json();
	return {
		props: {
			data,
		},
	}
}
