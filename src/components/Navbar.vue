<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left section (Logo/Title) -->
        <div class="flex items-center">
          <router-link 
            to="/" 
            class="flex-shrink-0 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span class="text-xl font-bold hidden sm:inline">Student Clearance</span>
          </router-link>
          
          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'student'"
              to="/student" 
              class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
              exact-active-class="border-indigo-500 text-gray-900"
            >
              Dashboard
            </router-link>
            <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'student'"
              to="/student/submissions" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              My Clearance
            </router-link>
            <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'student'"
              to="/student/departments" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
            Department
            </router-link>
             <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'staff'"
              to="/staff" 
              class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
              exact-active-class="border-indigo-500 text-gray-900"
            >
              Dashboard
            </router-link>
             <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'staff'"
              to="/staff/departments" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              Departments
            </router-link>
            <router-link 
              v-if="auth.isAuthenticated && auth.user.role === 'staff'"
              to="/staff/submissions" 
              class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              active-class="border-indigo-500 text-gray-900"
            >
              Student Submissions
            </router-link>
          </div>
        </div>

        <!-- Right section (User/Auth) -->
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="auth.isAuthenticated" class="flex items-center">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-700">
                  <div class="font-medium">Hi, {{ auth.user?.fullName }}</div>
                  <div class="text-gray-500 capitalize">{{ auth.user?.role }}</div>
                </div>
                <button 
                  @click="logout" 
                  class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <div v-else class="flex space-x-4">
            <router-link 
              to="/login" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Sign in
            </router-link>
            <router-link 
              to="/register" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Register
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button 
            @click="isOpen = !isOpen"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu" 
            :aria-expanded="isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              class="block h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              class="hidden h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="sm:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          v-if="auth.isAuthenticated"
          to="/dashboard" 
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
          exact-active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
        >
          Dashboard
        </router-link>
        <router-link 
          v-if="auth.isAuthenticated && auth.user.role === 'student'"
          to="/clearance" 
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
        >
          My Clearance
        </router-link>
        <router-link 
          v-if="auth.isAuthenticated && auth.user.role === 'staff'"
          to="/approvals" 
          class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          active-class="bg-indigo-50 border-indigo-500 text-indigo-700"
        >
          Approvals
        </router-link>
      </div>
      <div v-if="auth.isAuthenticated" class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ auth.user?.fullName }}</div>
            <div class="text-sm font-medium text-gray-500 capitalize">{{ auth.user?.role }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <button 
            @click="logout"
            class="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
      <div v-else class="pt-4 pb-3 border-t border-gray-200 space-y-1 px-4">
        <router-link 
          to="/login" 
          class="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          Sign in
        </router-link>
        <router-link 
          to="/register" 
          class="block w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        >
          Register
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const isOpen = ref(false);
const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
  isOpen.value = false;
};
</script>

<style scoped>
/* Smooth transitions for dropdown */
#mobile-menu {
  transition: all 0.3s ease;
}

</style>