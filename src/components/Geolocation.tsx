import { Component } from "preact";

interface State {
  coords: { latitude: number, longitude: number }
}

export default class Geolocation extends Component<{}, GeolocationCoordinates>  {
  div: HTMLDivElement | undefined | null;

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      this.setState(position.coords);
    });
  }

  render = () => (
    <div ref={el => this.div = el} >{`${this.state.latitude}, ${this.state.longitude}`}</div>
  )
}
