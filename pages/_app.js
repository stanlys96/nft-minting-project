import '../styles/globals.css';
import { Provider } from "react-redux";
import store from '../redux/store';
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
