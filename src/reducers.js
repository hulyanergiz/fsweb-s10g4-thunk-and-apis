import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  REMOVE_ALL_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}
function clearFavsFromLocalStorage() {
  return localStorage.removeItem("s10g4");
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      writeFavsToLocalStorage({
        ...state,
        favs: [...state.favs, action.payload],
      });
      return { ...state, favs: [...state.favs, action.payload] };

    case FAV_REMOVE:
      writeFavsToLocalStorage({
        ...state,
        favs: state.favs.filter((f) => f !== action.payload),
      });
      return { ...state, favs: state.favs.filter((f) => f !== action.payload) };

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload };

    case FETCH_LOADING:
      return { ...state, loading: true, error: null };

    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() || [] };
    case REMOVE_ALL_FAVS_FROM_LS:
      clearFavsFromLocalStorage();
      return { ...state, favs: initial };
    default:
      return state;
  }
}
