import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";
// import { $localStorage } from "../main";

@Component
export default class Home extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  render(h: Function): VNode {
    const { isAuthenticated, login } = this.auth;

    return (
      <div>
        <h1>Home</h1>

        {/* {this.$store.getters.isAuthenticated ? ( */}
        {isAuthenticated() ? (
          <router-link to="/profile">View Profile</router-link>
        ) : (
          <button onClick={login}>Log In</button>
        )}

        <p>auth.isAuthenticated = {isAuthenticated().toString()}</p>
        {/* <p>{`vuex.isAuthenticated =  ${this.$store.getters.isAuthenticated.toString()}`}</p>
        <p>{`$localStorage.isAuthenticated = ${$localStorage.isAuthenticated.toString()}`}</p> */}
      </div>
    );
  }
}
