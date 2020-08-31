import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";
import { $localStorage } from "../main";

@Component
export default class Navigation extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  private async logout(): Promise<any> {
    await this.auth.logout();

    console.log("NAVIGATION logout");

    this.$store.dispatch("removeToken");
    // $localStorage.token = null;
    $localStorage.token = "";
  }

  render(h: Function): VNode {
    return (
      <nav>
        <ul>
          <li>
            <router-link to="/" exact>
              Home
            </router-link>
          </li>
          <li>
            <router-link to={{ name: "profile" }}>Profile</router-link>
          </li>
          <li>
            <router-link to="/public-api">Public API</router-link>
          </li>
          {this.$store.getters.isAuthenticated && (
            <li>
              <router-link to="/private-api">Private API</router-link>
            </li>
          )}

          {this.$store.getters.isAuthenticated &&
            this.auth.userHasScopes(["read:courses"]) && (
              <li>
                <router-link to="/courses">
                  Courses(Scoped Private API)
                </router-link>
              </li>
            )}

          <li>
            <button
              onClick={
                this.$store.getters.isAuthenticated
                  ? this.logout
                  : this.auth.login
              }
            >
              {this.$store.getters.isAuthenticated ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
