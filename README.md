# vuetest

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 在使用Vue+ElementUI+Vuex+Vue-Router中遇到的问题以及解决  
初学Vue，直接实战，目前为止遇到一些问题总结。  
* 使用vue-cli最新版本时，执行`npm run dev`出现错误，执行`npm run build`无错。研究cmd的错误提示以及源码中build文件夹下的代码，最后在其中的`dev-server.js`中打印了`process.env.NODE_ENV`信息，结果显示`production`。修改`package.json`文件scripts中的配置`"dev": "set NODE_ENV=development&&node build/dev-server.js",` 开发模式正常执行。  
* 使用v-for时，不能在一个组件template的根元素上绑定。  
* 做IE兼容，Vuex在IE下需要ES6的promoise的polyfill。 执行`npm i babel-polyfill -D`，修改webpack.base.conf.js  
```js
entry: {
  app: ['babel-polyfill', './src/main.js']
}
```
* Vue2中props不能设置双向绑定，防止对父组件产生反向影响，所以要是子组件的数据变化影响父组件中的数据，可以使用Vue自带的自定义事件来解决，使用v-on来绑定，使用$emit触发，在v-on绑定自定义事件时，可以将$event作为最后一个参数传入。  
* 当一个列表组件中数据是通过ajax异步请求的时候，会发现即使将方法写在生命周期created方法中时，第一次进入页面时此组件也没有渲染，这时候可以使用v-if控制显示，在ajax请求的时候，定义一个state属性isFetching为false，并让v-if绑定此值。当数据获取到后通过Vuex将其改为true，这样就不会出现页面没有渲染组件的情况。在ajax请求过程中可使用一个提示加载中的UI组件.  
* 当你使用了Vuex时,修改state中的数据时，不能直接通过赋值来修改，而是通过dispatch action来修改状态，并且在Vuex中修改一个数组的数据时，是不能直接赋值修改的。由于 JavaScript 的限制， Vue 不能检测以下变动的数组，所以可以使用splice修改来达到watch的效果。  
[注意事项](https://cn.vuejs.org/v2/guide/list.html#注意事项)  
（未完待续）  


个人认为如果你接触过React那一套和Angular，学习Vue成本很低。因为Vue有很多其他框架的一些特性，响应式组件化思想，Angular的指令，template，React的虚拟DOM，Vuex和Redux也是相同的思想，React需要用JSX写，但Vue则拥抱html。
