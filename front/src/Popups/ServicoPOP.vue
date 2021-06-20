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
          label="Nome"
          :rules="Rules"
          hide-details="auto"
          v-model="servico.nome"
          outlined
          required
          class="mb-7"
        ></v-text-field>

        <v-text-field
          type="text"
          v-model="servico.descricao"
          clearable
          label="Descrição"
          :rules="Rules"
          placeholder="Descrição"
          outlined
          required
        ></v-text-field>
        <v-text-field
          type="number"
          v-model="servico.preco"
          :rules="Rules"
          clearable
          label="Preço"
          placeholder="Preço"
          outlined
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="salvar">
          salvar
        </v-btn>
      </v-form>
      <v-card-actions class="mt-10">
        <p class="mt-n7 ml-n1 mb-5 font-weight-light black--text">Servicos</p>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show" class="mt-n11">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <!-- <v-expand-transition>
        <div v-show="show">
          <ServicoPOP />
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Serviços</th>
                  <th class="text-left">Descrição</th>
                  <th class="text-left">Preço</th>
                  <th class="text-left">Açoes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="servico in servicos" :key="servico.id">
                  <td>{{ servico.nome }}</td>
                  <td>{{ servico.descricao }}</td>
                  <td>{{ servico.preco }}</td>
                  <td>
                    <v-icon
                      @click="editar(servico)"
                      class="btn-small blue darken-1"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      @click="deletar(servico)"
                      class="btn-small red darken-1"
                      >mdi-delete-empty</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-expand-transition> -->
      <!-- tabela -->
      <!-- <v-simple-table>
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
      </v-simple-table> -->
      <!-- tabela -->
    </v-card>
  </v-dialog>
</template>

<script>
//teste
import Servico from "../services/servico";
import { mapState } from "vuex";
// import { http } from "../services/config";

export default {
  data() {
    return {
      show: true,
      dialog: false,
      valid: true,
      Rules: [(v) => !!v || "não pode ser deixado em branco"],
      servicos: [],
      errors: [],
    };
  },
  computed: {
    ...mapState({
      usuario: (state) => state.usuario.data.usuario.id,
      token: (state) => state.usuario.data.token,
    }),
  },
  updated() {
    //Updated quando a pagina sofre alteracao
    // this.listarServico();
  },
  mounted() {
    // console.log(this.usuario);
    // console.log(this.token);
    this.listarBarbeiro();
    console.log(this.servico);
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
    deletar(servico) {
      console.log(servico);
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
    // listarServicos() {
    //   http
    //     .get(`/barbeiro/${this.barbeiroId}/listar-servicos`, {
    //       headers: { Authorization: `Bearer ${this.token}` },
    //     })
    //     .then((resposta) => {
    //       this.servico = resposta.data.servicos;
    //       console.log(this.servico);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // },
    // listarBarbeiro() {
    //   http
    //     .get("barbeiro/get-barbeiro", {
    //       headers: { Authorization: `Bearer ${this.token}` },
    //     })
    //     .then((resposta) => {
    //       this.barbeiro = resposta;
    //       this.barbeiroId = this.barbeiro.data.barbeiro._id;
    //       // console.log(this.barbeiro);
    //       // console.log(this.barbeiroId);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // },
  },
};
</script>
