import {store} from '../../store/store'
import { Provider } from "react-redux";
import '../styles/globals.css'
export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || ((page) => page.children)
  return(
    <>
    <Provider store={store}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </Provider>
    </>
  ) 
}
