import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import articleOptions from './modules/article'
import userOptions from './modules/user'
import { IState } from '../types/common'

export const key: InjectionKey<Store<IState>> = Symbol()
//创建并暴露store
export const store = createStore<IState>({
  modules:{
    articleAbout: articleOptions,
    userAbout: userOptions
  }
})
export function useStore () {
  return baseUseStore(key)
}
