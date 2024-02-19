import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBolt,
  faCartArrowDown,
  faDownload,
  faHandshakeAngle,
  faPlus,
  faStream,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default defineNuxtPlugin(() => {
  library.add(
    faHandshakeAngle,
    faDownload,
    faCartArrowDown,
    faStream,
    faUser,
    faBolt,
    faPlus,
    faHeart,
  );
});
