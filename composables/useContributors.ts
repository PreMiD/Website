import type { ContributorsQuery } from "#gql";

type Contributor = NonNullable<ContributorsQuery["credits"]>[number];

const sortContributors = (a: Contributor, b: Contributor) => {
		if (a?.user?.rolePosition === b?.user?.rolePosition)
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain,@typescript-eslint/no-non-null-assertion
			return a!.user!.name!.localeCompare(b?.user?.name!);
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain,@typescript-eslint/no-non-null-assertion
		return b?.user?.rolePosition! - a?.user?.rolePosition!;
	},
	filterByRules = (roles: string[]) => (contributor: Contributor) =>
	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain,@typescript-eslint/no-non-null-assertion
		roles.includes(contributor?.user?.roleId!);

export const useContributors = () => {
	const { roles } = useAppConfig(),
		{ data, error } = useAsyncGql({ operation: "contributors" }),
		contributors = computed(() => data.value.credits || []);

	return {
		error,
		presenceDevelopers: computed(() =>
			contributors.value
				.filter(filterByRules([roles.PresenceDeveloper]))
				.sort(sortContributors),
		),
		staff: computed(() =>
			contributors.value
				.filter(
					filterByRules([
						roles.ProjectManagement,
						roles.Moderator,
						roles.Support,
					]),
				)
				.sort(sortContributors),
		),
		supporters: computed(() =>
			contributors.value
				.filter(
					filterByRules([
						roles.Contributor,
						roles.Supporter,
						roles.Booster,
						roles.Donator,
					]),
				)
				.sort(sortContributors),
		),
		translators: computed(() =>
			contributors.value
				.filter(filterByRules([roles.ProofReader, roles.Translator]))
				.sort(sortContributors),
		),
	};
};
