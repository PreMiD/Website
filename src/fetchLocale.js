export default async (context, locale) => {
	const strings = (
		await context.$axios({
			url: "/v3",
			method: "POST",
			data: {
				query: `
						{
							langFiles(lang:"${locale}",project:"website") {
								translations
							}
						}
					`
			}
		})
	).data.data.langFiles;

	if (strings.length) return strings[0].translations;

	return Promise.reject();
};
