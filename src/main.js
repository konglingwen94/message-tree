// import Vue from 'vue'
import { Avatar, Button, Divider, Input, Form, FormItem } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import MessageGroup from './components/message-group'
import MessageItem from './components/message-item'
import MessageTree from './main.vue'
// import 'element-ui/lib/theme-chalk/index.css'
import CommentEditor from 'comment-message-editor'

 

MessageTree.install = function(Vue) {
  Vue.component(CollapseTransition.name, CollapseTransition)
  Vue.component(CommentEditor.name, CommentEditor)
  Vue.use(Avatar)
  // Vue.use(InputNumber)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Divider)

  Vue.component(MessageGroup.name, MessageGroup)
  Vue.component(MessageItem.name, MessageItem)

  Vue.component(MessageTree.name, MessageTree)
}

export default MessageTree
