<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Staff Dashboard</h1>

    <ul class="space-y-4">
      <li>
        <router-link
          to="/staff/departments"
          class="block p-4 bg-green-50 rounded hover:bg-green-100"
        >
          Manage Departments
        </router-link>
      </li>
      <li>
        <router-link
          to="/staff/forms"
          class="block p-4 bg-green-50 rounded hover:bg-green-100"
        >
          Manage Form Fields
        </router-link>
      </li>
      <li>
        <router-link
          to="/staff/submissions"
          class="block p-4 bg-green-50 rounded hover:bg-green-100"
        >
          Process Student Submissions
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
// No script logic needed here for now
</script>

<style scoped>
/* reuse your input/button styles or leave blank */
</style>
