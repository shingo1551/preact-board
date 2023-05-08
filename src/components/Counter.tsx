import { useState } from "preact/hooks";

import { Button } from "./Button";

interface CounterProps {
  path: string;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(0);
  const [milli, setMilli] = useState(0);
  const [last, setLast] = useState(new Date().getTime());

  const update = (count: number) => {
    const t = new Date().getTime();
    setMilli(t - last);
    setLast(t);
    setCount(count);
  }

  return (
    <div>
      <p>{count}, {milli}</p>
      <Button onClick={() => { update(count - 1) }}>-1</Button>
      <Button onClick={() => { update(count + 1) }}>+1</Button>
    </div>
  );
}
