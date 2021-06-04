<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "Mapa",
  data() {
    return {
      center: [-22.884128, -42.046393],
      zoom: 5,
    };
  },
  mounted() {
    this.criarMapa();
  },
  methods: {
    criarMapa() {
      this.map = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1IjoiYXVndXN0b2UiLCJhIjoiY2twaXRneDMzMTJhMjJvbzlnbmk2bHQ2aCJ9.nO7LsNbIb6X0bQdhgcangA",
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: this.center,
        zoom: this.zoom,
      });
      const nav = new mapboxgl.NavigationControl();
      this.map.addControl(nav, "top-right");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      this.map.addControl(geolocate, "top-right");
    },
  },
};
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>

