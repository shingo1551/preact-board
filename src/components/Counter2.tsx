import { Component } from "preact";

import { Button } from "./Button";

interface State {
  count: number;
  milli: number;
  min: number;
  last: number;
}

export default class Counter2 extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
      milli: 0,
      min: 1000,
      last: new Date().getTime()
    }
  }

  update = (count: number) => {
    const t = new Date().getTime();
    const m = t - this.state.last;
    this.setState({
      count: count,
      milli: m,
      min: m < this.state.min ? m : this.state.min,
      last: t
    });
  }

  render() {
    const state = this.state;
    return (
      <div>
        <p>{state.count}, {state.milli}, {state.min}</p>
        <Button onClick={() => { this.update(state.count - 1) }}>-1</Button>
        <Button onClick={() => { this.update(state.count + 1) }}>+1</Button>
      </div>
    )
  }
}
