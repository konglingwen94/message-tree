<template>
  <div class="message-tree">
    <div class="editor-wrapper" ref="editorEl" v-show="editorVisible">
      <slot name="editor">
        <comment-editor></comment-editor>
      </slot>
    </div>
    <message-group :dataList="renderData"></message-group>
  </div>
</template>
<script>
import MessageEditor from './components/message-editor'
import MessageGroup from './components/message-group'
import { normalizeData as normalize } from './util'

export default {
  name: 'message-tree',
  components: {
    MessageGroup,
    MessageEditor
  },
  data() {
    return {
      editorVisible: false,
      Texttype: 'text'
    }
  },

  

  provide() {
    const provided = { $messageTree: this }

    Object.defineProperty(provided, '$editor', {
      get: () => this.$refs.editorEl
    })
    return provided
  },
  props: {
    dataList: {
      type: Array,

      default: () => []
    },
    renderLayer: {
      validator(value) {
        return Number.isInteger(value) && value > 0
      },
      default: 2
    },
    defaultExpandLayer: {
      validator(value) {
        return Number.isInteger(value) && value > 0
      },
      default: 2
    }
  },
  computed: {
    editorType() {
      return this.$slots.editor ? 'custom' : 'default'
    },
    expandLayer() {
      return this.defaultExpandLayer > this.renderLayer
        ? this.renderLayer
        : this.defaultExpandLayer
    },
    renderData() {
      try {
        var dataCloned = JSON.parse(JSON.stringify(this.dataList))
      } catch (error) {
        return []
      }

      return normalize(dataCloned, this.renderLayer, 1)
    }
  },
  methods: {
    removeEditor() {
      this.$refs.editorEl.remove()
    },
    hideEditor() {
      this.editorVisible = false
    },
    showEditor() {
      this.editorVisible = true
    }
  }
}
</script>
