<template lang="html">
  <div>
    <div class="">
      <input type="text" value="" v-model="result">
      <p>{{ result }}</p>
      <p>{{ showList }}</p>
    </div>
    <ul>
      <li v-for="item in list" @click="clickMe(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  data() {
    return {
      result: 'no have',
      list: [
        'item1',
        'item2',
        'item3',
      ],
    };
  },
  // 存在缓存, 数据不变，则不运行
  computed: {
    showList() {
      console.log('show list');
      return this.list;
    },
  },
  methods: {
    clickMe(item) {
      console.log(item);
      this.markList();
    },
    markList() {
      console.log('jj');
    },
  }
};
</script>

<style lang="css">
</style>
