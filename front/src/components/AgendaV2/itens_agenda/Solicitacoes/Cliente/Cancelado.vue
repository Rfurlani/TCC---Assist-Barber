<template>
	<v-col cols="9" md="9" sm="9">
		<v-card
			flat
			class="pl-8 pt-5 pb-5 mb-1"
			outlined
			v-for="agenda in cancelados"
			:key="agenda._id"
		>
			<v-layout row wrap class="pt-4 pr-4">
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Barbeiro</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.nome }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Contato</b></h2>
					</div>
					<div>{{ agenda.agendaBarbeiroId.usuarioId.email }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Data/Hora</b></h2>
					</div>
					<div>{{ agenda.dataHora }}</div>
				</v-flex>

				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Telefone</b></h2>
					</div>
					<div>{{ agenda.agendaClienteId.usuarioId.telefone }}</div>
				</v-flex>
				<v-flex xs3 sm3 md3>
					<div class="caption black--text">
						<h2><b>Status</b></h2>
					</div>
					<div>{{ agenda.status }}</div>
				</v-flex>
				<div>
					<v-card-actions>
						<v-btn color="error" @click="cancelarAgendamento(agenda._id)"
							>Cancelar</v-btn
						>
					</v-card-actions>
				</div>
			</v-layout>
		</v-card>
	</v-col>
</template>

<script>
export default {
	data() {
		name: "component_Agenda_cancelado";
		return {
			cancelados: {},
		};
	},
	computed: {
		idAgenda_cliente() {
			return this.$store.getters.get_idAgenda_cliente;
		},
		token() {
			return this.$store.getters.get_token;
		},
		agendamentos() {
			return this.$store.getters.get_agendamentos;
		},
	},
	mounted() {
		this.cancelados = this.agendamentos.filter(function(retorno) {
			return retorno.status == "cancelado";
		});
		console.log(this.cancelados);
	},
};
</script>
