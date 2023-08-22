

import { useEffect } from 'react';
import store, { persistor } from '../../store/store'
import { Provider } from "react-redux";
import { createWrapper } from 'next-redux-wrapper';
import { ToastContainer } from 'react-toastify';
import * as gtag from '@/components/backendmodules/gtag'
import { useRouter } from 'next/router';
// import { PersistGate } from 'redux-persist/integration/react';
import Script from 'next/script'

// import { PersistGate } from 'redux-persist/integration/react';

import 'semantic-ui-css/semantic.min.css'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'


function App({ Component, pageProps }) {
  const router = useRouter();


  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(url)
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  const Layout = Component.Layout || ((page) => page.children)

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-RBQ5TWCSZ7"></Script>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RBQ5TWCSZ7', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

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
