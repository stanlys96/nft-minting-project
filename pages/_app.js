import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Link } from 'react-scroll';

function MyApp({ Component, pageProps }) {
  if (typeof window === 'object') {
  // Check if document is finally loaded
   document.addEventListener("DOMContentLoaded", function () {
       alert('Finished loading')
     });
  }
  return (
    <>
      <video className="vid" src='/videos/video-1.mp4' autoPlay loop muted />
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Image src='/images/bored-ape.png' width={70} height={70} />
          <span className={styles.logoName}>escAPE</span>
        </div>
        <div>
          <Link to="home" smooth={true} href="/" className={styles.navlink}>
            Home
          </Link>
          <Link to="about" smooth={true} href="/" className={styles.navlink}>
            About
          </Link>
          <Link to="roadmap" smooth={true} href="/" className={styles.navlink}>
            Roadmap
          </Link>
          <Link to="contact" smooth={true} href="/" className={styles.navlink}>
            Contact
          </Link>
        </div>
        <a className={styles.connectWalletBtn}>CONNECT WALLET</a>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
