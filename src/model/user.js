import durex, { actions } from '@gem-mine/durex'
import { getAccountInfo, getAvatarURL } from '@/util/account'

durex.model({
  name: 'user',
  state: {
    list: [],
    currentUser: {},
    avatar: ''
  },

  effects: {
    async fetchCurrent() {
      try {
        const accountInfo = await getAccountInfo()
        const avatar = await getAvatarURL()
        actions.user.saveCurrentUser({
          currentUser: {
            name: accountInfo.name
          },
          avatar
        })
      } catch (error) {
        console.log('fetchCurrent error', error)
      }
    }
  },

  reducers: {
    saveCurrentUser(data) {
      return this.setField({
        currentUser: (data && data.currentUser) || {},
        avatar: (data && data.avatar) || ''
      })
    },
    setDefaultAvatar() {
      return this.setField({
        avatar: 'http://uc-component.sdp.101.com/images/avatar.png'
      })
    }
  }
})
