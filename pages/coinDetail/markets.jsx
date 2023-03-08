
const Markets = ({data}) => {
  
  return (
    <div className="main">
      <div className='markettable'>
        <div className="tbl-thead">
          <div className="tbl-tr tbl-tr-head">
            <div className="tbl-th rank">#</div>
            <div className="tbl-th name">Exchange</div>
            <div className="tbl-th pr">Pair</div>
            <div className="tbl-th prc">Price</div>
            <div className="tbl-th sprd">Spread</div>
            <div className="tbl-th vlm24h">24h Volume</div>
            <div className="tbl-th scr">Trust Score</div>
          </div>
        </div>
        <div className="tbl-tbody">
          {data.tickers?.map((data,i)=>(
            <div key={i + 1} className="tbl-tr tbl-tr-body">
              <div className="tbl-td rank">{i + 1}</div>
              <div className="tbl-td name">{data.market.name}</div>
              <div className="tbl-td pr"> {data.base.length > 10 ? `${data.coin_id.toUpperCase() }/ ${data.target_coin_id.toUpperCase()}`: `${data.base }/ ${data.target}`} </div>
              <div className="tbl-td prc">{data.last < 0.1 ? data.last.toFixed(6) : data.last.toLocaleString('en-US',{maximumFractionDigits:2})}</div>
              <div className="tbl-td sprd"> %{data.bid_ask_spread_percentage ? data.bid_ask_spread_percentage.toFixed(2):"--"}</div>
              <div className="tbl-td vlm24h">{data.converted_volume.usd.toLocaleString('en-US')}</div>
              <div className="tbl-td scr"><div className="circle" style={{"--bgClr":`${data.trust_score == "green"} `? "green" : "red"}}></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Markets