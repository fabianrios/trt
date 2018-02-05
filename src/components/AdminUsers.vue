<template>
  <div class="adminusers">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <h1 class="fwn tac" v-if="users.length > 0"><b>Users</b> table admin</h1>
    </div>
    <div class="adminTable">
      <table border="0" width="100%">
        <thead>
          <tr>
            <th class="first">Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Address</th>
            <th>Admin</th>
            <th>Series</th>
            <th class="last">Episodes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="first" v-on:dblclick="editThat"><input type="text" v-on:blur="antiBlur" :value="user.name" disabled></td>
            <td v-on:dblclick="editThat"><input type="text" v-on:blur="antiBlur" :value="user.email" disabled></td>
            <td>{{user.country}}</td>
            <td>{{user.address}}</td>
            <td>{{user.admin}}</td>
            <td>
              <tr v-for="serie in user.Series" :key="serie.id">
                <td>{{serie.name}}</td>
                <td>{{serie.UserSeries.status}}</td>
              </tr>
            </td>
            <td class="last">
              <tr v-for="episode in user.Episodes" :key="episode.id">
                <td>{{episode.name}}</td>
                <td>{{episode.UserEpisodes.status}}</td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>

import Footer from '@/components/Footer'
import Mainbar from '@/components/Mainbar'
import axios from 'axios'

export default {
  name: 'adminusers',
  data () {
    return {
      msg: 'adminusers',
      isFloated: true,
      users: []
    }
  },
  created () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.$parent.isAdmin()
      this.getAllUsers()
    }
  },
  methods: {
    antiBlur: function antiBlur (e) {
      e.currentTarget.disabled = true
    },
    editThat: function editThat (e) {
      const input = e.currentTarget.querySelector('input')
      input.disabled = !input.disabled
      input.focus()
      console.log(input)
    },
    getAllUsers: async function getAllUsers () {
      const vm = this
      const url = `${vm.$parent.root}/user/all`
      try {
        const response = await axios.get(url)
        vm.users = response.data
      } catch (e) {
        console.log('e', e.response.data)
        vm.errors.push(e)
      }
    }
  },
  components: {
    Footer,
    Mainbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.adminTable{
  background: #fff;
  padding: 50px;
}
table, caption, tbody, tfoot, thead, tr, th, td {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
table {
  font-family: 'Arial';
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid #eee;
  border-bottom: 2px solid #000;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  thead{
    th{
      padding: 12px 5px;
    }
  }
  tr {
     &:hover {
      background: #f4f4f4;
      
      td {
        color: #555;
        border-color: rgb(211, 211, 211);
      }
    }
  }
  th, td {
    color: #999;
    border: 1px solid #eee;
    padding: 0;
    border-collapse: collapse;
    input{
      margin: 0;
      border: 0;
      background: transparent;
      &:enabled{
       background: rgb(165, 165, 165); 
      }
    }
    th, td {
      padding: 12px 5px;
    }
  }
  th {
    background: #000;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
}
</style>
