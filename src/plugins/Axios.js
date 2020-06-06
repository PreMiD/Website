export default function ({ $axios }) {
	$axios.onRequest(c => {
		if (c.headers["Authorization"]) delete c.headers["Authorization"];
		if (c.headers.common["Authorization"])
			delete c.headers.common["Authorization"];
	});
}
