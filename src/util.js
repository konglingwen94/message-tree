export function normalizeData(dataList, renderLayer, level) {
  // console.log('dataList', dataList)

  dataList.forEach(item => {
    if (renderLayer === 1) {
      item.children = []
      return
    }

    if (level + 1 === renderLayer) {
      const subs = []

      ;(item.children || []).forEach(function addSub(item) {
        subs.push({ ...item, children: [] })
        ;(item.children || []).forEach(addSub)
      })

      subs.forEach((sub, index, array) => {
        const replyToUser = array.find(item => item.id === sub.parentID)

        if (replyToUser) {
          sub.replyToUser = replyToUser
          delete sub.replyToUser.replyToUser
        }
      })
      item.children = subs
      return
    }

    normalizeData(item.children || [], renderLayer, level + 1)
  })

  return dataList
}

export function dateFormat(createdDate) {
  if (!createdDate instanceof Date) {
    return
  }

  const isPositiveInteger = Date.now() - createdDate > 0 ? '前' : '后'

  const pastSeconds = Math.floor(Math.abs(Date.now() - createdDate) / 1000)

  switch (true) {
    case pastSeconds >= 3600 * 24 * 30:
      return createdDate.toLocaleString()

    case pastSeconds >= 3600 * 24:
      return Math.floor(pastSeconds / 3600 / 24) + '天以' + isPositiveInteger
    case pastSeconds >= 3600:
      return Math.floor(pastSeconds / 3600) + '小时以' + isPositiveInteger
    case pastSeconds >= 60:
      return Math.floor(pastSeconds / 60) + '分钟以' + isPositiveInteger

    case pastSeconds >= 0:
      return '刚刚'
  }
}
