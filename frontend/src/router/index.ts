import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'
import HomeView from '../views/HomeView.vue'
import ExcelOrganizeView from '../views/ExcelOrganize/ExcelOrganizeView.vue'
import ExcelOrganizeUploadFilesView from '../views/ExcelOrganize/ExcelOrganizeUploadFilesView.vue'
import TermsOfServiceView from '../views/TermsOfServiceView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'excelOrganizeView',
          name: 'excelOrganizeView',
          component: ExcelOrganizeView,
          children: [
            {
              path: 'uploadFiles',
              name: 'uploadFiles',
              component: ExcelOrganizeUploadFilesView
            }
          ],
        },
        {
          path: 'termsOfService',
          name: 'termsOfService',
          component: TermsOfServiceView
        },
        {
          path: 'privacyPolicy',
          name: 'privacyPolicy',
          component: PrivacyPolicyView
        }
      ],
    },
  ],
});

export default router
