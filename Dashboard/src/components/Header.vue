<!-- eslint-disable  -->
<script setup lang="js">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveService } from '../services/save.service.js'

const router = useRouter()

const open = ref(false)
const type = ref(1)
const value = ref('')
const graph = ref('')
const group_by = ref('')
const method = ref('')
const date = ref(Date.now())

function addGraph() {
  if (type.value == 1) {
    if ((type.value != null) && (value.value != null) && (group_by.value != null) && (method.value) && (graph.value != null)){
      let request = { type: type.value, value: value.value, group_by: group_by.value, method: method.value, graph_type: graph.value}
      saveService.SaveRequest(request)
    }else{
      alert('Please fill out all fields')
    }
  }else { 
    if ((type.value != null) && (value.value != null) && (date.value != null) && (graph.value != null)){
      let request = { type: type.value, value: value.value, date: date.value, graph_type: graph.value}
      saveService.SaveRequest(request)
    }else{
      alert('Please fill out all fields')
    }
  }
}

function logout() {
  saveService.SaveLogin('','')
  router.push('/')
}
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
    <button
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
      @click="open = true"
    >
      Add tracker
    </button>
    <a class="px-6 py-3 font-medium tracking-wide"> Enviro Indoor</a>
    <button class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" @click="logout()">
      log out
    </button>
  </header>

  <div
    :class="`modal ${
      !open && 'opacity-0 pointer-events-none'
    } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
      @click="open = false"
    />

    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
    >
      <div
        class="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-white cursor-pointer modal-close"
      >
        <svg
          class="text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <div class="px-6 py-4 text-left modal-content">
        <div class="flex items-center justify-between pb-3">
          <p class="text-2xl font-bold">
            Add tracker
          </p>
          <div class="z-50 cursor-pointer modal-close" @click="open = false">
            <svg
              class="text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              />
            </svg>
          </div>
        </div>

        <p>Graph type.</p>

        <form>
          <select v-model="type" name="ype" class="form-control">
            <option value="1">
              Big graph
            </option>
            <option value="2">
              Small graph
            </option>
          </select>
          <br>
          <select v-model="value" name="value">
            <option value="pressure">
              pressure
            </option>
            <option value="temperature">
              temperature
            </option>
            <option value="colour_temp">
              colour temperature
            </option>
            <option value="air_qual">
              air quality
            </option>
            <option value="humidity">
              humidity
            </option>
            <option value="luminance">
              luminance
            </option>
          </select>
          <br>
          <select v-model="graph" name="graph type">
            <option value="Bar">
              Bar
            </option>
            <option value="Line">
              Line
            </option>
          </select>
          <!-- eslint-disable-next-line vue/eqeqeq -->
          <div v-if="type == 1">
            <select v-model="group_by" name="grouping">
              <option value="day">
                day
              </option>
              <option value="week">
                week
              </option>
              <option value="month">
                month
              </option>
              <option value="year">
                year
              </option>
            </select>
            <br>
            <select v-model="method" name="method">
              <option value="max">
                max
              </option>
              <option value="min">
                min
              </option>
              <option value="avg">
                mean
              </option>
            </select>
          </div>
          <!-- eslint-disable-next-line vue/eqeqeq -->
          <div v-if="type == 2">
            <input v-model="date" class="datePicker" type="date">
          </div>

          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
              @click="open = false"
            >
              Close
            </button>
            <button
              class="px-6 py-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              @click.prevent="open = false; addGraph()"
            >
              Action
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
