<template>
  <div class="body">
    Template of vue3 + Typescript
    <DemoCom />
  </div>

  <div class="less-style">
    less style show
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useStore} from 'vuex';
import _ from 'lodash';
import moment from 'moment';

import {DemoCom} from 'components/DemoCom';
import {demoApi} from '@/api/module/demoApi';
import {log} from '@/utils/common';


// The Examples of use vuex and lodash
const store = useStore();
const demoValue = ref(false);
const time = ref('');

demoValue.value = _.cloneDeep(store.state.test);
console.log(demoValue.value);

// Request and mock demo
demoApi(demoValue.value).then((res)=>{
  log.success(res);
  setInterval(()=>{
    // show moment method
    time.value = moment().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});

</script>

<style scoped lang="less">
.less-style{
  width: 200px;
  height: 200px;
  background-color: rgba(0,0,0,.5);
  color: #FFF;
  position: fixed;
  top: 40%;
  left: 40%;
}
.body{
  background-image: url("assets/bg.png");
  width: 100vw;
  height: 100vh;
  background-size: cover;
}
</style>
