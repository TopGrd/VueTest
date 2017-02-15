<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <PayInfo />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <Auth />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <PayForm />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PayInfo from './PayInfo';
import Auth from './Auth';
import PayForm from './Form';

export default {
  name: 'Container',
  components: {
    PayForm,
    Auth,
    PayInfo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.container .el-row {
  margin-bottom: 20px;
}
</style>
