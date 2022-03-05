import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import store from './redux/store';
import { useDispatch } from "react-redux";
import { resetAccount } from "./redux/blockchain/blockchainActions";
import Navbar from './navbar';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp
