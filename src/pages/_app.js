

import { useEffect } from 'react';
import store, { persistor } from '../../store/store'
import { Provider } from "react-redux";
import { createWrapper } from 'next-redux-wrapper';
import { ToastContainer } from 'react-toastify';
import * as gtag from '../components/backendmodules/gtag'
import { useRouter } from 'next/router';
// import { PersistGate } from 'redux-persist/integration/react';
import Script from 'next/script'

// import { PersistGate } from 'redux-persist/integration/react';

import 'semantic-ui-css/semantic.min.css'

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import Head from 'next/head';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps: { session, ...pageProps } }) {
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

      <Head>
        <meta name="robots" content="all" />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        {/* <link rel="canonical" href="https://gitgurus.com" /> */}

      </Head>

      <Provider store={store}>
        <Layout>
          <SessionProvider>

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
          </SessionProvider>
        </Layout>

      </Provider>





    </>
  )
}

const wrapper = createWrapper(() => store);

export default App;
