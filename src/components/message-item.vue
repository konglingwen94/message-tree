<template>
  <dl>
    <dt>
      <div class="avatar-wrapper">
        <el-avatar :src="data.avatar"></el-avatar>
      </div>
      <div class="message-wrapper">
        <div class>
          <span class="nickname">{{data.nickname}}</span>&nbsp;&nbsp;&nbsp;
          <time>{{new Date(data.createdAt) | dateFormat}}</time>
        </div>

        <p class="content">
          {{data.content}}
          <span
            v-if="data.replyToUser"
          >//@{{data.replyToUser.nickname}}:{{data.replyToUser.content}}</span>
        </p>
        <div class="footer-action">
          <div class="message-statis">
            <el-button type="text" @click="replyHandler">回复</el-button>
            <el-button
              v-if="data.children && data.children.length"
              type="text"
              @click="toggleExpandPanel"
            >
              {{isExpanded?`收起回复`:`${replyCount}条回复`}}
              <i
                :class="!isExpanded?'el-icon-arrow-down':'el-icon-arrow-up'"
              ></i>
            </el-button>
          </div>
          <div class="append-right">
            <span class="thumb-button">
              {{data.thumbupCount}}
              <i class="el-icon-thumb" @click="thumbClicked(data)"></i>
            </span>
          </div>
        </div>
        <div class="editor-container" ref="editorContainer"></div>
      </div>
    </dt>
    <!-- <el-divider v-if="level===1"></el-divider> -->
    <el-collapse-transition>
      <dd class="reply-container" v-show="isExpanded" v-if="replyCount" ref="messageTreeContainer">
        <message-group :dataList="data.children"></message-group>
        <!-- <div class="loading-more" @click="loadMore" v-if="replyCount>=1">查看更多</div> -->
      </dd>
    </el-collapse-transition>
  </dl>
</template>
<script>
// import _ from 'lodash'
import { dateFormat } from '../util'

export default {
  name: 'MessageItem',

  inject: {
    level: {
      default: 1
    },
    $editor: '$editor',
    $messageTree: '$messageTree'
  },

  provide() {
    return {
      level: this.level + 1
    }
  },
  data() {
    return {
      isExpanded: this.$messageTree.expandLayer > this.level,
      hasEditor: false
    }
  },
  mounted() {
    const self = this
    this.$refs.editorContainer.addEventListener('DOMNodeInserted', function(e) {
      if (e.target === self.$editor && e.relatedNode === this) {
        self.hasEditor = true
      }
    })
    this.$refs.editorContainer.addEventListener('DOMNodeRemoved', function(e) {
      if (e.target === self.$editor && e.relatedNode === this) {
        self.hasEditor = false
      }
    })
  },
  filters: {
    dateFormat
  },
  watch: {
    '$messageTree.expandLayer': function(value) {
      this.isExpanded = value > this.level
    },
    isExpanded(value) {
      this.$messageTree.$emit('tree-expanded', this.data, value)

      if (!value) {
        if (!this.$refs.messageTreeContainer.contains(this.$editor)) {
          return
        }
        this.$editor.remove()
      }
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    replyCount() {
      return this.data.children && this.data.children.length
    }
  },

  methods: {
    loadMore() {
      const payload = { ...this.data }
      delete payload.children
      this.$emit('load-more', payload)
    },
    thumbClicked(item) {
      this.$messageTree.$emit('on-thumbup', item)
    },
    replyHandler() {
      if (!this.$refs.editorContainer.contains(this.$editor)) {
        this.$messageTree.showEditor()
        this.$refs.editorContainer.appendChild(this.$editor)
      }

      if (this.$messageTree.editorType === 'default') {
        this.$nextTick(() => {
          // this.$messageTree.$refs.textarea.focus()
        })
      } else {
        const payload = {
          ...this.data
        }

        delete payload.children
      this.$messageTree.$emit('on-reply', payload)
      }
    },
    toggleExpandPanel() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>
<style lang="less" scoped>
@duration: 300ms;

dt {
  display: flex;
  .avatar-wrapper {
    margin-right: 8px;
  }
  .message-wrapper {
    width: 100%;
    font-size: 14px;

    time {
      color: #909399;
      vertical-align: middle;
    }
    .footer-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .append-right {
        .thumb-button {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
dd.reply-container {
  background: #fafbfc;
  padding: 20px;
  margin-top: 20px;
}
.loading-more {
  user-select: none;
  text-align: center;
  font-size: 14px;
  color: #444;
  cursor: pointer;
}

.message-reply-enter,
.message-reply-leave-to {
  transform: translateX(-100%);
}
.message-reply-active {
  transition: all @duration;
}
.message-reply-move {
  transition: all @duration;
}
.message-reply-item {
  transition: all @duration;
}
</style>

　