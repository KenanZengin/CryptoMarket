import Link from "next/link";
import { Container } from "react-bootstrap";
const CoinDetail = ({data}) => {

	const h24change = (data.market_data.current_price.usd-data.market_data.low_24h.usd)/(data.market_data.high_24h.usd-data.market_data.low_24h.usd)*100;
	return (
		<div className="coindetail">
			<Container fluid>
				<div className="coindetail-top">
					<Link href={"/"}><p>Cryptocurrencies</p></Link>
					&#62; 
					<span> {data.name}</span>
				</div>
				<div className="coindetail-main-section">					
						<div className="section-left">
						<p className="rank" >Rank #{data.market_cap_rank}</p>
						<div className="title">
								<img src={data.image.small} alt="/"/>
								<h2>{data.name}</h2>
								<small>{data.symbol.toUpperCase()}</small>
						</div>
						<div className="price">
								<h2>${data.market_data.current_price.usd.toLocaleString()}</h2>
								<span style={{"backgroundColor":`${data.price_change_percentage_24h >= 0 ? "#16c784" : "#b52d2d"}`}}>{data.market_data.price_change_percentage_24h.toFixed(2)}%</span>
						</div>
						<div className="btc-eth-qvlnt">
							<div>
								<span>{data.market_data.current_price.btc.toFixed(8)} BTC</span>
								<span style={{"color":`${data.market_data.price_change_percentage_24h_in_currency.btc >= 0 ? "#16c784" : "#b52d2d"}`}}>{data.market_data.price_change_percentage_24h_in_currency.btc.toFixed(2)}%</span>
							</div>
							<div>
								<span>{data.market_data.current_price.eth.toFixed(8)} ETH</span>
								<span style={{"color":`${data.market_data.price_change_percentage_24h_in_currency.eth >= 0 ? "#16c784" : "#b52d2d"}`}}>{data.market_data.price_change_percentage_24h_in_currency.eth.toFixed(2)}%</span>
							</div>								
						</div>
						<div className="h24-l-h">
								<div className="progressBar">
									<div className="progressBar-width" style={{"--wdth":`${h24change}%`}} ></div>	
								</div>																									
								<div className="h24-chng">
									<span>Low:{data.market_data.low_24h.usd.toLocaleString()}$</span>
									<span>24H Range</span>
									<span>High:{data.market_data.high_24h.usd.toLocaleString()}$</span>								
								</div>
						</div>					
						<div className="info">
							<div className="info-left">
								<div>
									<p>Market Cap</p>
									<span>{data.market_data.market_cap.usd.toLocaleString('en-US')}</span>
								</div>
								<div>
								<p>24 Hour Trading Vol</p>  
								<span>{data.market_data.total_volume.usd.toLocaleString('en-US')}</span>
								</div>
								<div>
									<p>Fully Diluted Valuation</p>
									<span>{data.market_data.fully_diluted_valuation.usd? data.market_data.fully_diluted_valuation.usd.toLocaleString('en-US'):"--"}</span>  	
								</div>
							</div>
							<div className="info-right">
								<div>
									<p>Circulating Supply</p>  
									<span>{data.market_data.circulating_supply.toLocaleString('en-US')}</span>
								</div>
								<div>
								<p>Total Supply</p>  
								<span>{data.market_data.total_supply > 0 ? data.market_data.total_supply.toLocaleString('en-US') : "--" }</span>
								</div>
								<div>
								<p>Max Supply</p>  
								<span>{data.market_data.max_supply > 0 ? data.market_data.max_supply.toLocaleString('en-US') : "Unlimited" }</span>
								</div>

							</div>
						</div>
						
						</div>					
						<div className="section-right">
							<h3>Info</h3>
							<div>
								<p>Website</p>
								<div className="links">
									<a href={data.links.homepage[0]} target="_blank">{data.name}.org</a>
								</div>
							</div>
							<div>
								<p>Community</p> 
								<div className="links">
									<a href={data.links.subreddit_url} target="_blank"> <img src="/assets/img/reddit.png" alt="" />Reddit</a>
									<a href={`https://twitter.com/${data.links.twitter_screen_name}`} target="_blank"> <img src="/assets/img/twitter.png" alt="" /> Twitter</a>
								</div>
								
							</div>
							<div>
								<p>Source Code</p>        
								<div className="links">
									<a href={data.links.repos_url.github[0]} target="_blank"> <img src="/assets/img/github.png" alt="" /> Github</a>
								</div>
								
							</div>
							<div>
								<p>Community score</p>   
								<div className="links">
									<span>{data.community_score ? `${data.community_score} / 100` : "--"}</span>
								</div>
							</div>
							<div>
								<p>Developer score</p>    
								<div className="links">
									<span>{data.developer_score  ?`${data.developer_score} / 100` :"--" }</span>
								</div>
							</div>
							<div>
								<p>Liquitidy score</p>    
								<div className="links">
									<span>{data.liquidity_score ? `${data.liquidity_score} / 100`  : "--"} </span>
								</div>
							</div>
							<div>
								<p>Hashing Algorithm </p> 
								<div className="links">
									<span>{data.hashing_algorithm ? data.hashing_algorithm : "--"}</span>
								</div>
							</div>
							<div>
								<p>Tags</p>
								<div className="links">
									<span>{data.categories[0] ? data.categories[0] : "--" }</span>
									
								</div>
							</div>
						</div>		
				</div>
			</Container>
		</div>

	)
}
  



  export default CoinDetail
  
  
  
  export async function getServerSideProps({params}) {
	const request = await fetch(`https://api.coingecko.com/api/v3/coins/${params.coinid}`);
	const data = await request.json();
	return {
		props: {
			data,
		},
	}
}

  