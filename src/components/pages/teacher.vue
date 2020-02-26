<template>
    <div id="teacher">
        <div class="container-fluid mt-3">
            <b-card>
                <b-row class="border-bottom mb-4">
                    <b-col>
                    <h2 class="mb-3">Tambah Guru</h2>
                    </b-col>
                </b-row>
                <form v-on:submit.prevent="doSubmit()">
                    <b-row>
                        <b-col>
                            <label>Nama :</label>
                            <input type="text" v-model="model.name" require="required" class="form-control mb-4">
                        </b-col>
                        <b-col>
                            <label>No. Handphone :</label>
                            <input type="text" v-model="model.phone" require="required" class="form-control mb-4">
                        </b-col>
                        <b-col>
                            <label>Study :</label>
                            <input type="text" v-model="model.study" require="required" class="form-control mb-4">
                        </b-col>
                        <b-col>
                            <label>Homeroom Teacher :</label>
                            <input type="text" v-model="model.homeroom_teacher" require="required" class="form-control mb-4">
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <label>Alamat :</label>
                            <input type="text" v-model="model.address" require="required" class="form-control mb-4">
                        </b-col>
                        <b-col>
                            <label>Kota :</label>
                            <input type="text" v-model="model.city" require="required" class="form-control mb-4">
                        </b-col>
                        <b-col>
                            <label>Provinsi :</label>
                            <b-form-select
                            v-model="model.province"
                            class="mb-4"
                            :value="null"
                            :options="{ 'Sumatera Utara': 'Sumatera Utara', 'Sumatera Barat': 'Sumatera Barat', 'Sumatera Selatan': 'Sumatera Selatan' }"
                            id="inline-form-custom-select-pref">
                            <template v-slot:first>
                                <option :value="null">Pilih Provinsi...</option>
                            </template>
                            </b-form-select>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-button variant="secondary" @click="resetField()" type="submit" class="btntambah float-right ml-1">Batal</b-button>
                            <b-button :variant="model.id !== null ? 'success' : 'primary'" type="submit" class="btntambah float-right">{{model.id !== null ? 'Edit' : 'Tambah'}} Guru</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-card>
        </div>
        <div class="container-fluid mt-3">
            <b-card>
                <b-row class="border-bottom">
                    <b-col>
                      <b-breadcrumb :items="items" class="pl-0"></b-breadcrumb>
                    </b-col>
                </b-row>
                <b-row>
                    <b-table striped hover :busy="isBusy" :items="userList" :fields="fields">
                        <template v-slot:cell(action)="data">
                            <b-button variant="success" title="edit data" @click="doEdit(data.item)" class="p-2"><b-icon icon="box-arrow-right"></b-icon></b-button>
                            <b-button variant="danger" title="hapus data" class="p-2 ml-1" @click="showModal(data.item.id)"><b-icon icon="trash-fill"></b-icon></b-button>
                        </template>
                    </b-table>
                </b-row>
            </b-card>
            <b-modal id="bv-modal-example" hide-footer>
                <template v-slot:modal-title>
                    <h3>Hapus Guru</h3>
                </template>
                <div class="d-block text-center">
                    <h4>Yakin mau hapus guru?</h4>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Batal</b-button>
                <b-button class="mt-3" block @click="doDelete()">Delete</b-button>
            </b-modal>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
// import navbar from '@/components/layouts/navbar'
export default {
  components: {
    //   navbar
  },
  data() {
    return {
      apiUrl: window.AppConfig.apiUrl + 'teacher',
      firstName: '',
      lastName: '',
      fullname: '',
      userList: [],
      isBusy: false,
      model: {
        id: null,
        name: null,
        phone: null,
        study: null,
        homeroom_teacher: null,
        address: null,
        city: null,
        province: null
      },
      fields: [
        {
          key:'name',
          label: 'Nama'
        }, {
          key: 'phone',
          label: 'No. Handphone'
        }, {
          key: 'study',
          label: 'Bidang Studi'
        }, {
          key: 'homeroom_teacher',
          label: 'Wali Kelas'
        }, {
          key:'address',
          label: 'Alamat'
        }, {
          key:'city',
          label: 'Kota'
        }, {
          key:'province',
          label: 'Provinsi'
        }, {
          key:'created_at',
          label: 'Dibuat Pada'
        }, {
          key:'updated_at',
          label: 'Diedit Pada'
        },
        {
          key: 'action',
          label: ''
        }
      ],
      items: [
          {
            text: 'Dashboard',
            href: '#'
          },
          {
            text: 'Tickets (1454 Records)',
            href: '#'
          },
        ],
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.isBusy = true
      this.$http.get(this.apiUrl).then(resp => {
        this.userList = []
        resp.data.data.data.forEach(data => {
          this.userList.push(data)
        })
        this.isBusy = false
      }).catch(error => {
        console.log(error)
      })
    },
    doSubmit () {
      if (this.model.id !== null) {
          this.$http.patch(this.apiUrl + '/' + this.model.id, this.model).then(resp => {
            console.log(resp)
            this.resetField()
            this.getData()
          }).catch(error => {
            alert(error)
          })
      } else {
        this.$http.post(this.apiUrl, this.model).then(resp => {
          console.log(resp)
          this.resetField()
          this.getData()
        }).catch(error => {
          alert(error)
        })
      }
    },
    doDelete () {
      this.$http.delete(this.apiUrl + '/' + this.model.id).then(resp => {
        console.log(resp)
        this.resetField()
        this.getData()
        this.$bvModal.hide('bv-modal-example')
      }).catch(error => {
        alert(error)
      })
    },
    doEdit (value) {
      this.model.id = value.id
      this.model.name = value.name
      this.model.phone = value.phone
      this.model.study = value.study
      this.model.homeroom_teacher = value.homeroom_teacher
      this.model.address = value.address
      this.model.city = value.city
      this.model.province = value.province
    },
    showModal (value) {
      this.model.id = value
      this.$bvModal.show('bv-modal-example')
    },
    resetField () {
      this.model.id = null
      this.model.name = null
      this.model.phone = null
      this.model.study = null
      this.model.homeroom_teacher = null
      this.model.address = null
      this.model.city = null
      this.model.province = null
    }
  }
}
</script>
<style>
  body {
    background-color: #fbfbfb!important;
  }
  .bg-dark {
    background-color: #343a40;
  }
  .breadcrumb {
    background-color: transparent!important;
  }
  .breadcrumb-item.active {
    font-size: 11pt;
  }
  a {
    font-size: 11pt;
  }
  h2 {
    color: #6c757d!important;
  }
  .dropdown-item {
    padding: 0.25rem 1rem!important;
  }
  .btntambah {
    padding: 0.5rem !important;
  }
  .btn .colorwhite {
    color: #fff!important;
  }
</style>