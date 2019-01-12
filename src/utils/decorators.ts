import { createDecorator } from 'vue-class-component';
import store from '../store';
// import { mapState } from 'vuex';

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

const State = (stateName?: string) =>
  createDecorator((options, key) => {
    if (!options.computed) options.computed = {};
    if (!stateName) stateName = key;
    options.computed[key] = {
      get: () => store.state[stateName as string],
      set: value => store.commit(`set${capitalize(stateName as string)}`, value),
    };
  });

const Getter = (getterName?: string) =>
  createDecorator((options, key) => {
    if (!options.computed) options.computed = {};
    if (!getterName) getterName = key;
    options.computed[key] = () => store.getters[getterName as string];
  });

const Action = (ActionName?: string) =>
  createDecorator((options, key) => {
    if (!options.methods) options.methods = {};
    if (!ActionName) ActionName = key;
    options.methods[key] = (payload: any): void => {
      store.dispatch(ActionName as string, payload);
    };
  });

export { State, Getter, Action };
