import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { resetAccount } from "../redux/blockchain/blockchainActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div>
      <video className="vid" src='/videos/video-1.mp4' autoPlay loop muted />
      <nav className={styles.navbar}>
        <div className={styles.insideNavbar}>
          <div className={styles.logoContainer}>
            <Image src='/images/bored-ape.png' width={40} height={40} />
            <Link to="home" smooth={true} spy={true} onClick={() => {
              router.push('/', undefined, { shallow: true });
              dispatch(resetAccount());
            }} href="/" className={styles.logoName}>escAPE</Link>
          </div>
          <div>
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
            }} to="contact" smooth={true} spy={true} href="/" className={styles.navlink}>
              Contact
            </Link>
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