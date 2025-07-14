<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Clearance Departments</h1>
        <p class="mt-2 text-lg text-gray-600">Select a department to begin your clearance process</p>
      </div>

      <!-- Department List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="divide-y divide-gray-200">
          <!-- Search Bar -->
          <div class="px-4 py-5 sm:px-6 bg-gray-50">
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Search departments..."
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredDepartments.length === 0" class="px-4 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No departments found</h3>
            <p class="mt-1 text-sm text-gray-500">Try adjusting your search query</p>
          </div>

          <!-- Department Cards -->
          <button
            v-for="d in filteredDepartments"
            :key="d._id"
            @click="select(d)"
            class="w-full text-left px-6 py-5 hover:bg-gray-50 focus:outline-none focus:bg-indigo-50 transition-colors duration-150"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                  <svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ d.name }}</h3>
                  <p v-if="d.description" class="mt-1 text-sm text-gray-500">{{ d.description }}</p>
                </div>
              </div>
              <div>
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Help Section -->
      <div class="mt-8 bg-indigo-50 rounded-lg p-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-indigo-800">Need help with clearance?</h3>
            <div class="mt-2 text-sm text-indigo-700">
              <p>Contact the clearance office if you have questions about any department requirements.</p>
            </div>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const departments = ref([]);
const searchQuery = ref('');
const router = useRouter();

const fetchDepartments = async () => {
  try {
    const res = await api.get('/departments');
    departments.value = res.data;
  } catch (err) {
    console.error('Failed to fetch departments:', err);
  }
};

const filteredDepartments = computed(() => {
  if (!searchQuery.value) return departments.value;
  const query = searchQuery.value.toLowerCase();
  return departments.value.filter(d => 
    d.name.toLowerCase().includes(query) || 
    (d.description && d.description.toLowerCase().includes(query))
  );
});

const select = (d) => {
  router.push({ name: 'SubmitForm', params: { id: d._id }});
};

onMounted(fetchDepartments);
</script>

<style scoped>
/* Smooth transitions for interactive elements */
button {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
/* button:focus {
  @apply outline-none ring-2 ring-indigo-500 ring-offset-2;
} */
</style>