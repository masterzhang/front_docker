import durex, { actions } from '@gem-mine/durex'
import { login, logout } from '@/util/account'

durex.model({
  name: 'login',
  state: {
    status: undefined,
    errorMessage: undefined
  },

  effects: {
    async login(payload) {
      try {
        await login(payload)
        actions.router.push('/')
      } catch (error) {
        this.setField({
          status: 'error',
          errorMessage: error.message
        })
      }
    },
    async logout() {
      try {
        await logout()
      } catch (error) {
        console.log('error')
      }
      actions.router.push('/user/login')
      window.location.reload()
    }
  }
})
