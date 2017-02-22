<template lang="html">
  <div>
    <div v-for="(item, index) in payList">
      <el-col :span="5" :class="index % 4 == 0 ? 'top15' : 'left3 top15'">
        <el-input v-model="item.value" placeholder="请输入内容" @blur="emitMyData(item, $event)">
          <template slot="prepend">{{ item.key }}</template>
        </el-input>
      </el-col>
    </div>
    <el-col :span="7" class="leftSelect" v-if="isForm.show">
      <el-select v-model="valueVersion" placeholder="请选择版本">
        <el-option
          v-for="item in versions"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>

  </div>

</template>

<script>
export default {
  data() {
    return {
      versions: [
        {
          label: 'A版本',
          value: 'a'
        },
        {
          label: 'B版本',
          value: 'b'
        }
      ],
      valueVersion: 'a'
    };
  },
  props: ['payList', 'isForm'],
  methods: {
    emitMyData(obj) {
      console.log('emit');
      this.$emit('dataChange', obj);
    }
  }
};
</script>

<style lang="css">
  .left3 {
    margin-left: 5%;
  }
  .top15 {
    margin-bottom: 15px;
  }
  .leftSelect {
    margin-left: 0.5%;
  }
</style>
