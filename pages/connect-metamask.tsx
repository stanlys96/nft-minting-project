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
import { ellipseAddress, getChainData } from '../lib/utilities'

const INFURA_ID = '11d0a5344888470393248b1c55105a8c'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      address?: StateType['address']
      chainId?: StateType['chainId']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

export default function ConnectMetamask() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state
  const [originalAddress, setOriginalAddress] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [quantityOwned, setQuantityOwned] = useState(0);
  const [chain, setChain] = useState("");

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    setOriginalAddress(address);

    const network = await web3Provider.getNetwork()

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
    console.log(chainId, "<<<");
  }, [])

    const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    // if (web3Modal.cachedProvider) {
    //   connect()
    // }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
        console.log(accounts[0], "????");
        setOriginalAddress(accounts[0]);
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        console.log(_hexChainId);
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  const chainData = getChainData(chainId)
  console.log(chainData);
  useEffect(() => {
    if (chainData != null) {
      setChain(chainData.chain);
    }
  }, [chainData]);
  if (originalAddress == "" || originalAddress == undefined || originalAddress == null) {
  return (
    <div className={styles.connectMetamask}>
      <div className={styles.connectContainer}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.iconContainer}>
            <Image width={125} height={125} src='/images/bored-ape.png' alt="monkey" />
          </div>
        </div>
        <a className={styles.connectMetamaskBtn} onClick={() => connect()}>Connect Metamask</a>
      </div>
    </div>
  );
  } else if (originalAddress != "") {
    return (
      <div className={styles.connectMetamask}>
        <div className={styles.mintContainer}>
          <p className={styles.mintTitle}>PUBLIC MINT</p>
          <p className={styles.mintSubtitle}>Get an escAPE now!</p>
          <p className={styles.mintCondition}>Max of 10 escAPES per transaction.</p>
          <p className={styles.mintAddress}>Connected account: ..{originalAddress.slice(32)}</p>
          <p className={styles.ownedSupply}>Number of escAPES you own: <span className={styles.quantityOwned}>{quantityOwned}</span></p>
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
                if (parseInt(e.target.value) > 10) {
                  setQuantity(10);
                } else {
                  setQuantity(e.target.value)
                }
              }}
            />
          </div>
          <p className={styles.mintTotalPrice}>Total Price: {(parseFloat(quantity == "" || quantity == null ? "0" : quantity) * 0.05).toFixed(quantity == "" || quantity == null ? 0 : 2)} ETH</p>
          <a className={`${styles.connectMetamaskBtn}`} style={ quantity == null || quantity == "" ? { backgroundColor: "#E1E1E1" } : {}}>MINT</a>
          <p className={styles.mintedSupply}>Minted escAPES: 0/8000</p>
        </div>
      </div>
    );
  } else if (chain != "ETH") {
    return (
    <div className={styles.connectMetamask}>
      <div className={styles.connectContainer}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.iconContainer}>
            <Image width={125} height={125} src='/images/bored-ape.png' alt="monkey" />
          </div>
        </div>
        <a className={styles.connectMetamaskBtn} onClick={() => connect()}>Wrong Chain</a>
      </div>
    </div>
    );
  }
}