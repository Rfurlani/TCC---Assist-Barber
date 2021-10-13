<template>
	<v-container>
		<div class="AgendaBarb">
			<v-container class="my-2">
				<v-row justify="space-between">
					<v-col cols="2">
						<v-radio-group column v-model="rel">
							<v-radio label="Confirmadas" value="Confirmado"></v-radio>
							<v-radio label="Em Espera" value="Solicitacao"></v-radio>
						</v-radio-group>
					</v-col>

					<v-divider vertical class="blue darken-3"></v-divider>
					<component v-bind:is="rel"></component>
				</v-row>
			</v-container>
		</div>
	</v-container>
</template>
<script>
import Confirmado from "../Barbeiro/Confirmado";
import Solicitacao from "../Barbeiro/solicitacao";
export default {
	data() {
		return {
			rel: "",
		};
	},
	components: {
		Confirmado,
		Solicitacao,
	},
};
</script>
