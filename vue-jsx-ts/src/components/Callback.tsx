import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";
import { $localStorage } from "../main";

@Component({})
export default class Callback extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  /* async created(): Promise<any> {
    // Handle authentication if expected values are present in the URL. Let's look for these expected values using a regex.
    if (/access_token|id_token|error/.test(this.$route.hash)) {
      const authResult = await this.auth.handleAuthentication().catch(() => {});

      console.log("CALLBACK.VUE login");

      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );

      this.$store.dispatch("setToken", expiresAt);
      $localStorage.token = expiresAt;
    } else {
      throw new Error("Invalid callback URL.");
    }
  } */

  created() {
    // Handle authentication if expected values are present in the URL. Let's look for these expected values using a regex.
    if (/access_token|id_token|error/.test(this.$route.hash)) {
      this.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  }

  render(h: Function): VNode {
    return <p>Loading...</p>;
  }
}
