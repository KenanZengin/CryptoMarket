import Image from "next/image";
import { useRouter } from "next/router";
import {Container,ButtonGroup,Button} from "react-bootstrap"
import Coinlist from "./coinList/coinlist";





export default function Home({data}) {
  const {push} = useRouter();
  const router = useRouter();
  console.log(router.asPath);

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
          <div className="main-web-bottom">
            <ul>
              <li><Image src={"/assets/img/left.png" } alt="/" width={18} height={18} disabled /></li>
              <li  className="active" >1</li>
              <li  onClick={()=>push(`coinPages/${2}`)}>2</li>
              <li  onClick={()=>push(`coinPages/${3}`)}>3</li>
              <li  onClick={()=>push(`coinPages/${4}`)}>4</li>
              <li  onClick={()=>push(`coinPages/${5}`)}>5</li>
              <li  onClick={()=>push(`coinPages/${2}`)}><Image src={"/assets/img/right.png"} alt="/" width={18} height={18} /></li>
            </ul>
          </div>
        </div>
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