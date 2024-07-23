<!-- eslint-disable vue/eqeqeq -->
<!-- eslint-disable -->
<script lang="js">
import { requestService } from '../services/request.service.js'
import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement,} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'BarChart',
  components: { Bar, Line },
  props: {
    graph: Object,
  },
  data() {
    return {
      loaded: false,
      res: [],
      bit: [],
      chartData: {
        labels: [ 'Placeholder'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [404]
          }
        ]
      }
    }
  },
  mounted() {
    this.loaded = false
    try {
      requestService.MakeRequest(this.graph, 'test', 'test')
        .then((data) => {
          this.chartData = data
        })
      this.loaded = true
    } catch (e){
      alert(e)
    }
  },
  methods: {
    setChartData(){
      this.chartData = {

      }
    }
  },
}
</script>

<template>
  <!-- eslint-disable -->
  <div class="w-full bg-white rounded-md shadow-md">
    <a v-if="graph.type == 1"> {{ `${graph.method} ${graph.value} by ${graph.group_by}` }}</a>
    <a v-if="graph.type == 2"> {{ `${graph.value} on ${graph.date}` }}</a>
    <Bar v-if="loaded && (graph.graph_type == 'Bar')" :data="chartData" />
    <Line v-if="loaded && (graph.graph_type == 'Line')" :data="chartData" />
  </div>
</template>
