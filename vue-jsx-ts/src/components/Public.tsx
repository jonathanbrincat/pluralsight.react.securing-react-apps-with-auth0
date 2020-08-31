import { Vue, Component } from "vue-property-decorator";
import { VNode } from "Vue";

@Component
export default class Public extends Vue {
  private message: string = "";

  created(): void {
    fetch("/public") //DEVNOTE: this is relative to Express server; made possible by proxy => vue.config.js
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return (this.message = response.message);
      })
      .catch((error) => {
        return (this.message = error.message);
      });
  }

  render(h: Function): VNode {
    return (
      <div>
        <h1>Public</h1>
        <p>{this.message}</p>
      </div>
    );
  }
}
