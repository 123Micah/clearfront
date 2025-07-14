<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500">Welcome back, {{ auth.user?.fullName }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {{ auth.user?.matricNumber || 'N/A' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Quick Actions Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <router-link
          to="/student/departments"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 border-l-4 border-indigo-500"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-gray-900">Browse Departments</h3>
                <p class="mt-1 text-sm text-gray-500">Start your clearance process</p>
              </div>
            </div>
          </div>
        </router-link>

        <router-link
          to="/student/submissions"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 border-l-4 border-indigo-500"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-gray-900">My Submissions</h3>
                <p class="mt-1 text-sm text-gray-500">View all clearance submissions</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Recent Activity Section -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Clearance Activity</h3>
          <p class="mt-1 text-sm text-gray-500">Your latest submission statuses</p>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-if="subs.length === 0" class="px-4 py-5 sm:p-6 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by submitting your first clearance request.</p>
            <div class="mt-6">
              <router-link to="/student/departments" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                New Clearance
              </router-link>
            </div>
          </div>

          <div v-for="s in subs.slice(0, 5)" :key="s._id" class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div :class="statusIconClass(s.status)" class="flex-shrink-0 rounded-full p-2">
                  <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="s.status === 'approved'" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    <path v-if="s.status === 'pending'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    <path v-if="s.status === 'rejected'" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">{{ s.department.name }}</h4>
                  <p class="text-sm text-gray-500">Submitted {{ formatDate(s.createdAt) }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span :class="statusBadgeClass(s.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ s.status }}
                </span>
                <router-link 
                  :to="`/student/submissions/${s._id}`" 
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Details
                </router-link>
              </div>
            </div>
            <div v-if="s.comments" class="mt-3 pl-11">
              <p class="text-sm text-gray-500 italic">"{{ s.comments }}"</p>
            </div>
          </div>

          <div v-if="subs.length > 0" class="px-4 py-4 sm:px-6 bg-gray-50 text-right">
            <router-link 
              to="/student/submissions" 
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all submissions<span aria-hidden="true"> &rarr;</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Progress Summary -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Clearance Progress</h3>
          <p class="mt-1 text-sm text-gray-500">Your overall clearance status</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">Completion</span>
              <span class="text-sm font-medium text-gray-700">{{ completionPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="bg-indigo-600 h-2.5 rounded-full" 
                :style="{ width: `${completionPercentage}%` }"
              ></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center p-3 rounded-lg bg-green-50">
              <p class="text-sm font-medium text-gray-500">Approved</p>
              <p class="text-2xl font-semibold text-green-600">{{ approvedCount }}</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-yellow-50">
              <p class="text-sm font-medium text-gray-500">Pending</p>
              <p class="text-2xl font-semibold text-yellow-600">{{ pendingCount }}</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-red-50">
              <p class="text-sm font-medium text-gray-500">Rejected</p>
              <p class="text-2xl font-semibold text-red-600">{{ rejectedCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import api from '../../services/api';

const auth = useAuthStore();
const subs = ref([]);

const fetchSubs = async () => {
  try {
    const res = await api.get('/submissions/me');
    subs.value = res.data;
  } catch (err) {
    console.error('Failed to fetch submissions:', err);
  }
};

const approvedCount = computed(() => subs.value.filter(s => s.status === 'approved').length);
const pendingCount = computed(() => subs.value.filter(s => s.status === 'pending').length);
const rejectedCount = computed(() => subs.value.filter(s => s.status === 'rejected').length);
const completionPercentage = computed(() => {
  const total = subs.value.length;
  return total > 0 ? Math.round((approvedCount.value / total) * 100) : 0;
});

const statusIconClass = (status) => {
  return {
    'approved': 'bg-green-500',
    'pending': 'bg-yellow-500',
    'rejected': 'bg-red-500'
  }[status] || 'bg-gray-500';
};

const statusBadgeClass = (status) => {
  return {
    'approved': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'rejected': 'bg-red-100 text-red-800'
  }[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(fetchSubs);
</script>

<style scoped>
/* Smooth transitions for interactive elements */
a, button {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
/* a:focus, button:focus {
  @apply outline-none ring-2 ring-indigo-500 ring-offset-2;
} */
</style>