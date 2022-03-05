// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../pages/contracts/NCC.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const resetAccountRequest = (payload) => {
  return {
    type: "RESET_ACCOUNT",
    payload: payload
  }
}

const updateBtnOne = (payload) => {
  return {
    type: "UPDATE_BTN_ONE",
    payload: payload
  }
}

const updateBtnTwo = (payload) => {
  return {
    type: "UPDATE_BTN_TWO",
    payload: payload
  }
}

const updateBtnThree = (payload) => {
  return {
    type: "UPDATE_BTN_THREE",
    payload: payload
  }
}

const updateAllBtn = (payload) => {
  return {
    type: "UPDATE_ALL_BTN",
    payload: payload
  }
}

const updateLoadingTrue = (payload) => {
  return {
    type: "UPDATE_LOADING_TRUE",
    payload: payload
  }
}

const updateLoadingFalse = (payload) => {
  return {
    type: "UPDATE_LOADING_FALSE",
    payload: payload
  }
}

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        // const NetworkData = await SmartContract.networks[networkId];
        if (networkId == 80001) {
          console.log("AAAA");
          const SmartContractObj = new Web3EthContract(
            SmartContract,
            "0x040A680Be077bF157e53cBaBD7EFB9208FC4C4E7"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(setLoadingTrue());
            if (accounts[0] == undefined) {
              dispatch(resetAccount());
              window.location.reload();
            } else {
              dispatch(updateAccount(accounts[0]));
            }
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Please change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Please install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
    setTimeout(() => {
      dispatch(setLoadingFalse());
    }, 5000);
  };
};

export const resetAccount = () => {
  return async (dispatch) => {
    dispatch(resetAccountRequest({ account: null }));
    setTimeout(() => {
      dispatch(setLoadingFalse());
    }, 5000);
  }
}

export const updatingBtnOneAction = () => {
  return async (dispatch) => {
    dispatch(updateBtnOne());
  }
}

export const updatingBtnTwoAction = () => {
  return async (dispatch) => {
    dispatch(updateBtnTwo());
  }
}

export const updatingBtnThreeAction = () => {
  return async (dispatch) => {
    dispatch(updateBtnThree());
  }
}

export const updatingAllBtnAction = () => {
  return async (dispatch) => {
    dispatch(updateAllBtn());
  }
}

export const setLoadingTrue = () => {
  return async (dispatch) => {
    dispatch(updateLoadingTrue());
  }
}

export const setLoadingFalse = () => {
  return async (dispatch) => {
    dispatch(updateLoadingFalse());
  }
}