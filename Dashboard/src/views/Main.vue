<script>
import { saveService } from '../services/save.service.js'
import GraphGrid from '../components/GraphGrid.vue'

export default {
  components: { GraphGrid },
  data() {
    return {
      requests: [],
    }
  },
  mounted() {
    this.requests = this.getRequests()
  },
  methods: {
    getRequests() {
      return saveService.ReturnRequests()
    },
    clearRequests() {
      saveService.ClearRequests()
    },
  },
}
</script>

<template>
  <h3 class="text-gray-700 text-3xl font-medium">
    <br>
    <button
      class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="requests = getRequests()"
    >
      Refresh
    </button>
    <button
      class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="clearRequests()"
    >
      Clear
    </button>
    <br><br>
    <GraphGrid :graphs="requests" />
  </h3>
</template>
