<template>
  <div>
    <!--Cabecera-->
    <section class="hero is-small is-link">
      <div class="hero-body">
        <p class="title">
          Tareas
        </p>
        <p class="subtitle">
          Aquí se muestra la lista de tareas
        </p>
        </div>
    </section>  
    <!--Búscador y filtros-->
    <div class="search-area">
      <nav class="level">
        <!-- Left side -->
        <form class="level-left" @submit.prevent="searchTask">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="búsqueda de tareas..." style="min-width: calc(45vw)" v-model='buscador'>
              </p>
              <p class="control">
                <button class="button is-link">
                  <font-awesome-icon icon="search"/>
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </form>
        <div class="level-rigth">
          <div class="field has-addons">
            <p class="control">
              <button class = "button is-link">
                Agregar
              </button>
            </p>
          </div>
        </div>
      </nav>
    </div>

    <!--Listado de productos-->
    <div class="list-task">
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-for="task in taskList" :key="task.id">
          <div class="container">

            <div class="card">

              <header class="card-header">
                <p class="card-header-title">
                  {{ task.id }}
                </p>
              </header>

              <div class="card-content">
                <div class="content">
                  <p v-if="task.descrip"><strong>Descripcion: </strong> {{ task.descrip }} </p>
                  <p v-if="task.status"><strong>Estado: </strong> {{ task.status }} </p>
                </div>
                <nav class='level is-mobile'>
                  <div class="level.right">
                    <button class="button is-link" @click.prevent='edit(task)'>
                      Editar                    
                    </button>   
                    <button class="button is-link" @click.prevent='del(task)'>
                      Borrar                    
                    </button>                    
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>     
</template>

<script>
import {HTTP} from '@/http'
import axios from 'axios';
export default { // eslint-disable-next-line
    name: 'Task',
    data() {
        return {
            taskList: [],
            loading: false,
            search: {
            },
            buscador: null, 
            pagination:{
                page: 1,
                pages: 1
            },
        };
    },
    mounted (){
        this.searchTask();
    },
    methods: {
      edit(instance) {
          this.$router.push({name: 'editTask', query:{inst:instance}})
        }, 
        del(instance) {
          axios.delete(`http://localhost:5000/api/tasks/${instance.id}`)
            .then(()=> {
              this.searchTask();
            }
            )
            .catch((error) => {
              console.log(error);
              this.searchTask();
            }
            )
        }, 
        async searchTask(page){
                this.loading = true;
                this.search.id =this.buscador 
            try {
            let data = (await HTTP.post(`/search/tasks`, this.search, {
            params: {
            page: page ? page : 1
            }
            })).data;
            if (data.items) {
            this.taskList = data.items;
            this.pagination.page = data.page;
            this.pagination.pages = data.pages;
            } else {
            this.taskList = data;
            this.pagination = {};
            }
        } catch (error) {
            //eslint-disable-next-line no-prototype-builtins
            if (!error.hasOwnProperty('response')) {
            this.notificar('error', this.title, 'Ha ocurrido un error inesperado. Error: ' + error);
            }
            if (error.response.status !== 404) {
            this.notificar('error', this.title, 'No se han podido obtener la lista de proyectos. Error: ' + error);
            }
            this.taskList = [];
        } finally {
            this.loading = false;
        }
        }
        }
        }
</script>

<style scoped>

</style> 