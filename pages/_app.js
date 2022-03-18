import '../styles/globals.css';
import { Provider } from "react-redux";
import store from '../redux/store';
import Navbar from './navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <Head>
          <title>escAPE Official</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp
