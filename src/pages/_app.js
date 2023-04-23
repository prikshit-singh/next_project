import '../styles/globals.css'
import 'bulma/css/bulma.css'
export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || ((page) => page.children)
  return(
    <Layout>
       <Component {...pageProps} />
    </Layout>
  ) 
}
