<template>
	<v-badge
		v-if="!['Cadastro', 'Index'].includes($route.name)"
		:content="messages"
		:value="messages"
		color="red"
		overlap
		class="small bordered"
	>
		<v-icon large> mdi-bell </v-icon>
	</v-badge>
</template>

<script>
export default {
	data() {
		return {
			messages: 1,
			show: true,
		};
	},
};
</script>
