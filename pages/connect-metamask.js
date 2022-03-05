import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useCallback, useReducer } from "react";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'
import Web3Modal from "web3modal";
import { ethers, providers } from 'ethers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import { ellipseAddress, getChainData } from '../lib/utilities';
import { useDispatch, useSelector } from "react-redux";
import { connect, updatingBtnOneAction, updatingBtnTwoAction, updatingBtnThreeAction, updatingAllBtnAction } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { BounceLoader, BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.close)
  }
})

export default function ConnectMetamask() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [quantityOwned, setQuantityOwned] = useState(0);
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState();
  const [btnOneClicked, setBtnOneClicked] = useState(false);
  const [btnTwoClicked, setBtnTwoClicked] = useState(false);
  const [btnThreeClicked, setBtnThreeClicked] = useState(false);

  const claimNFTs = async (_amount) => {
    if (_amount <= 0) {
      return;
    }
    try {
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x1c5B16a273f65BfB580087f5250B03D64d83218F",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        dispatch(fetchData(blockchain.account));
        setTimeout(() => {
          setClaimingNft(false);
        }, 2000);
        Swal.fire({
          title: 'Success!',
          text: `You have successfully minted ${_amount} escAPES! Congratulations!`,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      });
      setQuantity(null);
    } catch(e) {
      setQuantity(null);
      setClaimingNft(false);
      console.log(e);
    }
  };

  const claimOneNft = async () => {
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mintOne(blockchain.account)
      .send({
        gasLimit: "285000",
        to: "0x1c5B16a273f65BfB580087f5250B03D64d83218F",
        from: blockchain.account,
        // value: blockchain.web3.utils.toWei((0.1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully minted one escAPE! Congratulations!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      });
  }

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAccount(blockchain.account);
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);
  console.log(data.totalSupply, " <<<<<");
  if (connectingWallet) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.connectContainer}>
          <BeatLoader />
          <p style={{ margin: '10px 0' }}>Connecting Wallet</p>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }
  if (claimingNft || blockchain.userLoading) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.connectContainer}>
          <BeatLoader />
          <p style={{ margin: '10px 0' }}>{blockchain.userLoading ? "Changing account..." : "Processing your transaction..."}</p>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }
  if (blockchain.errorMsg != "") {
    return (
    <div className={styles.connectMetamask}>
      <div className={styles.connectContainer}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.iconContainer}>
            <Image width={125} height={125} src='/images/bored-ape.png' alt="monkey" />
          </div>
        </div>
        <p>{blockchain.errorMsg}</p>
      </div>
    </div>
    );
  }
  if (blockchain.account == null) {
  return (
    <div className={styles.connectMetamask}>
      <div className={styles.connectContainer}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.iconContainer}>
            <Image width={125} height={125} src='/images/bored-ape.png' alt="monkey" />
          </div>
        </div>
        <a className={styles.connectMetamaskBtn} onClick={async() => {
          setConnectingWallet(true);
          dispatch(connect());
          getData();
          setTimeout(() => {
            setConnectingWallet(false);
            Toast.fire({
              icon: 'success',
              title: 'Wallet connected successfully!'
            });
          }, 2500);
        }}>Connect Metamask</a>
      </div>
    </div>
  );
  } else if (blockchain.account != null && data.totalSupply > 2) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.mintContainer}>
          <p className={styles.mintTitle}>PUBLIC MINT</p>
          <div>
            {data.totalOwned < 3 && <p className={styles.mintSubtitle}>Get an escAPE now!</p>}
            {data.totalOwned < 3 && <p className={styles.mintCondition}>Max of {data.totalOwned == 0 ? 3 : data.totalOwned == 1 ? 2 : data.totalOwned == 2 ? 1 : data.totalOwned > 2 ? 0 : 0} escAPES per transaction.</p>}
          </div>
          <p className={styles.mintAddress}>Connected account: ..{blockchain.account.slice(32)}</p>
          <p className={styles.ownedSupply}>Number of escAPES you own: <span className={styles.quantityOwned}>{data.totalOwned}</span></p>
          {data.totalOwned < 3 && <div className={styles.mintingBtnContainer}>
            {data.totalOwned < 3 && <a href="#" onClick={() => {
              dispatch(updatingBtnOneAction());
            }} className={`${blockchain.btnOneSelected ? styles.mintBtnClicked : styles.mintingBtn}`}>Mint 1</a>}
            {data.totalOwned < 2 && <a href="#" onClick={() => {
              dispatch(updatingBtnTwoAction());
            }} className={`${blockchain.btnTwoSelected ? styles.mintBtnClicked : styles.mintingBtn}`}>Mint 2</a>}
            {data.totalOwned < 1 && <a href="#" onClick={() => {
              dispatch(updatingBtnThreeAction());
            }}  className={`${blockchain.btnThreeSelected ? styles.mintBtnClicked : styles.mintingBtn}`}>Mint 3</a>}
          </div>}
          <p className={styles.mintTotalPrice}>Total Price: {blockchain.btnOneSelected ? "0.5" : blockchain.btnTwoSelected ? "1.0" : blockchain.btnThreeSelected ? "1.5" : "0.0"} ETH</p>
          {data.totalOwned < 3 ? <a className={`${styles.connectMetamaskBtn}`} style={ blockchain.btnOneSelected || blockchain.btnTwoSelected || blockchain.btnThreeSelected ? {} : { backgroundColor: "#E1E1E1" }} onClick={() => {
            let num = 0;
            if (blockchain.btnOneSelected) {
              num = 1;
            } else if (blockchain.btnTwoSelected) {
              num = 2;
            } else if (blockchain.btnThreeSelected) {
              num = 3;
            } else {
              return;
            }
            claimNFTs(num);
            dispatch(updatingAllBtnAction());
          }}>MINT</a> : <p>You have reached the maximum<br/>number allowed to mint! (3 NFTs)</p>}
          <p className={styles.mintedSupply}>Minted escAPES: {data.totalSupply}/8000</p>
        </div>
      </div>
    );
  } else if (blockchain.account != null && data.totalSupply < 3) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.mintContainer}>
          <p className={styles.mintTitle}>PUBLIC MINT</p>
          {data.totalOwned < 1 && <p className={styles.mintSubtitle}>Get an escAPE now!</p>}
          {data.totalOwned < 1 && <p className={styles.mintCondition}>You can only mint one while total minted<br/> escAPES are less than 500.</p>}
          <p className={styles.mintAddress}>Connected account: ..{blockchain.account.slice(32)}</p>
          <p className={styles.ownedSupply}>Number of escAPES you own: <span className={styles.quantityOwned}>{data.totalOwned}</span></p>
          <p className={styles.mintTotalPrice}>Total Price: FREE (excluding gas fees)</p>
          {data.totalOwned < 1 ? <a className={`${styles.connectMetamaskBtn}`} onClick={() => {
            claimOneNft();
          }}>MINT ONE</a> : <div><p>You have reached the maximum<br/>number allowed to mint for supply before 500! (1 NFT)</p><p style={{ marginTop: '10px' }}>Please come back when total minted NFTs reach 500.</p></div>}
          <p className={styles.mintedSupply}>Minted escAPES: {data.totalSupply}/8000</p>
        </div>
      </div>
    );
  }
}