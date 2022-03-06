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
    title: "Q1 2022",
    location: "Dragontail, Ascana",
    description:
      "PlayFi beta 20+ Games & Interactive templates added Wallet integration",
    buttonText: "View Frontend Projects",
    date: "August 2016 - present",
    icon: "work",
  },
  {
    id: 2,
    title: "Q2 2022",
    location: "Skystead, Craonia",
    description:
      "Token listing / IDO Payment Gateway NFT marketplace prototype",
    buttonText: "View Backend Projects",
    date: "June 2013 - August 2016",
    icon: "work",
  },
  {
    id: 3,
    title: "Q3 2022",
    location: "South Warren, Geshington",
    description:
      "NFT Marketplace v1 Creator Kit",
    buttonText: "Company Website",
    date: "September 2011 - June 2013",
    icon: "work",
  },
  {
    id: 4,
    title: "Q4 2022",
    location: "South Warren, Geshington",
    description:
      "Esports platform beta Native Social Media Platform support Mobile apps",
    buttonText: "Course Certificate",
    date: "September 2011",
    icon: "school",
  },
  {
    id: 5,
    title: "Q1 2023",
    location: "Skystead, Craonia",
    description:
      "Launching 50 more rare escAPES",
    buttonText: "College Projects",
    date: "2007 - 2011",
    icon: "school",
  },
  {
    id: 6,
    title: "Q2 2023",
    location: "Dragontail, Ascana",
    description:
      "escAPES NFT available on mobile apps.",
    date: "2003 - 2007",
    icon: "school",
  },
];

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  let workIconStyles = { background: "#06D6A0" };
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
          <a className={styles.discoverBtn} onClick={() => {
            router.push('/connect-metamask', undefined, { shallow: true });
          }}>MINT NOW</a>
        </div>
        <div className={styles.headerImages}>
          <div className={styles.wrapper}>
            <span></span>
            <span></span>
            <div className={styles.videoBox}>
              <video src='/videos/video-3.mp4' autoPlay loop muted />
            </div>
          </div>
          <div className={styles.wrapper}>
            <span></span>
            <span></span>
            <div className={styles.videoBox}>
              <video src='/videos/video-3.mp4' autoPlay loop muted />
            </div>
          </div>
          <div className={styles.wrapper}>
            <span></span>
            <span></span>
            <div className={styles.videoBox}>
              <video src='/videos/video-3.mp4' autoPlay loop muted />
            </div>
          </div>
        </div>
      </section>
      <section id={styles.aboutPage}>
        <div id="about" className={styles.aboutContainer}>
          <div className={styles.imgContainer}>
            <div className={styles.imgCard}>
              <video className={styles.aboutVideo} src='/videos/video-3.mp4' autoPlay loop muted></video>
              <p>Ape #80</p>
              <div className={styles.imgAuthor}>
                <img src='/images/dummy-image-1.jpeg' />
                <div className={styles.authorContainer}>
                  <p>Owned By</p>
                  <p>ZiggyZ4ga</p>
                </div>
              </div>
            </div>
            <div className={styles.imgCard}>
              <video className={styles.aboutVideo} src='/videos/video-3.mp4' autoPlay loop muted></video>
              <p>Ape #442</p>
              <div className={styles.imgAuthor}>
                <img src='/images/dummy-image-2.jpeg' />
                <div className={styles.authorContainer}>
                  <p>Owned By</p>
                  <p>D0ctOR1n</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aboutCaptionContainer}>
            <p className={styles.captionTitle}>ESCAPE NFT</p>
            <p className={styles.captionBlockchain}>Ethereum Blockchain</p>
            <p className={styles.captionSubtitle}>Get to Know More About Them</p>
            <p className={styles.captionDescription}>Escapes are a collection of 5,000 unique, programmatically generated NFTs with proof of ownership stored on the Ethereum blockchain. Each Escape is generated randomly from dozens of different assets.</p>
            <p className={styles.captionSubtitle}>Founder</p>
            <p className={styles.captionDescription}>Founder Escapes are numbered from #1 to #8000 and they carry special benefits for their owners. From time to time, Escapes will be raffled between Founders (those who own Founder Escapes). Each Founder Escape you have is a ticket for these raffles.</p>
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
                  icon={<FontAwesomeIcon icon={faRocket}/>}
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
      <section className={styles.team}>
        <video style={{  position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.8
        }} className="teamVid" src='/videos/video-2.mp4' autoPlay loop muted />
        <div className={styles.teamContent}>
          <div className={styles.teamContainer}>
            <div className={styles.teamCaptionContainer}>
              <div className={styles.teamCaption}><span className={styles.teamCaptionSpan}>MEET THE TEAM</span></div>
            </div>
            <div className={styles.teamImages}>
              <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/video-3.mp4' autoPlay loop muted />
                  <div className={styles.teamInnerBox}>
                    <div className={styles.teamNestedInnerBox}>
                      <p className={styles.memberName}>Zeriis</p>
                      <p className={styles.memberRole}>BLOCKCHAIN</p>
                      <p className={styles.memberRole}>WIZARD</p>
                    </div>
                  </div>
                </div>
              </div>
             <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/video-3.mp4' autoPlay loop muted />
                  <div className={styles.teamInnerBox}>
                    <div className={styles.teamNestedInnerBox}>
                      <p className={styles.memberName}>Zeriis</p>
                      <p className={styles.memberRole}>BLOCKCHAIN</p>
                      <p className={styles.memberRole}>WIZARD</p>
                    </div>
                  </div>
                </div>
              </div>
             <div className={styles.teamImageCard}>
                <div className={styles.teamVideoContainer}>
                  <video className={styles.teamVideo} src='/videos/video-3.mp4' autoPlay loop muted />
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
