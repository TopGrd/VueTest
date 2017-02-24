<template lang="html">
  <div>
    <div v-for="(item, index) in payList">
      <el-col :span="5" :class="index % 4 == 0 ? 'top15' : 'left3 top15'">
        <el-input v-model="item.value" placeholder="请输入内容" @blur="emitMyData(item, $event)">
          <template slot="prepend">{{ item.key }}</template>
        </el-input>
      </el-col>
    </div>
    <el-col :span="10" v-if="isForm.show">
      <el-select v-model="valueVersion" placeholder="请选择版本" @change="emitVersion">
        <el-option
          v-for="item in versions"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="leftBtn" @click="fastTest">极速测试</el-button>
      <el-dialog title="极速测试" v-model="dialogFormVisible">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入支付元数据"
          v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmTest">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </div>

</template>

<script>
import { mapActions } from 'vuex';
import eventHub from '../util/eventHub';
import { PAYDATA_SET, PAYDATA_RESET, TABLEDATA_SET } from '../store/pay';

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
      valueVersion: 'a',
      dialogFormVisible: false,
      textarea: ''
    };
  },
  props: ['payList', 'isForm'],
  methods: {
    ...mapActions([PAYDATA_RESET, PAYDATA_SET, TABLEDATA_SET]),
    emitMyData(obj) {
      this.$emit('dataChange', obj);
    },
    emitVersion() {
      eventHub.$emit('versionChange', this.valueVersion);
    },
    fastTest() {
      this.dialogFormVisible = true;
    },
    confirmTest() {
      let payObject = JSON.parse(this.textarea);
      this.PAYDATA_RESET();
      this.PAYDATA_SET(payObject);
      this.TABLEDATA_SET(payObject);
      this.dialogFormVisible = false;
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
    margin-left: 3.5%;
  }
  .leftBtn {
    position: relative;
    left: 18%;
  }
</style>
