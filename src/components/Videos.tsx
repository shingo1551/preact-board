import { Component } from "preact";

export default class Video extends Component {
  video: HTMLVideoElement | undefined | null;

  async componentDidMount() {
    const video = this.video as HTMLVideoElement;
    video.srcObject = await navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: { exact: 'environment' } } });
    video.onloadedmetadata = () => video.play();
  }

  render = () => (
    <div>
      <video ref={(el) => this.video = el} autoPlay playsInline />
    </div>
  )
}
