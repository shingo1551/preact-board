import { Component } from "preact";
import { route } from 'preact-router';

import { fetchCors } from "../shared/fetch";
import { state } from "../shared/store";

export interface Post {
  message: string;
  createdAt: number;
  name: string;
}
export type Posts = Post[] | null;

export default class Board
  extends Component<{}, { posts: Posts }> {
  div: HTMLDivElement | undefined | null;
  text: HTMLTextAreaElement | undefined | null;

  scroll = () => {
    setTimeout(() => {
      window.scroll({ top: this.div?.clientHeight, behavior: "smooth" });
    }, 300);
  };

  // deno-lint-ignore no-explicit-any
  fetchPost = async (method: string, body: any = undefined) => {
    try {
      this.setState({ posts: await fetchCors("post", method, body) });
      this.scroll();
    } catch (_e) {
      route("/signin");
    }
  };

  onSend = async () => {
    const body = {
      message: this.text?.value,
    };
    await this.fetchPost("post", body);
    this.text!.value = "";
  };

  async componentDidMount() {
    await this.fetchPost("get");
  }

  render = () => {
    const d = state.value.isSignIn;
    const posts = this.state.posts;

    return (
      <div ref={(el) => this.div = el}>
        <h2>Board</h2>
        <div>
          {posts?.map((post) => <Message post={post} />)}
        </div>
        <div class="bottom">
          <div>
            <textarea ref={(el) => this.text = el} disabled={!d}></textarea>
          </div>
          <button onClick={this.onSend} disabled={!d}>Send</button>
        </div>
      </div>
    );
  };
}

const Message = ({ post }: { post: Post }) => (
  <div>
    <p>
      <span>{post.name}</span> [{new Date(post.createdAt).toLocaleString()}]
    </p>
    <p>{post.message}</p>
    <hr />
  </div>
);
