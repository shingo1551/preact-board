import { useState } from 'preact/hooks';
import Router from 'preact-router';

import Menu from "./components/Menu";

import Board from "./components/Board";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

export function App() {
  const [url, setUrl] = useState('/');

  return (
    <>
      <header>
        <h1>Fresh Board</h1>
      </header>

      <main>
        <Menu path={url} />
        <Router onChange={e => setUrl(e.url)}>
          <Board path="/board" />
          <Profile path="/profile" />
          <Signin path="/signin" />
          <Signup path="/signup" />

          <div default>Default</div>
        </Router>
      </main>
    </>
  );
}
