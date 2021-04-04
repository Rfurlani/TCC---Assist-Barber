<template>
	<v-container class="pa-0 ma-0">
		<section ref="map" class="Principal"></section>
		<GmapMap
			ref="map"
			class="mapa mt-n9 mb-n8"
			:center="coordenadas"
			:zoom="19"
			:options="options"
			style="height: 100vh; width: 100vw"
		>
			<GmapMarker
				:key="index"
				:position="coordenadas"
				:clickable="true"
				@click="center = coordenadas"
			/>
		</GmapMap>
		<br />
	</v-container>
</template>

<script>
//teste
export default {
	name: "mapa",
	data() {
		return {
			coordenadas: {
				lat: 0,
				lng: 0,
			},
			options: {
				styles: [
					{
						elementType: "labels",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "administrative",
						elementType: "geometry",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "administrative.land_parcel",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "administrative.neighborhood",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "poi",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "road",
						elementType: "labels.icon",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
					{
						featureType: "transit",
						stylers: [
							{
								visibility: "off",
							},
						],
					},
				],
			},
		};
	},
	async mounted() {
		this.getLocalizacao();
	},

	methods: {
		getLocalizacao() {
			this.$getLocation({}).then((coordenadas) => {
				this.coordenadas = coordenadas;
				console.log(coordenadas);
			});
		},
	},
};
</script>
