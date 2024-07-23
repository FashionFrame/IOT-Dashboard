<script lang="js">
import { saveService } from '../services/save.service'
import Graph from '../components/Graph.vue'

export default {
  components: { Graph },
  data() {
    return {
      request: {},
      loaded: false,
    }
  },
  mounted() {
    this.request = saveService.ReturnRequest(this.$route.params.id)
    if (!this.request)
      this.$router.push('/Main')
    else
      this.loaded = true
  },
  methods: {
    DeleteRequest() {
      saveService.DeleteRequest(this.$route.params.id)
      this.$router.push('/Main')
    },
  },
}
</script>

<template>
  <!--eslint-disable-->
  <div>
    <button
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="DeleteRequest()"
    >
      Delete request
    </button>
    <Graph v-if="loaded" :graph="request" />
  </div>
</template>
