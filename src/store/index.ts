import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import userOptions from './modules/user'
import { IUserAbout } from '../types/user'

export interface State {
  userAbout: IUserAbout
}
export const key: InjectionKey<Store<State>> = Symbol()
//创建并暴露store
export const store = createStore<State>({
  modules:{
    userAbout:userOptions,
  }
})
export function useStore () {
  return baseUseStore(key)
}
