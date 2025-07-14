<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">My Submissions</h1>
            <p class="mt-2 text-lg text-gray-600">View all your clearance submissions</p>
          </div>
          <router-link 
            to="/student/departments" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Submission
          </router-link>
        </div>

        <!-- Status Filters -->
        <div class="mt-6 flex flex-wrap gap-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="toggleFilter(filter.value)"
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              activeFilters.includes(filter.value) 
                ? filter.activeClass 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Submissions List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <!-- Empty State -->
        <div v-if="filteredSubmissions.length === 0" class="px-4 py-12 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No submissions found</h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ activeFilters.length > 0 ? 'Try adjusting your filters' : 'Get started by creating your first submission' }}
          </p>
          <div class="mt-6">
            <router-link 
              to="/student/departments" 
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              New Submission
            </router-link>
          </div>
        </div>

        <!-- Submission Cards -->
        <div v-else class="divide-y divide-gray-200">
          <div 
            v-for="s in filteredSubmissions" 
            :key="s._id" 
            class="px-6 py-5 hover:bg-gray-50 transition-colors duration-150"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4">
                <div :class="statusIconClass(s.status)" class="flex-shrink-0 mt-1 rounded-full p-2">
                  <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="s.status === 'approved'" fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    <path v-if="s.status === 'pending'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    <path v-if="s.status === 'rejected'" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ s.department.name }}</h3>
                  <div class="mt-1 flex flex-wrap items-center gap-2">
                    <span :class="statusBadgeClass(s.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ s.status }}
                    </span>
                    <span class="text-sm text-gray-500">
                      Submitted {{ formatDate(s.createdAt) }}
                    </span>
                  </div>
                  <div v-if="s.comment" class="mt-2">
                    <p class="text-sm text-gray-700">
                      <span class="font-medium">Comment:</span> {{ s.comment }}
                    </p>
                  </div>
                </div>
              </div>
              <router-link 
                :to="`/student/submissions/${s._id}`" 
                class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredSubmissions.length > 0" class="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ startItem }}</span> to <span class="font-medium">{{ endItem }}</span> of <span class="font-medium">{{ filteredSubmissions.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="currentPage = page"
                  :aria-current="page === currentPage ? 'page' : undefined"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage 
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../../services/api';

const subs = ref([]);
const activeFilters = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const filters = [
  { value: 'pending', label: 'Pending', activeClass: 'bg-yellow-100 text-yellow-800' },
  { value: 'approved', label: 'Approved', activeClass: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', activeClass: 'bg-red-100 text-red-800' },
];

const fetchSubs = async () => {
  try {
    const res = await api.get('/submissions/me');
    subs.value = res.data;
  } catch (err) {
    console.error('Failed to fetch submissions:', err);
  }
};

const toggleFilter = (filter) => {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter);
  } else {
    activeFilters.value.push(filter);
  }
  currentPage.value = 1;
};

const filteredSubmissions = computed(() => {
  let filtered = subs.value;
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(s => activeFilters.value.includes(s.status));
  }
  // Sort by date (newest first)
  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSubmissions.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredSubmissions.value.length / itemsPerPage));
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, filteredSubmissions.value.length));

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
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
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(fetchSubs);
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button, a {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
/* button:focus, a:focus {
  @apply outline-none ring-2 ring-indigo-500 ring-offset-2;
} */
</style>