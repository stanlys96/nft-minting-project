import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { resetAccount } from "../redux/blockchain/blockchainActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faDiscord, faOpensea } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import Style from "style-it";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return Style.it(`
    @media screen and (min-width: 1041px) {
      .navbarMobile,
      .menuBtn,
      .menuBtnBurger,
      .insideBurger {
        display: none;
      }
    }

    @media screen and (max-width: 1040px) {
      .navbarMobile {
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: space-between;
        padding: 10px 30px;
        background: rgba(0, 0, 0, 0.85);
        height: 13vh;
        z-index: 10;
      }

      .escapeNavbar {
        width: 80px;
      }

      .menuBtn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        cursor: pointer;
        transition: all .5s ease-in-out;
        border: 3px solid #fff;
      }

      .menuBtnBurger {
        width: 50px;
        height: 6px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
        transition: all .5s ease-in-out;
      }

      .menuBtnBurger::before,
      .menuBtnBurger::after {
        content: '';
        position: absolute;
        width: 50px;
        height: 6px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
        transition: all .5s ease-in-out;
      }

      .menuBtnBurger::before {
        transform: translateY(-16px);
      }

      .menuBtnBurger::after {
        transform: translateY(16px);
      }

      /* ANIMATION */
      .menuBtn.open .menuBtnBurger {
        transform: translateX(-50px);
        background: transparent;
        box-shadow: none;
      }

      .menuBtn.open .menuBtnBurger::before {
        transform: rotate(45deg) translate(35px, -35px);
      }

      .menuBtn.open .menuBtnBurger::after {
        transform: rotate(-45deg) translate(35px, 35px);
      }

      .insideBurger {
        z-index: 10;
        width: 100%;
        position: fixed;
        top: 13vh;
        left: 0;
        height: 87vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        flex-direction: column;
        transition: all .5s ease-in-out;
      }

      .outsideBurger {
        transition: all .5s ease-in-out;
        z-index: 10;
        width: 100%;
        position: fixed;
        top: 13vh;
        left: 0;
        height: 87vh;
        background: transparent;
      }

      .navlinkInsideBurger {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        border-bottom: 1px solid transparent;
        display: inline-block;
        margin: 20px 15px;
        text-align: center;
      }

      .navlinkInsideBurger:hover {
        color: #0AC593;
      }

      .navlinkInsideBurger {
        margin-right: 60px;
      }

      .socialMediaInsideBurger {
        margin: 40px auto 0;
      }

      .connectWalletInsideBurgerLayer {
        display: flex;
        justify-content: center;
      }

      .connectWalletBtnInsideBurger {
        margin-top: 70px;
        margin-right: 40px;
        display: inline-block;
        padding: 30px 40px;
        color: #fff;
        cursor: pointer;
        border: 2px solid #888;
        transition: all 0.5s ease-in-out;
        font-size: 25px;
      }

      .connectWalletBtnInsideBurger:hover {
        background: #3AD3CD;
      }
    }
  `,
    <div style={{ position: "relative" }}>
      <video className="vid" autoPlay loop muted >
        <source src="/videos/trailer.mp4" type="video/mp4" />
      </video>
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
            }} to="mint" smooth={true} spy={true}  href="/" className={styles.navlink}>
            Mint
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
      <nav className="navbarMobile">
        <a onClick={() => {
          setOpen(!open);
        }} className={`menuBtn ${!open ? "close" : "open"}`}>
          <div className={`menuBtnBurger`}></div>
        </a>
        <img className="escapeNavbar" src="/images/logo-escape.jpg" alt="escape-logo" />
      </nav>
      {open ? <div className="insideBurger">
        <Link onClick={() => {
          setOpen(!open);
          router.push('/', undefined, { shallow: true });
          dispatch(resetAccount());
        }} to="home" smooth={true} spy={true}  href="/" className="navlinkInsideBurger">
        Home
        </Link>
        <Link onClick={() => {
          setOpen(!open);
          router.push('/', undefined, { shallow: true });
          dispatch(resetAccount());
        }} to="mint" smooth={true} spy={true}  href="/" className="navlinkInsideBurger">
        Mint
        </Link>
        <Link onClick={() => {
          setOpen(!open);
          router.push('/', undefined, { shallow: true });
          dispatch(resetAccount());
        }} to="about" smooth={true} spy={true} href="/" className="navlinkInsideBurger">
          About
        </Link>
        <Link onClick={() => {
          setOpen(!open);
          router.push('/', undefined, { shallow: true });
          dispatch(resetAccount());
        }} to="roadmap" smooth={true} spy={true} href="/" className="navlinkInsideBurger">
          Roadmap
        </Link>
        <Link onClick={() => {
          setOpen(!open);
          router.push('/', undefined, { shallow: true });
          dispatch(resetAccount());
        }} to="team" smooth={true} spy={true} href="/" className="navlinkInsideBurger">
          Team
        </Link>
        <div className="socialMediaInsideBurger">
          <a target="_blank" rel="noreferrer" href="https://opensea.io/collection/escape-official"><img width={30} style={{ marginRight: "10px" }} src="/images/opensea.png" alt="opensea-logo" /></a>
          <a target="_blank" rel="noreferrer" href="https://twitter.com/Eapeofficialnft"><img width={30} style={{ marginLeft: "10px", marginRight: "40px", borderRadius: "50%" }} src="/images/twit-icon.png" alt="opensea-logo" /></a>
        </div>
        <div className="connectWalletInsideBurgerLayer">
          <Link onClick={() => {
            setOpen(!open);
            router.push('/connect-metamask', undefined, { shallow: true });
            dispatch(resetAccount());
          }} to="connect-metamask" href="/connect-metamask" className="connectWalletBtnInsideBurger">MINT NOW</Link>
        </div>
      </div> : <div className="outsideBurger"></div>}
    </div>
  );
}