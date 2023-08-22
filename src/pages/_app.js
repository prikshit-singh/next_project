import  store, { persistor }   from '../../store/store'
import { Provider } from "react-redux";
import { createWrapper } from 'next-redux-wrapper';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Script from 'next/script'
import 'semantic-ui-css/semantic.min.css'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'


 function App({ Component, pageProps }) {
  const Layout = Component.Layout || ((page) => page.children)
  
  return (
    <>
     <Head >
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-RBQ5TWCSZ7"></script>
        <script>
         { window.dataLayer = window.dataLayer || []
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-RBQ5TWCSZ7')}
        </script> */}
      </Head>
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Layout>
 {/* </PersistGate> */}

      </Provider> 



     

    </>
  )
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
