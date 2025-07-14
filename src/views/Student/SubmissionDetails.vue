<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Submission Details</h1>
      <p class="text-gray-600 mb-6">Submitted to: <strong>{{ submission.department.name }}</strong></p>

      <div class="mb-4">
        <p class="text-sm text-gray-500">Status</p>
        <span :class="statusBadge(submission.status)" class="inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium">
          {{ submission.status }}
        </span>
      </div>

      <div v-if="submission.comment" class="mb-6">
        <p class="text-sm text-gray-500">Staff Comment</p>
        <p class="text-gray-800 mt-1">{{ submission.comment }}</p>
      </div>

      <div class="border-t border-gray-200 pt-4">
        <h2 class="text-lg font-semibold mb-2">Submitted Data</h2>
        <ul class="divide-y divide-gray-100">
          <li v-for="(value, key) in submission.formData" :key="key" class="py-2">
            <span class="font-medium text-gray-700">{{ key }}:</span>
            <span class="ml-2 text-gray-900">{{ value }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <router-link to="/student/submissions" class="text-indigo-600 hover:underline text-sm">
          ← Back to submissions
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../services/api';

const route = useRoute();
const submission = ref({ formData: {}, department: {} });

const fetchSubmission = async () => {
  try {
    const res = await api.get(`/submissions/${route.params.id}`);
    submission.value = res.data;
  } catch (err) {
    console.error('Failed to fetch submission:', err);
    alert('Failed to load submission');
  }
};

const statusBadge = (status) => {
  return {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
  }[status] || 'bg-gray-100 text-gray-800';
};

onMounted(fetchSubmission);
</script>
