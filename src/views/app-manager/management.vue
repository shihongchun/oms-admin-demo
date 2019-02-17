<template>
<div class="container">
  <div class="title">
    <h3>运营管理平台管理员列表</h3>
  </div>
  <transition name="fade"
              mode="out-in">
    <router-view></router-view>
  </transition>
  <div class="banel">
    <div :span="24" class="btns">
      <el-button type="primary" size="small">添加管理员</el-button>
      <el-button type="success" size="small">修改管理员</el-button>
      <el-button type="danger" size="small">删除管理员</el-button>
    </div>
    <div class="table">
      <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
          label="用户名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>用户名: {{ scope.row.account }}</p>
              <p>密码: {{ scope.row.password }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.account }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.account)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'management',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getUSer()
    console.log(JSON.stringify(this.$store.state) + 'ads')
  },
  methods: {
    getUSer () {
      this.http.post(this.ports.user).then(res => {
        console.log(res)
        this.users = res.data
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (row) {
      this.http.get(this.ports.delUser, {
        'account': row
      }).then(res => {
        console.log(res)
        this.getUSer()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 5px;
  background-color: #fff;
  .title {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
  }
  .banel {
    margin: 10px 20px;
    padding: 10px;
  }
}
</style>
