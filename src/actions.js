import axios from "axios";
import { toast } from "react-toastify";
export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (fav) => {
  toast.warn("Favorilerden çıkarıldı");
  return { type: FAV_REMOVE, payload: fav };
};

const fetchLoading = () => {
  return { type: FETCH_LOADING };
};
const fetchSuccess = (fact) => {
  return { type: FETCH_SUCCESS, payload: fact };
};
const fetchError = (message) => {
  return { type: FETCH_ERROR, payload: message };
};

export const fetchAnother = () => (dispatch) => {
  const loadingToast = toast.loading("Please wait...");
  dispatch(fetchLoading());
  axios
    .get("https://catfact.ninja/fact")
    .then((res) => {
      console.log(res);
      toast.update(loadingToast, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      dispatch(fetchSuccess(res.data.fact));
    })
    .catch((err) => {
      toast.update(loadingToast, {
        render: "Error!",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      dispatch(fetchError(err));
    });
};
