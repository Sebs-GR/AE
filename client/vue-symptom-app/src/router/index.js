import { createRouter, createWebHistory } from 'vue-router'
import PatientsView from '../views/PatientsView.vue'
import SymptomsView from '../views/SymptomsView.vue' // You need to create this component

const routes = [
  {
    path: '/',
    name: 'Patients',
    component: PatientsView
  },
  {
    path: '/symptoms',
    name: 'Symptoms',
    component: SymptomsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router