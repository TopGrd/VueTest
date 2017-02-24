<template lang="html">
  <el-tabs type="border-card" v-loading="loading2"
    element-loading-text="配置文件拼命加载中">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-information"></i> 应用基本信息</span>
      <el-row>
        <Normal
        @dataChange="changePayData"
        :payList="authList"
        :isForm="showSelect"
        v-if="isFetching"/>
      </el-row>
      <el-row type="flex" justify="start">
        <SelectData ref="select" />
        <el-button class="left3" type="info" @click="init">点击完成计费认证</el-button>
        <el-button class="left3" type="primary" icon="view" @click="dialogVisible.value = true">观测
        </el-button>
        <el-col :span="5" class="left3">
          <el-input placeholder="请输入内容" v-model="dataKey">
            <template slot="prepend">key</template>
          </el-input>
        </el-col>
        <el-button class="left3" @click="saveDataToLocal">保存</el-button>
        <el-button class="left3" @click="deleteDataToLocal">删除</el-button>
        <Observer :visible="dialogVisible" :storageKey="dataKey"/>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE, TABLEDATA_CHANGE } from '../store/pay';
import eventHub from '../util/eventHub';
import Normal from './NormalPay';
import Observer from './Observer';
import SelectData from './Select';
import '../assets/js/migu';
import authSession from '../assets/js/session';

export default {
  name: 'form',
  data() {
    return {
      dataKey: '',
      showSelect: {
        show: true
      },
      loading2: true,
      dialogVisible: {
        value: false,
        save: false
      },
      version: 'a'
    };
  },
  components: {
    Normal,
    SelectData,
    Observer
  },
  created() {
    const self = this;
    axios
      .get('../static/data/authList.json')
      .then((res) => {
        self.AUTHLIST_FETCH(res.data.authList);
        self.gerateAuthdata(res.data.authList);
      })
      .then(self.loading2 = false)
      .then(this.$notify({
        title: '成功',
        message: '应用基本信息已配置',
        type: 'success',
        duration: 1500
      }))
      .catch((err) => {
        this.$notify({
          title: '失败',
          message: err,
          type: 'error',
          duration: 1500
        });
      });
    eventHub.$on('authAgin', this.authAginGen);
    eventHub.$on('versionChange', this.versionChange);
  },
  computed: mapState({
    authList: state => state.Pay.authList.list,
    isFetching: state => state.Pay.authList.isFetching,
    payResult: state => state.Pay.payResult
  }),
  methods: {
    ...mapActions([AUTHLIST_FETCH, PAYDATA_CHANGE, AUTHLIST_CHANGE, PAYRESULT_CHANGE,
      TABLEDATA_CHANGE]),
    gerateAuthdata(authList) {
      const dataPatch = {};
      authList.map((item) => {
        dataPatch[item.key] = item.value;
        this.PAYDATA_CHANGE(dataPatch);
        return dataPatch;
      });
      return dataPatch;
    },
    changeSend(obj) {
      this.PAYDATA_CHANGE(obj);
      this.TABLEDATA_CHANGE(obj);
    },
    changePayData(val) {
      const obj = {};
      obj[val.key] = val.value;
      this.changeSend(obj);
    },
    authAginGen() {
      this.gerateAuthdata(this.authList);
    },
    saveDataToLocal() {
      this.dialogVisible.value = true;
      this.dialogVisible.save = true;
    },
    deleteDataToLocal() {
      let delKey = this.$refs.select.$children[0].$data.selectedLabel;
      this.$confirm(`此操作将删除${delKey}对应的祝福数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        localStorage.removeItem(delKey);
      })
      .then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    versionChange(v) {
      console.log('version', v);
      this.version = v;
    },
    /* eslint-disable no-undef */
    init() {
      const timer = 10000;
      let initOnce = false;
      this.PAYRESULT_CHANGE({
        isFetching: true,
        msg: '支付认证中'
      });
      const self = this;
      const data = this.$store.state.Pay.payData;
      setTimeout(() => {
        if (initOnce === false) {
          self.$notify({
            title: '失败',
            message: '认证失败',
            type: 'error',
            duration: 3000
          });
          self.PAYRESULT_CHANGE({
            authResult: false,
            status: 'auth failed',
            text: '认证失败',
            isFetching: false
          });
        }
      }, timer);
      migusdk.init(data.netId, (msg, result, sessionId) => {
        initOnce = true;
        if (msg === '0000') {
          self.AUTHLIST_CHANGE({
            key: 'authSessionId',
            value: sessionId
          });
          const app = {
            netId: data.netId,
            ctype: data.ctype,
            authId: data.authId,
            sessionId
          };

          authSession(app, () => {
            self.PAYRESULT_CHANGE({
              authResult: true,
              status: 'auth success',
              text: '认证成功',
              isFetching: false
            });
          });
        } else {
          self.PAYRESULT_CHANGE({
            authResult: false,
            status: 'auth failed',
            text: '认证失败',
            isFetching: false
          });
        }
      }, 'Common', this.version.value);
    }
  }
};
</script>

<style lang="css">
</style>
