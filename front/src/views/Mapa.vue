<template>
  <v-container>
    <div style="display: block; jsutify-content: space-around">
      <div>
        <h1>Sua localização</h1>
        <p>
          {{ minhaCoordenada.lat }} Latitude,
          {{ minhaCoordenada.lng }} Longitude
        </p>
      </div>
      <div>
        <h1>localização do mapa</h1>
        <p>
          {{ mapCoordenada.lat }} Latitude, {{ mapCoordenada.lng }} Longitude
        </p>
      </div>
    </div>
    <GmapMap
      :center="minhaCoordenada"
      :zoom="10"
      style="width: 640px; height: 500px; margin: 32px auto"
      map-type-id="terrain"
      ref="mapRef"
    ></GmapMap>
  </v-container>
</template>

<script>
//teste
export default {
  data() {
    return {
      name: "mapa",
      map: null,
      minhaCoordenada: {
        lat: 0,
        lng: 0,
      },
    };
  },
  created() {
    //pega coordenadas do usuario por permissao do navegador
    this.$getLocation({})
      .then((coordenada) => {
        this.minhaCoordenada = coordenada;
      })
      .catch((error) => alert(error));
  },
  mounted() {
    //adiciona o mapa a um data object
    this.$ref.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  computed: {
    mapCoordenada() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4),
      };
    },
  },
};
</script>
