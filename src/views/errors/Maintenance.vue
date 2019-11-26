<template>
    <div class="container container_maintenance-page">
        <title>PreMiD - Maintenance</title>
        <img data-aos="sliding-up" src="./../../assets/images/logo.gif" class="logo" />
        <h1 data-aos="sliding-up" class="text-highlight">{{ $t(`maintenance.big`) }}</h1>
        <p data-aos="sliding-right">{{ $t(`maintenance.heading`) }}</p>
        <p data-aos="sliding-left">{{ $t(`maintenance.heading2`) }}</p>
        <div class="maintenance-links">
            <p data-aos="sliding-left">{{ $t(`maintenance.message`) }}</p>
            <p data-aos="sliding-right"><a class="text-highlight" href="https://status.premid.app">{{ $t(`maintenance.statuspage`) }}</a> - <a class="text-highlight" href="https://twitter.com/PreMiDapp">Twitter</a> - <a class="text-highlight" href="https://discord.premid.app">{{ $t(`maintenance.discordserver`) }}</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "maintenance",
    };
</script>