/*
 * @Descripttion: 
 * @Author: suanmei
 * @Date: 2023-06-30 14:40:44
 * @LastEditors: suanmei
 * @LastEditTime: 2023-06-30 14:45:57
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default ({
    Vue,// VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer // 当前应用配置是处于 服务端渲染 或 客户端
  }) => {
    Vue.use(ElementUI)
  }