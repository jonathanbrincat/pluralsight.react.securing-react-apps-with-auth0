import { Vue, Prop, Component } from "vue-property-decorator";
import { VNode } from "Vue";

interface Course {
  id: string;
  title: string;
}

@Component
export default class Courses extends Vue {
  @Prop({ required: true, type: Object })
  public readonly auth!: any;

  private courses: [] = [];
  private message: string = "";

  created() {
    // fetch("/course", {
    fetch("https://api.catalyz.co.uk/course", {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return (this.courses = response.courses);
      })
      .catch((error) => {
        return (this.message = error.message);
      });

    fetch("/admin", {
      headers: {
        Authorization: `Bearer ${this.auth.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        return console.log(response);
      })
      .catch((error) => {
        return (this.message = error.message);
      });
  }

  render(h: Function): VNode {
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {this.courses &&
            this.courses.map((course: Course, i: number) => (
              <li key={course.id}>{course.title}</li>
            ))}
        </ul>
      </div>
    );
  }
}
