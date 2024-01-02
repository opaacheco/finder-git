import { useState } from "react";
import { Header } from "../../components/Header/index";

import ItemList from "../../components/ItemList/index";
import Load from "../../components/Load/index";

import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrrentUser] = useState(null);
  const [reps, setReps] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetData = async () => {
    setLoading(true);
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrrentUser({ avatar_url, name, bio, login });
      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();
      if (newRepos.length) {
        setReps(newRepos);
      }
    }
    setLoading(false);
  };

  const redirectGitPage = () => {
    window.location.href = `https://github.com/${currentUser.login}`;
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <div>
          <div>
            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              name="usuario"
              placeholder="@username"
            />
            <button onClick={handleGetData}>buscar</button>
          </div>
          {loading && <Load />}
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile"
                  alt="pedroca"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span onClick={redirectGitPage}>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : (
            <h2 className="null-page">pesquise algum perfil!</h2>
          )}
          {reps?.length ? (
            <div>
              <h4>Repositórios</h4>
              <br />
              {reps.map((reps) => (
                <>
                  <ItemList
                    title={reps.name}
                    description={reps.description}
                    language={reps.language}
                  />
                </>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
