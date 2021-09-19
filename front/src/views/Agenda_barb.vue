<template>
    <v-container>
        <v-card class="elevation-15 mx-auto" width="95%">
            <v-card-title class="blue darken-4">
                <div>
                    <span class="font-weight-light white--text">AGENDA</span>
                </div>
            </v-card-title>
            <div class="AgendaBarb">
                <h3 class="ml-3">Agendamentos Confirmado</h3>
                <v-container class="my-2">
                    <v-card
                        flat
                        class="pl-8 pt-3 pb-4 mb-1"
                        outlined
                        v-for="agenda in agendamentos"
                        :key="agenda" >
                        <v-layout row wrap>
                            <v-flex xs3 sm4 md2>
                                <div class="caption black--text"><h2><b>Nome</b></h2></div>
                                <div>{{ agenda.nome }}</div>
                            </v-flex>
                            <v-flex xs3 sm4 md2>
                                <div class="caption black--text"><h2><b>Data</b></h2></div>
                                <div>{{ agenda.data }}</div>
                            </v-flex>
                            <v-flex xs3 sm4 md2>
                                <div class="caption black--text"><h2><b>Hora</b></h2></div>
                                <div>{{ agenda.hora }}</div>
                            </v-flex>
                            <v-flex xs3 sm4 md2>
                                <div class="caption black--text"><h2><b>Endereço</b></h2></div>
                                <div>{{ agenda.cidade }}, {{ agenda.bairro }}, {{ agenda.numero }}</div>
                            </v-flex>
                            <v-flex xs3 sm4 md2>
                                <div class="caption black--text"><h2><b>Telefone</b></h2></div>
                                <div>{{ agenda.telefone }}</div>
                            </v-flex>
                                <v-card-actions>
                                    <v-btn color="success">Finalizar</v-btn>
                                    <v-btn color="error">Cancelar</v-btn>
                                </v-card-actions>
                        </v-layout>
                    </v-card>
                </v-container>
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
	data() {
		return {
			agendamentos: [
				{
					nome: "rodrigo",
					data: "25/09/2021",
                    hora: "17h",
                    telefone: "98765-4321",
                    cidade: "araruama",
					bairro: "fazendinha",
					numero: "2030",
				},
				{
					nome: "manoel",
					data: "25/09/2021",
                    hora: "18h",
                    telefone: "98765-4322",
                    cidade: "araruama",
					bairro: "fazendinha",
					numero: "2040",
				},
				{
					nome: "cristovan",
					data: "25/09/2021",
                    hora: "19h",
                    telefone: "98765-4323",
                    cidade: "araruama",
					bairro: "fazendinha",
					numero: "2050",
				},
				
			],
		};
	},
};
</script>