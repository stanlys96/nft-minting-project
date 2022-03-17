import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faWarehouse, faRocket } from '@fortawesome/fontawesome-free-solid'
import { ReactComponent as WorkIcon } from './svg/work.svg';
import { ReactComponent as SchoolIcon } from './svg/school.svg';
import { useRouter } from 'next/router'

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdEmail, MdLocalPhone, MdLocationCity } from 'react-icons/md';
import React, { useState } from "react";
import Navbar from './navbar';

let timelineElements = [
  {
    id: 1,
    title: "25% sold out",
    location: "Dragontail, Ascana",
    description:
      "We will do collaboration with other alpha projects to benefit our holders.",
    buttonText: "View Frontend Projects",
    date: "August 2016 - present",
    icon: "work",
  },
  {
    id: 2,
    title: "50% sold out",
    location: "Skystead, Craonia",
    description:
      "We are going to give donation to our chosen charity partners in the name of holders.",
    buttonText: "View Backend Projects",
    date: "June 2013 - August 2016",
    icon: "work",
  },
  {
    id: 3,
    title: "75% sold out",
    location: "South Warren, Geshington",
    description:
      "Free airdrop a few NFTs to our current verified holders who supported us through this journey.",
    buttonText: "Company Website",
    date: "September 2011 - June 2013",
    icon: "work",
  },
  {
    id: 4,
    title: "100% sold out",
    location: "South Warren, Geshington",
    description:
      "100% sold out – It is time for celebration by “escape” the real world. We are going to make our NFT alive in the metaverse.",
      // "The great EscAPE from the tyranny of capitalism! Join our apes in their rebellion against the system and they will build a new colony together. Our apes would be traversing across several environments to get to their new haven. What's next for the EscAPEd? Join and build together with them.",
    buttonText: "Course Certificate",
    date: "September 2011",
    icon: "school",
  },
];

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  let workIconStyles = { background: "#06D6A0", display: "flex", justifyContent: "center", alignItems: "center" };
  let schoolIconStyles = { background: "#F9C74F" };
  return (
    <section>
      <div className={styles.mainContent}>
      <section className={`${styles.header} home`}>
        <div className={styles.headerCaption}>
          <p className={styles.caption}>DISCOVER</p>
          <p className={styles.caption}>THE BEST ARTS NFTS</p>
          <div className={styles.secondCaptionContainer}>
            <p className={styles.secondCaption}>A Unique And Innovative <span className={styles.captionSpan}>Collection</span> To Discover <span className={styles.captionSpan}>NFT</span></p>
            <p className={styles.secondCaption}><span className={styles.captionSpan}>Art</span> Starts Now And Discover NFTs</p>
          </div>
        </div>
        <div className={styles.headerImages}>
          <div className={styles.wrapper}>
            <span></span>
            <span></span>
            <div className={styles.videoBox}>
              <video src='/videos/video-3.mp4' autoPlay loop muted />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.mintInfoPage} mint`}>
        <div className={styles.mintInfoContent}>
          <div className={styles.mintInfoAndBtn}>
            <a className={styles.discoverBtn} onClick={() => {
              router.push('/connect-metamask', undefined, { shallow: true });
            }}>MINT NOW</a>
            <div className={styles.networkOuterLayer}>
              <div className={styles.networkContainer}>
                <p>Network: Ethereum</p>
                <p>Date: TBA</p>
                <p>Contract: ERC721A</p>
                <p>Price: 1st 1000 NFTs = FREE (max 1 per wallet)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@0.025 ETH each (max 5 per wallet)</p>
              </div>
            </div>
            <div className={styles.mintInfoGifs}>
              <video className={styles.mintVideo} src='/videos/gif-4.mp4' autoPlay loop muted></video>
              <video className={styles.mintVideo} src='/videos/gif-5.mp4' autoPlay loop muted></video>
              <video className={styles.mintVideo} src='/videos/gif-6.mp4' autoPlay loop muted></video>
              <video className={styles.mintVideo} src='/videos/gif-7.mp4' autoPlay loop muted></video>
            </div>
          </div>
        </div>
      </section>
      <section id={styles.aboutPage}>
        <div id="about" className={styles.aboutContainer}>
          <div className={styles.imgContainer}>
            <div className={styles.imgCard}>
              <video className={styles.aboutVideo} src='/videos/video-3.mp4' autoPlay loop muted></video>
            </div>
            <div className={styles.imgCard}>
              <video className={styles.aboutVideo} src='/videos/video-3.mp4' autoPlay loop muted></video>
            </div>
          </div>
          <div className={styles.aboutCaptionContainer}>
            <div className={styles.captionLogoContainer}>
              <img className={styles.escapeImg} width={150} src="/images/logo-escape.jpg" alt="escape-logo" />
            </div>
            <p className={styles.captionBlockchain}><span className={styles.insideCaption}>About Us</span></p>
            <p className={styles.captionDescription}>escAPE is a collection of 6577 2D animation Ape NFTs that is going to rock the metaverse in March 2022. It was designed by the talented Flatonic team who already well recognized in 2d animation world. Our purpose is to bring 2D animation and be the market leader in the NFT space for that category.<br/><br/> We are representing those individuals that need to “escape” whatever they want to run away from. So, this is definitely the perfect NFTs collection for PFP or even for your metaverse avatar.<br/><br/> The great EscAPE from the tyranny of capitalism! Join our apes in their rebellion against the system and they will build a new colony together. Our apes would be traversing across several environments to get to their new haven. What's next for the EscAPEd? Join and build together with them.
            {/* LFG people, we are escaping together to the Moon!!! */}
            </p>
          </div>
        </div>
      </section>
      <section id={styles.roadmap}>
        <h1 id="roadmap" className={styles.roadmapTitle}>Roadmap</h1>
        <VerticalTimeline>
          {
            timelineElements.map((element, i) => {
              let isWorkIcon = element.icon === "work";
              let showButton = element.buttonText !== undefined && element.buttonText != null && element.buttonText != "";
              return (
                <VerticalTimelineElement 
                  key={element.id}
                  // date={element.date}
                  // dateClassName="date"
                  iconStyle={workIconStyles}
                  icon={<img src="/images/monkey-6290-icon.png" className={styles.imgMonkey} />}
                  contentStyle={{ background: "rgba(0, 0, 0, 0.5)", color: "#fff", boxShadow: "0 0 0 #000 !important" }}
                >
                  <h3 className={`vertical-timeline-element-title ${styles.heading3}`}>{element.title}</h3>
                  <p id={styles.description}>{element.description}</p>
                  {/* {showButton && (<a className={`button ${isWorkIcon ? styles.workButton : styles.schoolButton} ${styles.roadmapBtn}`} href='/'>{element.buttonText}</a>)} */}
                </VerticalTimelineElement>
              );
            })
          }
        </VerticalTimeline>
      </section>
      <section id="team" className={styles.team}>
        <div className={styles.teamContent}>
          <div className={styles.teamContainer}>
            <div className={styles.teamCaptionContainer}>
              <div className={styles.teamCaption}><span className={styles.teamCaptionSpan}>THE TEAM</span></div>
            </div>
            <div className={styles.teamImages}>
              <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/gif-3.mp4' autoPlay loop muted />
                  <div className={styles.teamInnerBox}>
                    <div className={styles.teamNestedInnerBox}>
                      <p className={styles.memberName}>Romero</p>
                      <p className={styles.memberRole}>PROJECT</p>
                      <p className={styles.memberRole}>LEADER</p>
                    </div>
                  </div>
                </div>
              </div>
             <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/gif-1.mp4' autoPlay loop muted />
                  <div className={styles.teamInnerBox}>
                    <div className={styles.teamNestedInnerBox}>
                      <p className={styles.memberName}>Flatonic</p>
                      <p className={styles.memberRole}>2D</p>
                      <p className={styles.memberRole}>ANIMATOR</p>
                    </div>
                  </div>
                </div>
              </div>
             <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/gif-2.mp4' autoPlay loop muted />
                  <div className={styles.teamInnerBox}>
                    <div className={styles.teamNestedInnerBox}>
                      <p className={styles.memberName}>Zeriis</p>
                      <p className={styles.memberRole}>BLOCKCHAIN</p>
                      <p className={styles.memberRole}>WIZARD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>Copyright &copy; escAPE 2022</p>
      </footer>
    </div>
    </section>
  )
}
