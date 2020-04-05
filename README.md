# message-tree

General use comments list component based on Vue

## Live Demo

[点击查看](https://konglingwen94.github.io/message-tree/examples/index.html)

## ScreenShots

![message-tree](/screenshots/1.gif)![message-tree](/screenshots/2.gif)



## Install

```
npm install message-tree --save-dev
```

## Usage

### Global Registration component

```javascript
import Vue from 'vue'
import MessageTree from 'message-tree'

Vue.use(MessageTree)
```

### Writing in single file

```HTML
<template>
  <div class="message-container">
    <message-tree></message-tree>
  </div>

</template>

<script>
export default {
  data(){
    return {
      dataList:[
  {
    "thumbupCount": 4,
    "email": "email@sina.com",
    "nickname": "nickname",
    "content": "message",
    "createdAt": "2020-02-29T03:57:51.466Z",
    "updatedAt": "2020-02-29T10:37:39.238Z",
    "id": "5e59e13f961db51ad45c9ebb",
    "children": []
  },
  {
    "thumbupCount": 0,
    "email": "email@sina.com.cn",
    "nickname": "昵称二",
    "content": "这是第二个留言",
    "createdAt": "2020-03-23T06:23:15.952Z",
    "updatedAt": "2020-03-23T06:23:15.952Z",
    "id": "5e7855d3ffbc160b9c2d3098",
    "children": [
      {
        "thumbupCount": 0,
        "email": "email@sina.com",
        "nickname": "昵称",
        "content": "这是一条回复",
        "parentID": "5e7855d3ffbc160b9c2d3098",
        "createdAt": "2020-03-23T06:23:37.972Z",
        "updatedAt": "2020-03-23T06:23:37.972Z",
        "id": "5e7855e9ffbc160b9c2d3099",
        "children": [
          {
            "thumbupCount": 0,
            "email": "email@sina.com",
            "nickname": "昵称1",
            "content": "这是一条@昵称的回复",
            "parentID": "5e7855e9ffbc160b9c2d3099",
            "createdAt": "2020-03-23T06:24:00.857Z",
            "updatedAt": "2020-03-23T06:24:00.857Z",
            "id": "5e785600ffbc160b9c2d309a",
            "children": []
          },
          {
            "thumbupCount": 0,
            "email": "email@sina.com",
            "nickname": "昵称1",
            "content": "这是一条@昵称的回复",
            "parentID": "5e7855e9ffbc160b9c2d3099",
            "createdAt": "2020-03-23T06:24:08.304Z",
            "updatedAt": "2020-03-23T06:24:08.304Z",
            "id": "5e785608ffbc160b9c2d309b",
            "children": []
          }
        ]
      }
    ]
  }
]

    }
  }
}
</script>



```

## Component Props

|       Field        |        Type        |     Description      | Default |
| :----------------: | :----------------: | :------------------: | :-----: |
|      dataList      | Array<CommentData> |   用户评论列表数组   |   []    |
|    renderLayer     |      Nunmber       | 渲染消息树的结构层级 |    2    |
| defaultExpandLayer |       Number       | 消息树默认展开的层级 |    2    |

### CommentData

|    Field     |        Type        |                                     Description                                      |
| :----------: | :----------------: | :----------------------------------------------------------------------------------: |
|   nickname   |       String       |                                       用户昵称                                       |
|   content    |       String       |                                       留言内容                                       |
| thumbupCount |       Number       |                                       点赞个数                                       |
|   parentID   |       String       | 所回复的评论 ID（当更改 renderLayer 字段的值时，组件内部根据此字段自动处理数据结构） |
|   children   | Array<CommentData> |                                   评论消息的子评论                                   |

## Component Events

|     Name      |              Description               | Parameters  |
| :-----------: | :------------------------------------: | :---------: |
| tree-expanded | 单个评论切换其回复列表的展开状态时触发 | CommentData |
|  on-thumbup   |             用户点赞时触发             | commentData |
|   on-reply    |           点击回复按钮时触发           | commentData |

## Component Methods

|     Name     |  Description   | Parameters |
| :----------: | :------------: | :--------: |
| removeEditor | 移除评论编辑器 |     --     |
|  hideEditor  | 隐藏评论编辑器 |     --     |
|  showEditor  | 显示评论编辑器 |     --     |

## Component slots

|  Name   |    Description     |                                  Default                                  |
| :-----: | :----------------: | :-----------------------------------------------------------------------: |
| default | 默认评论编辑器插槽 | [组件默认编辑器](https://github.com/konglingwen94/comment-message-editor) |
