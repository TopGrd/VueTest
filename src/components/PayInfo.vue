<template lang="html">
  <el-card class="box-card" v-loading="payResult.isFetching"
    element-loading-text="努力加载中...">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <h2>笑傲江湖</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <p class="product-info">道具名称：铁血弯刀</p>
        <p class="product-info">价格：¥0.00</p>
        <p class="product-info">介绍：连鞘的刀，黑黑的刀鞘，弯弯的刀柄，刀锋是青青的，青如远山，青如春树，青如情人们眼中的湖水。青青的刀光，弯弯的，开始时仿佛一钩新月，忽然间就变成了一道飞虹，纵使未出鞘也能透出逼人的杀气。</p>
        <p class="product-info">支付结果：{{ payResult.text }}</p>

      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" :disabled="!payResult.authResult" size="large" class="pay-button" @click="pay">立即购买</el-button>
    </el-row>
  </el-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { PAYDATA_CHANGE, PAYRESULT_CHANGE } from '../store/pay';

export default {
  data() {
    return {
      result: false
    };
  },
  computed: mapState({
    payData: state => state.Pay.payData,
    payResult: state => state.Pay.payResult
  }),
  methods: {
    ...mapActions([PAYDATA_CHANGE, PAYRESULT_CHANGE]),
    pay() {
      const self = this;
      self.PAYRESULT_CHANGE({
        authResult: true,
        status: 'auth success, pay request',
        text: '认证成功',
        isFetching: false
      });
      let Pay = this.$store.state.Pay.payData;
      Pay.payType = Number(Pay.payType);
      /* eslint-disable no-undef */
      console.log('支付数据:', Pay);
      const dataStr = JSON.stringify(Pay);
      migusdk.pay(dataStr, (res, msg, data) => {
        console.log(res);
        console.log(msg);
        console.log(data);
        if (res === '0000') {
          self.PAYRESULT_CHANGE({
            authResult: true,
            status: 'pay success',
            text: `订单 ${Pay.orderId} 支付成功`,
            isFetching: false
          });
        } else {
          self.PAYRESULT_CHANGE({
            authResult: true,
            status: 'pay failed',
            text: `订单 ${Pay.orderId} 支付失败 ${msg}`,
            isFetching: false
          });
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
  .product-info {
    font-size: 1.3rem;
    text-align: left;
  }
  .left17 {
    margin-left: 8.4%;
  }
  .pay-button {
    font-size: 24px;
    margin-right: 8.7%;
    padding: 14px 76px;
  }
</style>
