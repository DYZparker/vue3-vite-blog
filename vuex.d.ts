import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    userAbout: {
      dialogVisible: boolean;
      tableMenu: {
          title: string;
          propName: string;
          isEdit: boolean;
          width: number;
      }[];
      tableData: {
          username: string;
          password: string;
          admin: boolean;
          date: string;
      }[];
    }
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}