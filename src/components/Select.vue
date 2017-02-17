<template>
  <el-select v-model="value7" placeholder="请选择">
    <el-option-group
      v-for="group in selects"
      :label="group.label">
      <el-option
        v-for="item in group.data"
        :label="item.key"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { LOCALDATA_GET, PAYDATA_RESET, PAYDATA_SET, TABLEDATA_SET } from '../store/pay';

  export default {
    data() {
      return {
        companys: [
          '咪咕+',
          '音乐',
          '数媒',
          '互娱',
          '动漫',
          '视讯'
        ],
        selects: [{
          label: '咪咕+',
          data: []
        }, {
          label: '音乐',
          data: []
        }, {
          label: '数媒',
          data: []
        }, {
          label: '互娱',
          data: []
        }, {
          label: '动漫',
          data: []
        }, {
          label: '视讯',
          data: []
        }],
        value7: ''
      };
    },
    created() {
      this.LOCALDATA_GET();
    },
    mounted() {
      this.gerateSelectData();
    },
    watch: {
      value7: function change() {
        this.changeValue();
      }
    },
    computed: mapState({
      localData: state => state.Pay.localData
    }),
    methods: {
      ...mapActions([LOCALDATA_GET, PAYDATA_SET, PAYDATA_RESET, TABLEDATA_SET]),
      gerateSelectData() {
        const handler = (item) => {
          const entries = Object.entries(item)[0];
          console.log(entries);
          const key = entries[0];
          const value = entries[1];
          const index = value.ctype;
          const option = {
            key,
            value
          };
          this.selects[index].data.push(option);
          return option;
        };
        this.localData.map(handler);
      },
      changeValue() {
        this.PAYDATA_RESET();
        this.PAYDATA_SET(this.value7);
        this.TABLEDATA_SET(this.value7);
      }
    }
  };
</script>
