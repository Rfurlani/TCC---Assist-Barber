<template>
  <GmapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    />
  </GmapMap>
</template>
<script>
export default {
  name: "Mapa",
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      currentPlace: null,
      coordenada: {
        lat: 0,
        lng: 0,
      },
    };
  },

  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
  },
  geolocate: function () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.markers = [
      {
        lat: 21.1594627,
        lng: 72.6822083,
        label: "Surat",
      },
    ];
  },
};
</script>
