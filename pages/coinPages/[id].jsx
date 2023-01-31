import Image from "next/image";
import { useRouter } from "next/router";
import {Container} from "react-bootstrap"
import Coinlist from "../coinList/coinlist";

const CoinPages = ({data}) =>{

  const {push} = useRouter()
  const router = useRouter()
  const {id} = router.query;

  


  const previousPage =  () =>{
    push(`${parseInt(id)-1}`)
    if(router.asPath == ('/coinPages/2')){
      push('../')
    }
  }
  const nextPage1 = () => {
    push(`${parseInt(id)+1}`);  
  }
  const nextPage2 = () => {
    push(`${parseInt(id)+2}`);  
  }
  const nextPage3 = () => {
    push(`${parseInt(id)+3}`);  
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
        <div className="main-web-bottom">
          <ul >
            <li onClick={()=>previousPage()}><Image src={"/assets/img/left.png"} width={18} height={18} /></li>
            <li onClick={()=>push(`../`)}>1</li>

            <li className="break">...</li>
            
            <li className={router.asPath==`/coinPages/${id}`? "active" : ""}>{parseInt(id)}</li>
            <li onClick={()=>nextPage1()}>{parseInt(id)+1}</li>
            <li onClick={()=>nextPage2()}>{parseInt(id)+2}</li>
            <li onClick={()=>nextPage3()}>{parseInt(id)+3}</li>
            
            <li className="break">...</li>
            
            <li onClick={()=>push(`/coinPages/40`)}>40</li>
            <li onClick={()=>nextPage1()}><Image src={"/assets/img/right.png"} width={18} height={18} /></li>
          </ul>
        </div>
      </div>
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
