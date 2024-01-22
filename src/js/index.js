import "/sass/index.scss";
import { App } from "./App.js";
import $ from "jquery";

$(() => {
  const app = $("#app");
  new App(app);
});
