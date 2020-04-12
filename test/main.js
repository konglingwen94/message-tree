import Vue from 'vue'
import MessageTree from '../lib/message-tree.umd.min.js'
import dataList from './data.json'

Vue.use(MessageTree)
console.log(dataList)

new Vue({
  el: '#app',
  created() {
    // fetch('http://localhost:7001/api/messages')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.dataList = data
    //   })
  },
  data: {
    dataList,
  },
  // computed: {
  //   renderData() {
  //     function format(list, originalList) {
  //       list.forEach(item => {
  //         item.children = originalList.filter(sub => sub.parentID === item.id)
  //         format(item.children, originalList)
  //       })
  //       return list
  //     }
  //     return format(this.dataList.filter(item => !item.parentID), this.dataList)
  //   }
  // },
  render(h) {
    return h('message-tree', {
      props: {
        dataList: this.dataList,
      },
    })
  },
})
