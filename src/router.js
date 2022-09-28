import Vue from 'vue';
import Router from 'vue-router';
import Task from '../src/components/Task'; 
import Edit from '../src/components/Edit'; 

Vue.use(Router)

export default new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', 
            name: 'Task',
            component: Task, 
        },
        {
            path: '/edit', 
            name: 'editTask',
            component: Edit, 
        },
    ]
})
