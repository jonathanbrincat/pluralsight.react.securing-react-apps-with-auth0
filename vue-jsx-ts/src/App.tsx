import { Component, Prop, Vue } from "vue-property-decorator";
import { VNode } from "Vue";
import Navigation from "./components/Navigation";

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: object;

  render(h: Function): VNode {
    return (
      <div id="app">
        <navigation auth={this.$props.auth}></navigation>

        <main class="body">
          {/* DEVNOTE: it's becoming clear you can't use camel case syntax with JSX as it won't get alias to kebab */}
          <router-view auth={this.auth}></router-view>
        </main>
      </div>
    );
  }
}
