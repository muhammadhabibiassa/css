<template>
    <div id="teacher">
        <div class="container-fluid mt-3">
                
        </div>
        <div class="container-fluid mt-3">
            <b-card>
                <b-row class="border-bottom">
                    <b-col>
                        <b-breadcrumb :items="items" class="pl-0"></b-breadcrumb>
                    </b-col>
                        <b-modal id="bv-modal-classroom" hide-footer>
                            <template v-slot:modal-title>
                                <h3>Tambah Kelas</h3>
                            </template>
                            <form>
                            <b-row>
                                <b-col>
                                    <label>Nama :</label>
                                    <input type="text" v-model="model.name" require="required" class="form-control mb-4">
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label>Papan Tulis :</label>
                                    <input type="text" v-model="model.whiteboard" require="required" class="form-control mb-4">
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label>Meja Guru :</label>
                                    <input type="text" v-model="model.teacher_desk" require="required" class="form-control mb-4">
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <label>Kursi Siswa :</label>
                                    <input type="text" v-model="model.student_seat" require="required" class="form-control mb-3">
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-button variant="primary" @click="$bvModal.hide('bv-modal-classroom')">Batal</b-button>
                                    <b-button class="float-right" variant="primary" @click="doSubmit()">Tambah</b-button>
                                </b-col>
                            </b-row>
                            </form>
                        </b-modal>
                  <b-col>
                    <b-button variant="primary" class="btntambah float-right" @click="showFields()">Tambah Kelas</b-button>
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
                    <h3>Hapus Kelas</h3>
                </template>
                <div class="d-block text-center">
                    <h4>Yakin mau hapus kelas?</h4>
                </div>
                <b-button class="mt-3" block variant="outline-primary" @click="doDelete()">Hapus</b-button>
                <b-button class="mt-3" block variant="outline-primary" @click="$bvModal.hide('bv-modal-example')">Batal</b-button>
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
      apiUrl: window.AppConfig.apiUrl + 'classroom',
      firstName: '',
      lastName: '',
      fullname: '',
      userList: [],
      isBusy: false,
      model: {
        id: null,
        name: null,
        whiteboard: null,
        teacher_desk: null,
        student_seat: null,
      },
      fields: [
        {
          key:'name',
          label: 'Nama'
        }, {
          key: 'whiteboard',
          label: 'Papan Tulis'
        }, {
          key: 'teacher_desk',
          label: 'Meja Guru'
        }, {
          key: 'student_seat',
          label: 'Kursi Siswa'
        }, {
          key:'created_at',
          label: 'Dibuat Pada'
        }, {
          key:'updated_at',
          label: 'Diedit Pada'
        }, {
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
            this.$bvModal.hide('bv-modal-classroom')
          }).catch(error => {
            alert(error)
          })
      } else {
        this.$http.post(this.apiUrl, this.model).then(resp => {
          console.log(resp)
          this.resetField()
          this.getData()
          this.$bvModal.hide('bv-modal-classroom')
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
      this.model.whiteboard = value.whiteboard
      this.model.teacher_desk = value.teacher_desk
      this.model.student_seat = value.student_seat
      this.showFields()
    },
    showFields () {
      this.$bvModal.show('bv-modal-classroom')
    },
    showModal (value) {
      this.model.id = value
      this.$bvModal.show('bv-modal-example')
    },
    resetField () {
      this.model.id = null
      this.model.name = null
      this.model.whiteboard = null
      this.model.teacher_desk = null
      this.model.student_seat = null
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