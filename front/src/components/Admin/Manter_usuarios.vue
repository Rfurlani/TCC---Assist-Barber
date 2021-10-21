<template>
	<h1>manter usuarios</h1>
</template>

<script>
import { http } from "../../services/config";

export default {
	name: "manter_usuarios",
	data() {
		return {};
	},
	computed: {
		token() {
			//token do usuario
			return this.$store.getters.get_token;
		},
	},
	mounted() {},
	methods: {},
};
</script>
