<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 px-6 py-4">
        <h2 class="text-2xl font-bold text-white">Department Management</h2>
        <p class="text-indigo-200 mt-1">Create, edit, and manage departments</p>
      </div>

      <!-- Form Section -->
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ form.id ? 'Edit Department' : 'Create New Department' }}
        </h3>
        
        <form @submit.prevent="onSave" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Department Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                id="name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. Human Resources"
              />
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                v-model="form.description"
                id="description"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Optional description"
              />
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg v-if="!form.id" class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              {{ form.id ? 'Update Department' : 'Create Department' }}
            </button>
            
            <button
              v-if="form.id"
              @click.prevent="resetForm"
              type="button"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- List Section -->
      <div class="bg-gray-50 px-6 py-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Department List</h3>
        
        <div v-if="departments.length === 0" class="text-center py-8 text-gray-500">
          No departments found. Create one to get started.
        </div>
        
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="dept in departments" :key="dept._id" class="py-4">
            <div class="flex items-center justify-between">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-indigo-600 truncate">{{ dept.name }}</p>
                <p v-if="dept.description" class="text-sm text-gray-500 mt-1">{{ dept.description }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex space-x-3">
                <button
                  @click="onEdit(dept)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  @click="onDelete(dept._id)"
                  class="text-red-600 hover:text-red-900 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const departments = ref([]);
const form = ref({ id: '', name: '', description: '' });

const fetchDepartments = async () => {
  const res = await api.get('/departments');
  departments.value = res.data;
};

const resetForm = () => {
  form.value = { id: '', name: '', description: '' };
};

const onSave = async () => {
  if (form.value.id) {
    await api.put(`/departments/${form.value.id}`, {
      name: form.value.name,
      description: form.value.description,
    });
  } else {
    await api.post('/departments', {
      name: form.value.name,
      description: form.value.description,
    });
  }
  resetForm();
  fetchDepartments();
};

const onEdit = (dept) => {
  form.value = { id: dept._id, name: dept.name, description: dept.description || '' };
};

const onDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this department?')) return;
  await api.delete(`/departments/${id}`);
  fetchDepartments();
};

onMounted(fetchDepartments);
</script>