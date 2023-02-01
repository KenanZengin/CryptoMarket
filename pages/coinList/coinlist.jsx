import Link from "next/link"


const Coinlist= ({data}) => {
  
  if(!data || !data.length){
    return <div>coinecko.com stopped api support, try again in 1 minute</div>
  }


  return (
   <>
      <div className="tbl-thead">
       <div className="tbl-tr tbl-tr-head" >
          <div className="tbl-th rank" >#</div>
          <div className="tbl-th name">Name</div>
          <div className="tbl-th prc">Price</div>
          <div className="tbl-th chng24h">24h%</div>
          <div className="tbl-th mrktcp">Market Cap</div>
          <div className="tbl-th vlm24h">Volume(24h%)</div>
          <div className="tbl-th spply">Circulating Supply</div>
        </div>
      </div>
      <div className="tbl-tbody">
        {data.map((crypto)=>(
        <div className="tbl-tr  tbl-tr-body" key={crypto.market_cap_rank}>
          <div className="tbl-td rank"><span>{crypto.market_cap_rank}</span></div>
          <div className="tbl-td name"><Link href={`/coinDetail/${crypto.id.toLowerCase()}`}><span><img src={crypto.image} alt="/" width={28} /></span><p>{crypto.name}</p><p>{crypto.symbol.toUpperCase()}</p></Link></div>
          <div className="tbl-td prc"><span>{crypto.current_price.toLocaleString('en-US')}</span></div>
          <div className="tbl-td chng24h" style={{"color":`${crypto.price_change_percentage_24h >= 0 ? "#16c784" : "#b52d2d"}`}}><span>{crypto.price_change_percentage_24h ? crypto.price_change_percentage_24h.toLocaleString('en-US',{maximumFractionDigits:2}): "0"}%</span></div>
          <div className="tbl-td mrktcp"><span>{crypto.market_cap.toLocaleString('en-US')}</span></div>
          <div className="tbl-td vlm24h"><span>{crypto.total_volume.toLocaleString('en-US')}</span></div>
          <div className="tbl-td spply"><span>{crypto.total_supply ? crypto.total_supply.toLocaleString('en-US') :crypto.circulating_supply.toLocaleString('en-US') }</span></div>
        </div>
        ))}
      </div>
   </>
  )
}

export default Coinlist

