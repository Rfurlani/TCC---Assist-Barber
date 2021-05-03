<template>
	<v-container class="pa-0 ma-0">
		<GmapMap
			:center="{ lat: 10, lng: 10 }"
			:zoom="7"
			map-type-id="terrain"
			style="width: 100%; height: 550px"
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
	</v-container>
</template>

<script>
//teste
export default {
	Data() {
		return {};
	},
	mounted() {
		this.geolocate();
	},
	methods: {
		setPlace(place) {
			this.currentPlace = place;
		},
		geolocate: function () {
			navigator.geolocation.getCurrentPosition((position) => {
				this.center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
			});
		},
	},
};
</script>
