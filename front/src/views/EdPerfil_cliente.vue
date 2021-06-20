<template>
  <v-container>
    <v-card class="elevation-15 mx-auto" width="85%">
      <!--titulo -->
      <v-card-title class="blue darken-4">
        <div>
          <span class="font-weight-light white--text">EDITAR</span>
          <span class="black--text">PERFIL</span>
        </div>
      </v-card-title>
      <!--fim titulo -->

      <!--formulario -->
      <v-form v-model="valid">
        <v-layout row wrap class="pa-3">
          <v-container>
            <v-container class="mt-n5">
              <p class="ml-n2 mb-1 font-weight-light black--text">
                Dados Principais
              </p>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  class="font-weight-light black--text"
                >
                  <v-card flat outlined>
                    <v-card-title primary-title> Nome </v-card-title>
                    <v-card-text class="mt-n5">
                      {{ cliente.data.cliente.usuarioId.nome }}
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  xs="12"
                  class="font-weight-light black--text"
                >
                  <v-card flat outlined class="pa-n5">
                    <template>
                      <v-row class="align-center">
                        <v-col>
                          <v-card-title primary-title> Telefone </v-card-title>
                          <v-card-text class="mt-n5">
                            <span>
                              {{ cliente.data.cliente.usuarioId.telefone }}

                              <v-icon
                                right
                                small
                                class="mr-2"
                                @click="editar_telefone(telefone)"
                              >
                                mdi-pencil
                              </v-icon>
                            </span>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </template>
                  </v-card>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                  xs="12"
                  class="font-weight-light black--text"
                >
                  <v-card flat outlined class="pa-n5">
                    <template>
                      <v-row class="align-center">
                        <v-col>
                          <v-card-title primary-title> Email </v-card-title>
                          <v-card-text class="mt-n5">
                            <span>
                              {{ cliente.data.cliente.usuarioId.email }}

                              <v-icon
                                right
                                small
                                class="mr-2"
                                @click="editar_email(email)"
                              >
                                mdi-pencil
                              </v-icon></span
                            >
                          </v-card-text>
                        </v-col>
                        <v-col> </v-col>
                      </v-row>
                    </template>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <v-divider class="mb-6 mt-n1"></v-divider>
          </v-container>
        </v-layout>
      </v-form>

      <!--fim formulario -->
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { http } from "../services/config";
export default {
  components: {},
  data: () => ({
    errors: [],
    cliente: [],
  }),
  mounted() {
    console.log(this.usuario);
    console.log(this.token);
    this.listarCliente();
  },
  computed: {
    ...mapState({
      usuario: (state) => state.usuario.data.usuario.id,
      token: (state) => state.usuario.data.token,
    }),
  },
  updated() {
    //Updated quando a pagina sofre alteracao
    // this.listar();
  },
  methods: {
    listarCliente() {
      http
        .get("cliente/get-cliente", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((resposta) => {
          this.cliente = resposta;
          console.log(this.cliente);
        })
        .catch((err) => {
          console.log(err.message);
        });

      //   Barbeiro.buscar(this.token)
      //     .then((resposta) => {

      //       this.barbeiro = JSON.stringify(resposta);
      //       console.log(this.token);
      //       console.log(this.barbeiro);
      //     })
      //     .catch((err) => {
      //       console.log(err.message);
      //     });
    },
  },
};
</script>
