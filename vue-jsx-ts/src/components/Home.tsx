import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";
import { $localStorage } from "../main";

@Component
export default class Home extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  render(h: Function): VNode {
    return (
      <div>
        <h1>Home</h1>

        {this.$store.getters.isAuthenticated ? (
          <router-link to="/profile">View Profile</router-link>
        ) : (
          <button onClick={this.auth.login}>Log in</button>
        )}

        <p>auth.isAuthenticated = {this.auth.isAuthenticated().toString()}</p>
        <p>
          vuex.isAuthenticated ={this.$store.getters.isAuthenticated.toString()}
        </p>
        <p>
          $localStorage.isAuthenticated =
          {$localStorage.isAuthenticated.toString()}
        </p>
      </div>
    );
  }
}
