<template>
	<v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on" small text class="ml-5">
				<span>
					Login
					<v-icon>mdi-account-key</v-icon>
				</span>
			</v-btn>
		</template>

		<v-card>
			<div class="pt-3">
				<span class="ml-3">Login</span>
			</div>

			<v-container>
				<LoguinUsuario />
			</v-container>
		</v-card>
	</v-menu>
</template>

<script>
import LoguinUsuario from "./Login/LoginUsuario.vue";
export default {
	data() {
		return {
			usuario: {},
			errors: {},
		};
	},
	components: {
		LoguinUsuario,
	},
};
</script>
