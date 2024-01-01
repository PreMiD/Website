import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faCartArrowDown,
	faDownload,
	faHandshakeAngle
} from "@fortawesome/free-solid-svg-icons";

export default defineNuxtPlugin(() => {
	library.add(faHandshakeAngle, faDownload, faCartArrowDown);
});
