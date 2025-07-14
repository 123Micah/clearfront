<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
        <h2 class="text-2xl font-bold text-white">Form Fields Manager</h2>
        <p class="text-indigo-100 mt-1">Configure form fields for departments</p>
      </div>

      <!-- Department Selection -->
      <div class="p-6 border-b border-gray-100">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
        <select
          v-model="selectedDept"
          @change="loadFields"
          class="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option disabled value="">Select a department</option>
          <option v-for="d in departments" :key="d._id" :value="d._id">
            {{ d.name }}
          </option>
        </select>
      </div>

      <!-- Field Editor -->
      <div v-if="selectedDept" class="p-6">
        <div class="bg-gray-50 rounded-lg p-5 mb-6 shadow-inner">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            {{ field.id ? 'Edit Field' : 'Create New Field' }}
          </h3>
          
          <form @submit.prevent="onSaveField" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
                <input
                  v-model="field.label"
                  placeholder="e.g. Email Address"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                <input
                  v-model="field.name"
                  placeholder="e.g. email"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  v-model="field.type"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="boolean">Yes/No</option>
                  <option value="select">Dropdown</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <input
                  id="required-field"
                  v-model="field.required"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="required-field" class="ml-2 block text-sm text-gray-700">Required</label>
              </div>
            </div>

            <div v-if="field.type === 'select'" class="mt-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Dropdown Options</label>
              <input
                v-model="optionsString"
                placeholder="Option 1, Option 2, Option 3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p class="mt-1 text-xs text-gray-500">Comma-separated values</p>
            </div>

            <div class="flex space-x-3 pt-2">
              <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg v-if="!field.id" class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                {{ field.id ? 'Update Field' : 'Add Field' }}
              </button>
              
              <button
                v-if="field.id"
                @click.prevent="resetField"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Fields List -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Current Fields</h3>
          
          <div v-if="fields.length === 0" class="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No fields have been added yet
          </div>
          
          <ul v-else class="space-y-3">
            <li
              v-for="f in fields"
              :key="f._id"
              class="group flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-3">
                  <p class="text-base font-semibold text-gray-900 truncate">
                    {{ f.label }}
                    <span v-if="f.required" class="text-red-500 ml-1">*</span>
                  </p>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {{ f.type }}
                  </span>
                </div>
                
                <p class="mt-1 text-sm text-gray-500">
                  <span class="font-medium">ID:</span> {{ f.name }}
                </p>
                
                <div v-if="f.type === 'select'" class="mt-2">
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Options:</p>
                  <p class="text-sm text-gray-700">{{ f.options.join(', ') }}</p>
                </div>
              </div>
              
              <div class="flex space-x-2 ml-4">
                <button
                  @click="onEditField(f)"
                  class="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-indigo-50 transition-colors duration-150"
                  title="Edit"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                <button
                  @click="onDeleteField(f._id)"
                  class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors duration-150"
                  title="Delete"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const departments = ref([]);
const selectedDept = ref('');
const fields = ref([]);

const field = ref({ id: '', label: '', name: '', type: 'text', required: false, options: [] });
const optionsString = ref('');

const fetchDepartments = async () => {
  const res = await api.get('/departments');
  departments.value = res.data;
};

const loadFields = async () => {
  resetField();
  if (!selectedDept.value) return;
  const res = await api.get(`/forms/${selectedDept.value}`);
  fields.value = res.data;
};

const resetField = () => {
  field.value = { id: '', label: '', name: '', type: 'text', required: false, options: [] };
  optionsString.value = '';
};

const onSaveField = async () => {
  const payload = {
    departmentId: selectedDept.value,
    label: field.value.label,
    name: field.value.name,
    type: field.value.type,
    required: field.value.required,
    options: field.value.type === 'select' ? optionsString.value.split(',').map(o => o.trim()) : [],
  };

  if (field.value.id) {
    await api.put(`/forms/field/${field.value.id}`, payload);
  } else {
    await api.post('/forms', payload);
  }

  resetField();
  loadFields();
};

const onEditField = (f) => {
  field.value = { id: f._id, label: f.label, name: f.name, type: f.type, required: f.required, options: f.options };
  optionsString.value = f.options.join(', ');
};

const onDeleteField = async (id) => {
  if (!confirm('Are you sure you want to delete this field?')) return;
  await api.delete(`/forms/field/${id}`);
  loadFields();
};

onMounted(fetchDepartments);
</script>