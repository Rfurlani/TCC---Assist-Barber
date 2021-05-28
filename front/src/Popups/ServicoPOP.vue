<template>
	<v-dialog v-model="dialog" fullscreen persistent>
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="success" class="mt-1" v-bind="attrs" v-on="on" small
				>Inserir</v-btn
			>
		</template>
		<v-card>
			<!-- inicio toolbar-->
			<v-toolbar dark color="primary">
				<v-toolbar-title>Serviços</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon dark @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text class="pa-5"></v-card-text>
			<!-- fim toolbar-->

			<v-form ref="form" v-model="valid" lazy-validation class="pb-3 pl-5 pr-5">
				<v-text-field
					label="Main input"
					:rules="rules"
					hide-details="auto"
					v-model="servico.nome"
				></v-text-field>

				<v-text-field
					type="text"
					v-model="servico.descricao"
					clearable
					label="Descrição"
					placeholder="Descrição"
					outlined
				></v-text-field>
				<v-text-field
					type="number"
					v-model="servico.preco"
					:rules="precoRules"
					clearable
					label="Preço"
					placeholder="Preço"
					outlined
				></v-text-field>

				<v-btn :disabled="!valid" color="success" class="mr-4" @click="salvar">
					salvar
				</v-btn>
			</v-form>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Serviços</th>
							<th class="text-left">Descrição</th>
							<th class="text-left">Preço</th>
							<th class="text-left">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="servico in servicos" :key="servico.id">
							<td>{{ servico.nome }}</td>
							<td>{{ servico.descricao }}</td>
							<td>{{ servico.preco }}</td>
							<td>
								<v-icon @click="editar(servico)" class="btn-small blue darken-1"
									>mdi-pencil</v-icon
								>
								<v-icon @click="deletar(servico)" class="btn-small red darken-1"
									>mdi-delete-empty</v-icon
								>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-card>
	</v-dialog>
</template>

<script>
//teste
import Servico from "../services/servico";

export default {
	data() {
		return {
			dialog: false,
			valid: true,
			servicoRules: [(v) => !!v || "deve ter nome do serviço"],
			precoRules: [],
			servico: {
				nome: "",
				descricao: "",
				preco: "",
				userId: "teste",
				id: null,
			},
			servicos: [],
			errors: [],
		};
	},
	updated() {
		//Updated quando a pagina sofre alteracao
		this.listar();
	},
	methods: {
		salvar() {
			if (!this.servico.id) {
				Servico.cadastrar_servico(this.servico)
					.then((resposta) => {
						this.servico = { resposta };
						console.log(resposta);
						alert("Cadastrado com sucesso!");
						this.listarServicos();
						this.errors = {};
					})
					.catch((e) => {
						this.errors = e.response.data.errors;
					});
			} else {
				Servico.editar_servico(this.servico)
					.then((resposta) => {
						this.servico = { resposta };
						console.log(resposta);
						alert("Atualizado com sucesso!");
						this.listarServicos();
						this.errors = {};
					})
					.catch((e) => {
						this.errors = e.response.data.errors;
					});
			}
		},
		listar() {
			Servico.listarServicos()
				.then((resposta) => {
					this.servicos = resposta.data;
					console.log(resposta.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},
		deletar(servico) {
			if (confirm("Deseja excluir esse serviço?")) {
				Servico.excluir_servico(servico)
					.then((resposta) => {
						this.servicos = resposta;
						this.listar();
						this.errors = [];
					})
					.catch((e) => {
						this.errors = e.response.data.errors;
					});
			}
		},
		editar(servico) {
			this.servico = servico;
		},
	},
};
</script>
