<template>
  <div class="sponsor-card">
    <div class="sponsor-info">
      <h1>{{name}}</h1>
      <p>{{description}}</p>
    </div>
    <img class="sponsor-image" :src="rImage" />
  </div>
</template>

<style>
.sponsor-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: black;
  width: 350px;
  height: 150px;
  margin: 1em;
  border-radius: 5px;
  padding: 1em;
}

.sponsor-image {
  float: right;
  width: 100px;
  height: 100px;
}

.sponsor-info {
  width: 200px;
  float: left;
  text-align: left;
  margin-right: 2em;
}

.sponsor-info h1 {
  line-height: 0.4;
}
</style>

<script>
export default {
  name: "sponsor",
  props: {
    name: String,
    description: String,
    image: String
  },
  data() {
    return {
      rImage: require(`${this.image}`)
    };
  }
};
</script>