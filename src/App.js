import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnother,
  getFavsFromLocalStorage,
  addFav,
  removeAllFromFavs,
} from "./actions";

export default function App() {
  const { loading, current, favs, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  function addToFavs() {
    dispatch(addFav(current));
    dispatch(fetchAnother());
  }
  function removeAllFavs() {
    dispatch(removeAllFromFavs());
  }
  const fetchHandler = () => {
    dispatch(fetchAnother());
  };
  useEffect(() => {
    dispatch(getFavsFromLocalStorage());
    fetchHandler();
  }, []);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button
              onClick={fetchHandler}
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
            <button
              onClick={removeAllFavs}
              className="select-none px-4 py-2 bg-red-700 hover:bg-red-600 text-white"
            >
              Favorilerin Hepsini Sil
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item, idx) => <FavItem key={idx} title={item} />)
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
