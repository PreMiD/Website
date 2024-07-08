<script lang="ts" setup>
const { data, error } = useAsyncQuery(gql`
    query contributors {
      credits {
        user {
          id
          name
          avatar
          roleId
          role
          roleColor
          rolePosition
        }
      }
    }
  `),
  filteredData = computed(() => {
    return data.value?.credits ?? [];
  }),
  staff = computed(() => {
    return (
      filteredData.value
        ?.filter((item) =>
          [
            //* Project Management
            "673682085608816652",
            //* Moderator
            "514546359865442304",
            //* Support
            "566417964820070421",
          ].includes(item?.user?.roleId || ""),
        )
        .sort(sortContributors) || []
    );
  }),
  supporters = computed(() => {
    return (
      filteredData.value
        ?.filter((item) =>
          [
            //* Contributor
            "1032759805732978708",
            //* Supporter
            "515874214750715904",
            //* Booster
            "585532751663333383",
            //* Donator
            "502165799172309013",
          ].includes(item?.user?.roleId || ""),
        )
        .sort(sortContributors) || []
    );
  }),
  presenceDevelopers = computed(() => {
    return (
      filteredData.value
        ?.filter((item) =>
          [
            //* Presence Developer
            "606222296016879722",
          ].includes(item?.user?.roleId || ""),
        )
        .sort(sortContributors) || []
    );
  }),
  translators = computed(() => {
    return (
      filteredData.value
        ?.filter((item) =>
          [
            //* Proofreader
            "522755339448483840",
            //* Translator
            "502148045991968788",
          ].includes(item?.user?.roleId || ""),
        )
        .sort(sortContributors) || []
    );
  });

function sortContributors(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: any,
) {
  if (a?.user?.rolePosition === b?.user?.rolePosition)
    return a?.user?.name.localeCompare(b?.user?.name);

  return b?.user?.rolePosition - a?.user?.rolePosition;
}
</script>

<template>
  <div class="flex justify-center mx-5 mt-20">
    <div class="max-w-400">
      <div v-if="!error">
        <ContributorSection
          string="page.contributors.staff"
          :contributors="staff"
        />
        <ContributorSection
          string="page.contributors.supporters"
          :contributors="supporters"
        />
        <ContributorSection
          string="page.contributors.presenceDevelopers"
          :contributors="presenceDevelopers"
        />
        <ContributorSection
          string="page.contributors.translators"
          :contributors="translators"
        />
      </div>
      <div v-else>
        <h1 class="color-primary font-discord font-size-8 mb-2">Error</h1>
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
