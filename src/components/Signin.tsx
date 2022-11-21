import { useRef, useState } from "preact/hooks";

import { Error } from "./Error";
import { fetchCors } from "../shared/fetch";

export default function Signin() {
  const email = useRef<HTMLInputElement>(null);
  const passwd = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');

  const onSignIn = async (evt: Event) => {
    evt.preventDefault();

    const body = {
      email: email.current?.value,
      passwd: passwd.current?.value,
    };
    try {
      await fetchCors("sign-in", "post", body);
      location.href = "/board";
    } catch (e) {
      setError(e as string);
    }
  };

  return (
    <form class="signin">
      <h1>Sign in</h1>
      <div>
        <Error>{error}</Error>
        <input
          ref={email}
          autocomplete="username"
          placeholder="jane@example.com"
        />
        <input
          ref={passwd}
          type="password"
          autocomplete="new-password"
          placeholder="password"
        />
      </div>
      <hr />
      <button onClick={onSignIn} >Sign in</button>
    </form>
  );
}
