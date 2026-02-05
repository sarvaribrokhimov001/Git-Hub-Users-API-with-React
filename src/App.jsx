import { useEffect, useRef, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./App.css";
import "remixicon/fonts/remixicon.css";

const api = "https://api.github.com/users/";

function App() {
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Toastify({
      text: "Git Hub Users API ga xush kelibsiz !",
      duration: 3500,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: "black",
        color: "red",
        border: "1px solid red",
        boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
        fontWeight: "900",
        fontSize: "18px",
      },
    }).showToast();

    Toastify({
      text: "Assalomu alaykum",
      duration: 3500,
      gravity: "top",
      position: "center",
      close: true,
      style: {
        background: "black",
        color: "green",
        border: "1px solid green",
        boxShadow: "0 0 12px rgba(0, 255, 0, 0.6)",
        fontWeight: "900",
        fontSize: "18px",
      },
    }).showToast();
  }, []);

  function getUser(username) {
    setLoading(true);
    setUser(null);
    setNotFound(false);

    fetch(api + username)
      .then((res) => {
        if (!res.ok) throw new Error("User topilmadi");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNotFound(true);

        Toastify({
          text: "User topilmadi ❌",
          duration: 3500,
          gravity: "top",
          position: "center",
          close: true,
          style: {
            background: "black",
            color: "red",
            border: "1px solid red",
            boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
            fontWeight: "900",
            fontSize: "18px",
          },
        }).showToast();
      });
  }

  function handleSearch() {
    const username = inputRef.current.value.trim();

    if (!username) {
      Toastify({
        text: "Username kiriting!",
        duration: 3500,
        gravity: "top",
        position: "center",
        close: true,
        style: {
          background: "black",
          color: "red",
          border: "1px solid red",
          boxShadow: "0 0 12px rgba(255, 0, 0, 0.6)",
          fontWeight: "900",
          fontSize: "18px",
        },
      }).showToast();
      return;
    }
    getUser(username);
  }

  return (
    <>
      <nav>
        <div className="navbar">
          <i className="ri-github-fill navbar__icon"></i>
          <h4 className="navbar__title">GitHub Finder</h4>
        </div>
      </nav>

      <main>
        <div className="intro">
          <h2 className="intro__title">GitHub User Finder</h2>
          <div className="intro__main">
            <div className="intro__search__and__icon">
              <i className="ri-search-line intro__icon"></i>
              <input ref={inputRef} className="intro__search__input" type="search" placeholder="Search...." onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
            </div>
            <button className="intro__btn" onClick={handleSearch}> Search </button>
          </div>
        </div>
      </main>

      <section>
        <div className="cards">
          {loading && <h2 className="loading">Loading....</h2>}
          {notFound && <h2 className="not__found">User topilmadi ❌</h2>}

          {user && (
            <div className="card">
              <img src={user.avatar_url} alt="user__img" width="120" style={{ borderRadius: "50%" }} />
              <h2 className="username">Username: {user.login}</h2>
              <p className="followers">Followers: {user.followers}</p>
              <p className="followers">Following: {user.following}</p>
              <p className="repository">Repository: {user.public_repos}</p>
              <a className="gitHub__profile" href={user.html_url} target="_blank" rel="noreferrer"> Visit GitHub profile </a>
            </div> 
          )}
        </div>
      </section>
    </>
  );
}
export default App;