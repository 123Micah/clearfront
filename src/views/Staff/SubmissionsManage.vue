<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 px-6 py-4">
        <h2 class="text-2xl font-bold text-white">Process Submissions</h2>
        <p class="text-indigo-200 mt-1">Review and approve student submissions</p>
      </div>

      <!-- Department Selection -->
      <div class="p-6 border-b border-gray-200">
        <label for="department-select" class="block text-sm font-medium text-gray-700 mb-2">
          Select Department
        </label>
        <select
          id="department-select"
          v-model="selectedDept"
          @change="loadSubs"
          class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option disabled value="">-- Choose department --</option>
          <option v-for="d in departments" :key="d._id" :value="d._id">
            {{ d.name }}
          </option>
        </select>
      </div>

      <!-- Submissions List -->
      <div class="bg-gray-50 px-6 py-4">
        <div v-if="subs.length" class="space-y-4">
          <div
            v-for="s in subs"
            :key="s._id"
            class="p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p class="text-sm font-medium text-gray-500">Student</p>
                <p class="text-lg font-semibold text-gray-900">
                  {{ s.student.fullName }}
                  <span class="text-sm font-normal text-gray-500">({{ s.student.matricNumber }})</span>
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Status</p>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    statusClass(s.status)
                  ]"
                >
                  {{ s.status }}
                </span>
              </div>
            </div>

            <div class="mt-3">
              <p class="text-sm font-medium text-gray-500 mb-2">Submission Data</p>
              <ul class="bg-gray-50 rounded-md p-3 space-y-1">
                <li v-for="(v, k) in s.formData" :key="k" class="text-sm">
                  <span class="font-medium text-gray-700">{{ k }}:</span>
                  <span class="text-gray-900 ml-1">{{ v }}</span>
                </li>
              </ul>
            </div>

            <div v-if="s.status === 'pending'" class="mt-4 pt-4 border-t border-gray-200">
              <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">
                Add Comment
              </label>
              <textarea
                id="comment"
                v-model="s.comment"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Optional comment for the student"
              ></textarea>
              <div class="mt-3 flex justify-end space-x-3">
                <button
                  @click="update(s._id, 'rejected', s.comment)"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reject
                </button>
                <button
                  @click="update(s._id, 'approved', s.comment)"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p v-if="selectedDept" class="text-gray-500">
            No submissions found for this department.
          </p>
          <p v-else class="text-gray-500">
            Please select a department to view submissions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const departments = ref([]);
const selectedDept = ref('');
const subs = ref([]);

const fetchDepartments = async () => {
  const res = await api.get('/departments');
  departments.value = res.data;
};

const loadSubs = async () => {
  if (!selectedDept.value) return;
  const res = await api.get(`/submissions/department/${selectedDept.value}`);
  subs.value = res.data.map(s => ({ ...s, comment: '' }));
};

const update = async (id, status, comment) => {
  await api.put(`/submissions/${id}`, { status, comment });
  loadSubs();
};

const statusClass = (st) => {
  return {
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  }[st] || 'bg-gray-100 text-gray-800';
};

onMounted(fetchDepartments);
</script>