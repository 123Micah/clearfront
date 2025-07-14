<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Submit Clearance for {{ dept.name || '...' }}
      </h2>

      <!-- Error message -->
      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p class="text-sm font-medium">{{ errorMessage }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div v-for="f in fields" :key="f._id" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            {{ f.label }} <span v-if="f.required" class="text-red-500">*</span>
          </label>

          <input
            v-if="f.type === 'text' || f.type === 'number' || f.type === 'date'"
            :type="f.type"
            v-model="formData[f.name]"
            :required="f.required"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            v-else-if="f.type === 'select'"
            v-model="formData[f.name]"
            :required="f.required"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option disabled value="">-- select --</option>
            <option v-for="opt in f.options" :key="opt">{{ opt }}</option>
          </select>

          <label v-else-if="f.type === 'boolean'" class="flex items-center space-x-2">
            <input type="checkbox" v-model="formData[f.name]" />
            <span class="text-sm text-gray-700">{{ f.label }}</span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <span v-if="!isSubmitting">Submit Clearance</span>
          <span v-else>
            <svg class="animate-spin inline w-5 h-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
              </path>
            </svg>
            Submitting...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const dept = ref({});
const fields = ref([]);
const formData = ref({});
const isSubmitting = ref(false);
const errorMessage = ref('');

const fetchSchema = async () => {
  try {
    const deptRes = await api.get(`/departments/${route.params.id}`);
    dept.value = deptRes.data;

    const fieldsRes = await api.get(`/forms/${route.params.id}`);
    fields.value = fieldsRes.data;

    // Initialize formData
    fields.value.forEach(f => {
      formData.value[f.name] = f.type === 'boolean' ? false : '';
    });
  } catch (err) {
    console.error('Failed to load form:', err);
    errorMessage.value = 'Failed to load form. Please try again later.';
  }
};

const onSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    await api.post('/submissions', {
      departmentId: route.params.id,
      formData: formData.value
    });

    router.push({ name: 'SubmissionList', query: { success: 'true' } });
  } catch (err) {
    console.error('Submission failed:', err);
    if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = 'Submission failed. Please try again.';
    }
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchSchema);
</script>
