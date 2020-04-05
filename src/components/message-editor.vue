  <template>
  <!-- <transition-collapse> -->
    <div class="message-editor" v-show="visible">
      <el-form>
        <el-form-item>
          <el-input
            id="contentInput"
            ref="contentInput"
            @focus="$emit('editor-focus',$event)"
            placeholder="content"
            v-model="form.content"
            type="textarea"
          ></el-input>
        </el-form-item>

        <div class="inline-items-wrapper">
          <el-form-item class="email-item">
            <el-input
              placeholder="email"
              v-model="form.email"
              @focus="$emit('editor-focus',$event)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              @focus="$emit('editor-focus',$event)"
              placeholder="nickname"
              v-model="form.nickname"
            >
              <el-button @click="validate" slot="append">{{editorLabelTitle}}</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  <!-- </transition-collapse> -->
</template>
<script>
export default {
  name: 'message-editor',
  data() {
    return {
      form: {
        content: '',
        nickname: '',
        email: ''
      }
    }
  },
  props: {
    type: {
      validator(value) {
        return ['comment', 'reply'].includes(value)
      },
      default: 'comment'
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // $contentInput() {
    //   return this.$refs.contentInput
    // },
    editorLabelTitle() {
      return this.type === 'comment'
        ? '评论'
        : this.type === 'reply'
        ? '回复'
        : '无'
    }
  },
  
  methods: {
    show() {
      // this.visible = true
      this.$emit('update:visible', true)
    },
    hide() {
      this.$emit('update:visible', false)
    },
    remove() {
      this.$el.remove()
    },
    activate() {
      // await this.$nextTick()
      if (this.$refs.contentInput) {
        this.$refs.contentInput.focus()
      } else if (this.$el.querySelector('#contentInput')) {
        this.$el.querySelector('#contentInput').focus()
      }
    },
    validate() {
      const { content, nickname, email } = this.form


       
      if (!content) {
        return this.$message.warning('请输入内容')
      }
      if (!email) {
        return ths.$message.warning('请输入邮箱')
      }
      if (!nickname) {
        return this.$message.warning('请输入昵称')
      }
      const payload = { content, nickname, email }

      if (this.type === 'reply') {
        payload.parentID = this.$refs.ownerMessage.data.id
      }

      this.$emit('commit-form', payload)
    }
  }
}
</script>
<style lang="less" scoped>
.inline-items-wrapper {
  display: flex;
  > div {
    width: 50%;
  }
  .email-item {
    margin-right: 10px;
  }
}
</style>
