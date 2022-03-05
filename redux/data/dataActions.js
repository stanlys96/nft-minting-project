// log
import store from "../store";
import { updatingBtnOneAction, updatingBtnTwoAction, updatingBtnThreeAction, updatingAllBtnAction } from '../blockchain/blockchainActions';

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let name = await store
        .getState()
        .blockchain.smartContract.methods.name()
        .call();
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let totalOwned = await store
        .getState()
        .blockchain.smartContract.methods.balanceOf(account)
        .call();
      console.log(totalOwned, "<<<");
      dispatch(
        fetchDataSuccess({
          name,
          totalSupply,
          totalOwned
        })
      );
      console.log(totalOwned, "!!!!");
      switch (totalOwned.toString()) {
        case "0":
          dispatch(updatingBtnThreeAction());
        case "1":
          dispatch(updatingBtnTwoAction());
        case "2":
          dispatch(updatingBtnOneAction());
        default:
          dispatch(updatingAllBtnAction());
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
