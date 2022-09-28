<template>
    <div>
    <div class="box ">
    <div class="field">
    <label class="label">Descripcion</label>
    <div class="control">
        <input class="input" type="text" v-model="task.descrip" placeholder="Descripcion de la tarea" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Estado</label>
    <div class="control">
        <input class="input" type="text" v-model="task.status" placeholder="Estado de la tarea" required>
    </div>
    </div>

    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" id="submitButton" @click.prevent="edit">Editar</button>
    </div>
    <div class="control">
        <button class="button is-text" @click.prevent="cancelar">Cancelar</button>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditTask", 
    data(){
        return {
            task: {
                id: null, 
                descrip: null, 
                status: null,
            }
        };
    },
    created() {
        this.task = this.$route.query.inst; 
    },
    methods: {
        cancelar(){
            this.$router.push({name: "Task"});
        },
        edit() {
            console.log(this.task)
            axios.put(`http://localhost:5000/api/tasks/${this.task.id}`, this.task)
            .then(()=> {
                this.$router.push({name: "Task"});
            }
            )
            .catch((error) => {
              console.log(error);
            }
            )
        }
    }
}
</script>

<style>

</style>