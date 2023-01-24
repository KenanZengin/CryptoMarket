import Layout from '@/components/layout'
import '@/styles/globals.scss'
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps }) {
  // if(Component.getLayout){
  //   return Component.getLayout(<Component {...pageProps} />)
  // } 
  return(
      <>      
        <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>    
        </SessionProvider>
      </>
  )
}
