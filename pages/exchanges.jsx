import Image from "next/image";
import { Container } from "react-bootstrap";

const Exchanges = ({data}) => {
  return (
    <main className="main"> 
        <Container fluid>     
                <div className="main-web-title">
                    <h1 className="h2">Top Crypto Exchanges Ranked by Trust Score</h1 >
                </div>
                <div className="markettable">
                    <div className="tbl-thead">
                        <div className="tbl-tr tbl-tr-head">
                            <div className="tbl-th rank" >#</div>
                            <div className="tbl-th name">Exchange Name</div>
                            <div className="tbl-th center">Center</div>
                            <div className="tbl-th year">Trust Score</div>
                            <div className="tbl-th year">Established Year</div>
                            <div className="tbl-th vlm-btc">Traiding Volume 24H (BTC)</div>
                        </div>
                    </div>
                    <div className="tbl-tbody">
                    {data.map(exchange => (
                    <div className="tbl-tr tbl-tr-body" key={exchange.id}>
                        <div className="tbl-td rank">{exchange.trust_score_rank}</div>
                        <div className="tbl-td name"><a href="#"><img src={exchange.image} alt="" width={35}/><span>{exchange.name}</span></a></div>
                        <div className="tbl-td center">{exchange.country ? exchange.country  : "--"}</div>
                        <div className="tbl-td scr" >
								<div className="progressBar">
									<div className="progressBar-width" style={{"--wdth":`${exchange.trust_score*10}%`}}></div>       
								</div>		
                                <span>{exchange.trust_score}</span>
						</div>	
                        <div className="tbl-td year">{exchange.year_established ? exchange.year_established : "--"} </div>   
                        <div className="tbl-td">{exchange.trade_volume_24h_btc ? exchange.trade_volume_24h_btc.toLocaleString('en-US',{maximumFractionDigits:2}) : "--"}</div>
                    </div>
                ))} 
                    </div>
                </div>                
        </Container>
    </main>
    
  )
}

export default Exchanges    



export async function getServerSideProps({params}) {
	const request = await fetch("https://api.coingecko.com/api/v3/exchanges?per_page=100&page=1%27%20\%20-H%20%27accept:%20application/json");
	const data = await request.json();
	return {
		props: {
			data,
		},
	}
}
