<template>
  <q-page class="q-ma-xl">
    <h5 class="header-1">Tur Listesi</h5>
    <hr class="q-my-lg">
    <q-table
      flat
      :rows="rows1"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-xs">
            <q-btn
              round
              color="deep-orange"
              glossy
              icon="delete"
              @click="deletereq(props.row.id)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:top>
        <q-input borderless dense debounce="300" maxlength="50" color="primary" v-model="filter" placeholder="Search...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
    <div>
      <q-btn label="Back" to="/" color="primary" />
    </div>

    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">You really want to cancel this tur?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="NO" color="green" v-close-popup />
          <q-btn flat label="YES" color="deep-orange-14" @click="deleteTur()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm1">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{TurCanceled}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="green" to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'name',
    align: 'center',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
  { name: 'description', label: 'Description', field: row => row.description, sortable: true },
  { name: 'price', label: 'Price', field: row => row.price, sortable: true },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions"
  },
]
/*
const originalRows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
    
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]*/

import { defineComponent  , ref} from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const loading = ref(false)
    const filter = ref('')
    const rowCount = ref(10)
    const confirm = ref(false)
    const confirm1 = ref(false)
    const Id = ref(null)

    const TurCanceled = ref(null)
//const rows = ref([...originalRows])
    const rows1 = ref([]);
    const getTurs = () => {
      axios({
        url: "http://localhost:4000/api/tur/getboughtturs", 
        method: "GET"
      }).then((res) => {
        rows1.value = res.data
        console.log(rows1.value)
      })
    };
    getTurs();

    const deleteTur = () =>{
      axios({
        url: "http://localhost:4000/api/tur/canceltur/" + Id.value, 
        method: "DELETE"
      }).then((res) => {
        if(res.status == 200){
          const index = rows1.value.indexOf(rows1.value.find(x => x.id == Id.value))
          console.log(index)
          rows1.value.splice(index, 1);
          confirm1.value = true
          TurCanceled.value = "Tur canceled successfully"
        }
      })
      .catch((err) => {
        TurCanceled.value = "you can't cancel this tur"
      })
    }
    const deletereq = (id) => {
      confirm.value = true;
      Id.value = id
    }
    const editTur = (id) => {
      localStorage.setItem("id" , id);
    }
    
    return {
      columns,
      rows1,

      loading,
      filter,
      rowCount,

      deleteTur,
      editTur,
      deletereq,

      TurCanceled,
      confirm,
      confirm1
    }
  }
})
</script>

<style scoped>
.header-1{
  margin: 0;
}
</style>