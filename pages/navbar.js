import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { resetAccount } from "../redux/blockchain/blockchainActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faOpensea } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div>
      <video className="vid" src='/videos/trailer.mp4' autoPlay loop muted />
      <nav className={styles.navbar}>
        <div className={styles.insideNavbar}>
          <div className={styles.logoContainer}>
            <img src='/images/logo-escape.jpg' className={styles.navbarImg} width={60} />
          </div>
          <div className={styles.navlinkContainer}>
            <Link onClick={() => {
              router.push('/', undefined, { shallow: true });
              dispatch(resetAccount());
            }} to="home" smooth={true} spy={true}  href="/" className={styles.navlink}>
            Home
            </Link>
            <Link onClick={() => {
              router.push('/', undefined, { shallow: true });
              dispatch(resetAccount());
            }} to="about" smooth={true} spy={true} href="/" className={styles.navlink}>
              About
            </Link>
            <Link onClick={() => {
              router.push('/', undefined, { shallow: true });
              dispatch(resetAccount());
            }} to="roadmap" smooth={true} spy={true} href="/" className={styles.navlink}>
              Roadmap
            </Link>
            <Link onClick={() => {
              router.push('/', undefined, { shallow: true });
              dispatch(resetAccount());
            }} to="team" smooth={true} spy={true} href="/" className={styles.navlink}>
              Team
            </Link>
            <div className={styles.socialMediaContainer}>
              <a target="_blank" rel="noreferrer" href="https://opensea.io/collection/escape-official"><img width={30} style={{ marginRight: "10px" }} src="/images/opensea.png" alt="opensea-logo" /></a>
              <a target="_blank" rel="noreferrer" href="https://twitter.com/Eapeofficialnft"><img width={30} style={{ marginLeft: "10px", borderRadius: "50%" }} src="/images/twit-icon.png" alt="opensea-logo" /></a>
            </div>
          </div>
          <Link onClick={() => {
              router.push('/connect-metamask', undefined, { shallow: true });
              dispatch(resetAccount());
            }} to="connect-metamask" href="/connect-metamask" className={styles.connectWalletBtn}>CONNECT WALLET</Link>
        </div>
      </nav>
    </div>
  );
}