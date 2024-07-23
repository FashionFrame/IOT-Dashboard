<script>
import Graph from './Graph.vue'

export default {
  components: { Graph },
  props: {
    graphs: Object,
  },
}
</script>

<template>
  <!-- eslint-disable  -->
  <div class="grid gap-4 grid-cols-2">
    <RouterLink v-for="graph, i in graphs.requests" :to="`/graphs/${i}`">
      <Graph :key="i" :graph="graph" />
    </RouterLink>
  </div>
</template>
