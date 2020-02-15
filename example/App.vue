<template>
  <div class>

    <el-input-number v-model="renderLayer"></el-input-number>
    <el-input-number v-model="expandLayer"></el-input-number>
    <message-tree :dataList="treeData" :default-expand-layer="expandLayer" :renderLayer="renderLayer">
      <!-- <el-input slot="editor"></el-input> -->
    </message-tree>
  </div>
</template>
<script>
export default {
  name: 'entry',
  data() {
    return {
      msg: 'This is app message',
      dataList: [],
      renderLayer: 2,
      expandLayer: 2
    }
  },
  created() {
    fetch('http://localhost:7001/api/messages')
      .then(response => response.json())
      .then(data => (this.dataList = data))
  },
  
  computed: {
    treeData() {
      const topList = this.dataList.filter(item => !item.parentID)
      return (function recursive(data, originalList) {
        data.forEach(item => {
          item.children = originalList.filter(sub => sub.parentID === item.id)

          recursive(item.children || [], originalList)
        })
        return data
      })(topList, this.dataList)
    }
  }
}
</script>

