import {createStore} from 'vuex';

// instantiation vuex
const store= createStore({
  state() {
    return {
      test: true,
    };
  },
});

export default store;
