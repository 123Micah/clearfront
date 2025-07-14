import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import StudentDashboard from '../views/Student/Dashboard.vue';
import StaffDashboard from '../views/Staff/Dashboard.vue';
import Departments from '../views/Student/Departments.vue';
import SubmitForm from '../views/Student/SubmitForm.vue';
import SubmissionList from '../views/Student/SubmissionList.vue';
import DepartmentsManage from '../views/Staff/DepartmentsManage.vue';
import FormFieldsManage from '../views/Staff/FormFieldsManage.vue';
import SubmissionsManage from '../views/Staff/SubmissionsManage.vue';
import SubmissionDetails from '../views/Student/SubmissionDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/student',
    component: StudentDashboard,
    meta: { requiresAuth: true, role: 'student' },
  },
  {
    path: '/staff',
    component: StaffDashboard,
    meta: { requiresAuth: true, role: 'staff' },
  },
  {
    path: '/student/departments', component: Departments, meta: { requiresAuth: true, role: 'student' },
  },
  {
    path: '/student/submit/:id', component: SubmitForm, name: 'SubmitForm', meta: { requiresAuth: true, role: 'student' },
  },
  {
    path: '/student/submissions', component: SubmissionList, name: 'SubmissionList', meta: { requiresAuth: true, role: 'student' },
  },

  {
    path: '/student/submissions/:id',
    component: SubmissionDetails
    name: 'SubmissionDetails',
  },


  {
    path: '/staff/departments', component: DepartmentsManage, meta: { requiresAuth: true, role: 'staff' },
  },
  {
    path: '/staff/forms', component: FormFieldsManage, meta: { requiresAuth: true, role: 'staff' },
  },
  {
    path: '/staff/submissions', component: SubmissionsManage, meta: { requiresAuth: true, role: 'staff' },
  },

   // catch-all redirect
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth) {
    if (!auth.token) return next('/login');
    if (to.meta.role && auth.user.role !== to.meta.role) {
      return next(`/${auth.user.role}`);
    }
  }
  next();
});

export default router;
