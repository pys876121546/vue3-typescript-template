import {defineComponent} from 'vue';

// The demo component of tsx style
const DemoCom = defineComponent({
  setup(props) {
    console.log(props);
    return ()=>{
      return <div>hello, this is jsx featrues support!</div>;
    };
  },
});

export {DemoCom};
