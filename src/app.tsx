import { useState } from 'preact/hooks';
import Router from 'preact-router';

import Menu from "./components/Menu";

import Board from "./components/Board";
import Profile from "./components/Profile";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Video from "./components/Videos";
import Geolocation from "./components/Geolocation";
import Counter from "./components/Counter2";

export function App() {
  const [url, setUrl] = useState('/');

  return (
    <>
      <header>
        <h1>Preact Board</h1>
      </header>

      <main>
        <Menu path={url} />
        <Router onChange={e => setUrl(e.url)}>
          <Board path="/board" />
          <Profile path="/profile" />
          <Signin path="/signin" />
          <Signup path="/signup" />
          <Video path="/video" />
          <Geolocation path="/geolocation" />
          <Counter path="/counter" />

          <div default>Default</div>
        </Router>
      </main>
    </>
  );
}
