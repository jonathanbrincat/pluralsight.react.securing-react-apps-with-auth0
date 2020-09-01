import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";
import { directive } from "vue/types/umd";

interface ProfileType {
  sub: string;
  nickname: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
  updatedAt: string;
}

@Component
export default class Profile extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  private profile: any | null = null;
  private error: string = "";

  beforeMount() {
    this.loadUserProfile();
  }

  private loadUserProfile() {
    this.auth.getProfile((profile: ProfileType, error: any) => {
      this.profile = profile;
      this.error = error;
    });
  }

  render(h: Function): VNode {
    return (
      <div>
        <h1>Profile</h1>
        {this.profile && (
          <div>
            <p>{this.profile.nickname}</p>
            <img
              src={this.profile.pic}
              alt="User profile avatar"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
            <pre>{JSON.stringify(this.profile, null, 4)}</pre>
          </div>
        )}
      </div>
    );
  }
}
