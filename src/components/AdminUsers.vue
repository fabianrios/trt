<template>
  <div class="adminusers">
    <Mainbar v-bind:class="{ static: isFloated }"></Mainbar>
    <div class="row">
      <h1 class="fwn tac" v-if="users.length > 0"><b>Users</b> table admin</h1>
    </div>
    <div class="adminTable">
      <input type="search" name="tablesearch" id="tablesearch" v-on:input="filterTable" placeholder="Search">
      <table id="UserTable" border="0" width="100%">
        <thead>
          <tr>
            <th class="first">Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Address</th>
            <th>Admin</th>
            <th>Series</th>
            <th>Episodes</th>
            <th class="last">Gifts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" :data-text="user.name" :data-email="user.email" :data-address="user.address">
            <td class="first" v-on:dblclick="editThat"><input name="name" type="text" v-on:blur="antiBlur" :value="user.name" disabled v-on:change="updateUser" :data-key="user.id"></td>
            <td v-on:dblclick="editThat"><input name="email" type="text" v-on:blur="antiBlur" :value="user.email" disabled v-on:change="updateUser" :data-key="user.id"></td>
            <td>
              <select v-model="user.country" name="country" v-on:change="updateUser" :data-key="user.id">
                <option value="0" disabled>Select an option</option>
                <option v-for="country in $parent.countries" v-bind:value="country.text" v-bind:key="country.text">
                  {{country.value}}
                </option>
              </select>
            </td>
            <td v-on:dblclick="editThat"><input type="text" name="address" v-on:blur="antiBlur" :value="user.address" disabled v-on:change="updateUser" :data-key="user.id"></td>
            <td><input type="checkbox" name="admin" :checked="user.admin" v-on:change="updateUser" :data-key="user.id"></td>
            <td>
              <tr v-for="serie in user.Series" :key="serie.id">
                <td>{{serie.name}}</td>
                <td><span :class="[{success: serie.UserSeries.status === 'paid'}, 'label']">{{serie.UserSeries.status}}</span></td>
              </tr>
            </td>
            <td class="last">
              <tr v-for="episode in user.Episodes" :key="episode.id">
                <td>{{episode.name}}</td>
                <td><span :class="[{success: episode.UserEpisodes.status === 'paid'},{warning: episode.UserEpisodes.status === 'started'}, 'label']">{{episode.UserEpisodes.status}}</span></td>
              </tr>
            </td>
            <td>
              <tr v-for="gift in user.Gifts" :key="gift.id">
                <td>{{gift.email}}</td>
                <td><span :class="[{success: gift.status === 'paid'},{warning: gift.status === 'started'}, 'label']">{{gift.status}}</span></td>
                <td>{{gift.pay}}</td>
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
  notifications: {
    showLoginError: {
      title: 'Failed to update',
      message: '',
      type: 'error'
    },
    showLoginSuccess: {
      title: 'Update successful',
      message: '',
      type: 'success'
    }
  },
  methods: {
    filterTable: function filterTable (e) {
      const _input = e.target
      const table = document.getElementById('UserTable')
      const tbody = table.getElementsByTagName('tbody')[0]
      const val = _input.value.toLowerCase()
      for (let index = 0; index < tbody.rows.length; index++) {
        const brows = tbody.rows[index]
        const txt = brows.dataset.text.toLowerCase()
        const email = brows.dataset.email.toLowerCase()
        const address = brows.dataset.address.toLowerCase()
        if (txt.indexOf(val) !== -1 || email.indexOf(val) !== -1 || address.indexOf(val) !== -1) {
          brows.style.display = 'table-row'
        } else {
          brows.style.display = 'none'
        }
      }
    },
    updateUser: async function updateUser (e) {
      const vm = this
      const input = e.currentTarget
      const user = input.dataset.key
      const posturl = `${vm.$parent.root}/user/${user}`
      const body = {}
      body[input.name] = input.name === 'admin' ? input.checked : input.value
      console.log(posturl, body)
      try {
        const postresponse = await axios.post(posturl, body)
        console.log('postresponse', postresponse.data)
        vm.showLoginSuccess({message: `${input.name} update to ${input.name === 'admin' ? input.checked : input.value}`, timeout: 4000})
      } catch (e) {
        vm.showLoginError({message: e.response.data, timeout: 4000})
        console.log('e', e.response.data)
      }
    },
    antiBlur: function antiBlur (e) {
      e.currentTarget.disabled = true
    },
    editThat: function editThat (e) {
      const input = e.currentTarget.querySelector('input')
      input.disabled = !input.disabled
      input.focus()
    },
    editThatCheckBox: function editThat (e) {
      const select = e.currentTarget.querySelector('input')
      select.disabled = !select.disabled
      select.focus()
      console.log(select)
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

#tablesearch{
  max-width: 300px;
}

.label{
  padding:3px 8px;
  background: gray;
  border-radius: 2px;
  &.success{
    background:green;
  }
  &.warning{
    background:orange;
  }
  color: #fff;
}

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
      height: 30px;
      line-height: 30px;
      padding-left: 3px;
      &:focus{
        outline: 0;
      }
      &:enabled{
       background: rgb(205, 205, 205); 
      }
    }
    input[type='checkbox']{
      margin: 0 auto;
      text-align: center;
      display: block;
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
