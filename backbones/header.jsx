import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState,useRef} from "react";
import { signOut, useSession} from "next-auth/react";
import { Container,Navbar,Nav,Button,Popover,Overlay,Form } from "react-bootstrap"
import useSWR from 'swr'
import myimg from 'public/assets/img/boga.jpg'
import myimg2 from 'public/assets/img/icons8-closed-sign-45.png'

const fetcher = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
  const data = await response.json();
  return data
}


const Header = () => {


  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const {data} = useSWR('crypto',fetcher)
  const {data : session} = useSession()

  const {push} = useRouter()
  const ref = useRef(null);






  const handleSingOut = async() => {const data = await signOut({redirect:false,callbackUrl:'/'})
    push( data.url)
  }

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
    setSearch('')
  };


  const HeadNavMenu = [
    {
        navTitle: "Cryptocurrencies",
        navUrl: ""
    },
    {
        navTitle: "Exchanges",
        navUrl: "exchanges"
    },
    {
        navTitle: "Learn Blockchain",
        navUrl: "#Learn Blockchain"
    },
    {
      navTitle: "Future",
      navUrl: "#Future"
    }
];

  return (
    <>
    <header className="header">
      <Container fluid>
        <div className="header-web">  
          <div className="header-web-left">
              <Link href={"/"}>
                <Image src={myimg}  alt="/" width={100}/>
              </Link>
              <div className="header-navigation">
              <Navbar>
                <Nav>
                    {HeadNavMenu.map((item) => {
                        return (
                          <Nav.Item key={item.navTitle}>                          
                            <Link href={`/${item.navUrl}`} >
                                <p className="nav-link">{item.navTitle}</p>
                            </Link>
                          </Nav.Item>
                        )
                    })}
                </Nav>
              </Navbar>
            </div>
          </div>
          <div className="header-web-right">
            <div className="header-group">
              <div className="header-group-item portfolio">
                Portfolio
              </div>
              <div className="header-group-item login" style={{"display":`${session ? "none":"block"}`}}>
               <Button onClick={()=>push("../auth/signin")}>Log in</Button>
              </div>
              <div className="header-group-item  singup">
                {session ?  <Button  onClick={handleSingOut}> Sign out </Button>: <Button  onClick={()=>push("../auth/signup")}> Sign up </Button>}
                {/* <Button variant="success" onClick={modalClick}> Sign up </Button> */}
              </div>
              <div className="header-group-item search">
                <div ref={ref}>
                  <Button onClick={handleClick}>Search</Button>
                  <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref}
                    containerPadding={20}
                  >
                    <Popover id="popover-contained" >
                      <Popover.Header as="h3" > 
                      <Form.Group  controlId="formBasicEmail" style={{"display":"flex"}}>
                        <Form.Control type="text" placeholder="Search coin,contract address or exchange"  onChange={(e) => setSearch(e.target.value)} autoFocus />
                        <Image src={myimg2} onClick={()=> setShow(false)} style={{"marginRight":"10px"}} />
                      </Form.Group>
                      </Popover.Header>
                      <Popover.Body style={{"display" : search.length > 0 ? "block" : "none"}}>
                        <div className="popover-items" >                         
                          <div className="popover-item">
                            {(data)?.filter((crypto)=>{
                              return search.toLowerCase() === ''
                                ? ""
                                : crypto.name.toLowerCase().includes(search);
                            })
                            .map((crypto,i)=>(
                                i < 6 
                                ?<div className="popover-item-detay" key={crypto.symbol} >
                                  <div className="item-left">
                                    <img src={crypto.image} alt="/" width={20} />
                                    <p>{crypto.name}</p>
                                    <span >{crypto.symbol.toUpperCase()}</span>
                                  </div>
                                 <span className="item-right" > #{crypto.market_cap_rank}</span>
                                </div>
                                : ""
                            ))}
                          </div>
                        </div>
                      </Popover.Body>
                    </Popover>
                  </Overlay>
                </div>       
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header> 
  </>
    
  )
}

export default Header




