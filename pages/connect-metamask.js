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
import { connect } from "../redux/blockchain/blockchainActions";
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
  const [quantity, setQuantity] = useState(null);
  const [quantityOwned, setQuantityOwned] = useState(0);
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState();

  const claimNFTs = async (_amount) => {
    console.log(_amount, "<<<!");
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
        setClaimingNft(false);
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
  if (claimingNft) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.connectContainer}>
          <BeatLoader />
          <p style={{ margin: '10px 0' }}>Processing your transaction...</p>
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
        <a className={styles.connectMetamaskBtn} onClick={() => connect()}>{blockchain.errorMsg}</a>
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
          <p className={styles.mintSubtitle}>Get an escAPE now!</p>
          <p className={styles.mintCondition}>Max of 3 escAPES per transaction.</p>
          <p className={styles.mintAddress}>Connected account: ..{blockchain.account.slice(32)}</p>
          <p className={styles.ownedSupply}>Number of escAPES you own: <span className={styles.quantityOwned}>{data.totalOwned}</span></p>
          <div className={styles.quantityContainer}>
            <div className={styles.innerContainer}>
              <span>Quantity</span>
            </div>
            <input 
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
              onChange={(e) => {
                if (parseInt(e.target.value) > 3) {
                  setQuantity(3);
                } else {
                  setQuantity(e.target.value)
                }
              }}
            />
          </div>
          <p className={styles.mintTotalPrice}>Total Price: {(parseFloat(quantity == "" || quantity == null ? "0" : quantity) * 0.05).toFixed(quantity == "" || quantity == null ? 0 : 2)} ETH</p>
          <a className={`${styles.connectMetamaskBtn}`} style={ quantity == null || quantity == "" ? { backgroundColor: "#E1E1E1" } : {}} onClick={() => {
            claimNFTs(quantity);
          }}>MINT</a>
          <p className={styles.mintedSupply}>Minted escAPES: {data.totalSupply}/8000</p>
        </div>
      </div>
    );
  } else if (blockchain.account != null && data.totalSupply < 3) {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.mintContainer}>
          <p className={styles.mintTitle}>PUBLIC MINT</p>
          <p className={styles.mintSubtitle}>Get an escAPE now!</p>
          <p className={styles.mintCondition}>You can only mint one while total minted<br/> escAPES are less than 500.</p>
          <p className={styles.mintAddress}>Connected account: ..{blockchain.account.slice(32)}</p>
          <p className={styles.ownedSupply}>Number of escAPES you own: <span className={styles.quantityOwned}>{data.totalOwned}</span></p>
          <p className={styles.mintTotalPrice}>Total Price: FREE (excluding gas fees)</p>
          <a className={`${styles.connectMetamaskBtn}`} onClick={() => {
            claimOneNft();
          }}>MINT ONE</a>
          <p className={styles.mintedSupply}>Minted escAPES: {data.totalSupply}/8000</p>
        </div>
      </div>
    );
  }
}