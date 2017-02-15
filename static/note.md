# 在使用Vue+ElementUI+Vuex+Vue-Router中遇到的问题以及解决  
初学Vue，直接实战，结果遇到一些问题。  
* 使用vue-cli最新版本时，执行`npm run dev`出现错误，执行`npm run build`无错。研究cmd的错误提示以及源码中build文件夹下的代码，最后在其中的`dev-server.js`中打印了`process.env.NODE_ENV`信息，结果显示`production`。修改`package.json`文件scripts中的配置`"dev": "set NODE_ENV=development&&node build/dev-server.js",` 开发模式正常执行。  
* 使用v-for时，不能在一个组件template的根元素上绑定。  
* 做IE兼容，Vuex在IE下需要ES6的promoise的polyfill。 执行`npm i babel-polyfill -D`，修改webpack.base.conf.js  
```js
entry: {
  app: ['babel-polyfill', './src/main.js']
}
```
* Vue2中props不能设置双向绑定，防止对父组件产生反向影响，所以要是子组件的数据变化影响，可以使用Vue自带的自定义事件来解决，使用v-on来绑定，使用$emit触发，在v-on绑定自定义事件时，可以将$event作为最后一个参数传入。  
* 当一个列表组件中数据是通过ajax异步请求的时候，会发现即使将方法写在生命周期created方法中时，第一次进入页面时此组件也没有渲染，这时候可以使用v-if控制显示，在ajax请求的时候，定义一个state属性isFetching为false，并让v-if绑定此值。当数据获取到后通过Vuex将其改为true，这样就不会出现页面没有渲染组件的情况。在ajax请求过程中可使用一个提示加载中的UI组件。
