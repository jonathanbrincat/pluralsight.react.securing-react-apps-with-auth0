import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";

@Component({})
export default class Private extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  private message: string = "";

  created(): void {
    fetch("/private", {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    })
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
        <h1>Private</h1>
        <p>{this.message}</p>
      </div>
    );
  }
}
