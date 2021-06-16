<template>
	<mapbox-map
		style="height: 100%; width: 100%; margin: 0"
		access-token="pk.eyJ1IjoiYXVndXN0b2UiLCJhIjoiY2twaXRneDMzMTJhMjJvbzlnbmk2bHQ2aCJ9.nO7LsNbIb6X0bQdhgcangA"
		map-style="mapbox://styles/mapbox/streets-v11"
		:center="coordenadas"
		:zoom="9"
		@mb-created="(mapInstance) => (map = mapInstance)"
	>
		<mapbox-marker :lng-lat="coordenadas" />
	</mapbox-map>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxMap from "@studiometa/vue-mapbox-gl/dist/components/MapboxMap";
// import MapboxMarker from "@studiometa/vue-mapbox-gl/dist/components/MapboxMarker";

export default {
	components: {
		MapboxMap,
		// MapboxMarker,
	},
	data() {
		return {
			map: null,
			location: null,
			gettingLocation: false,
			errorStr: null,
			coordenadas: {
				lng: this.location.coords.longitude,
				lat: this.location.coords.latitude,
			},
		};
	},
	created() {
		//do we support geolocation
		if (!("geolocation" in navigator)) {
			this.errorStr = "Geolocation is not available.";
			return;
		}
		this.gettingLocation = true;
		// get position
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				this.gettingLocation = false;
				this.location = pos;
				console.log(this.location);
			},
			(err) => {
				this.gettingLocation = false;
				this.errorStr = err.message;
			}
		);
	},
};
</script>
