import Header from '@/backbones/header'
import Footer from '@/backbones/footer'
const Layout = ({children}) => {
  return (
    <>  

        <Header />
            {children}
        <Footer />

    </>
  )
}

export default Layout