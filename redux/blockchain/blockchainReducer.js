const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  web3: null,
  errorMsg: "",
  totalOwned: 0,
  btnOneSelected: false,
  btnTwoSelected: false,
  btnThreeSelected: false,
  userLoading: false
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
        btnOneSelected: false,
        btnTwoSelected: false,
        btnThreeSelected: false,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "RESET_ACCOUNT":
      return {
        ...state,
        loading: false,
        account: null,
        errorMsg: "",
        totalOwned: 0,
        smartContract: null,
        btnOneSelected: false,
        btnTwoSelected: false,
        btnThreeSelected: false,
      }
    case "UPDATE_BTN_ONE":
      return {
        ...state,
        btnOneSelected: true,
        btnTwoSelected: false,
        btnThreeSelected: false
      }
    case "UPDATE_BTN_TWO":
      return {
        ...state,
        btnOneSelected: false,
        btnTwoSelected: true,
        btnThreeSelected: false
      }
    case "UPDATE_BTN_THREE":
      return {
        ...state,
        btnOneSelected: false,
        btnTwoSelected: false,
        btnThreeSelected: true
      }
    case "UPDATE_ALL_BTN":
      return {
        ...state,
        btnOneSelected: false,
        btnTwoSelected: false,
        btnThreeSelected: false
      }
    case "UPDATE_LOADING_TRUE":
      return {
        ...state,
        userLoading: true
      }
    case "UPDATE_LOADING_FALSE":
      return {
        ...state,
        userLoading: false
      }
    default:
      return state;
  }
};

export default blockchainReducer;
