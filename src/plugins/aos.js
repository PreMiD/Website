// Animations on scroll.
import AOS from "aos";
import "@/../node_modules/aos/dist/aos.css";

export default ({ app }) => {
  app.AOS = new AOS.init({ offset: 50 });
};
