import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { workspaceActions } from '@/store/modules/workspace'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [/login/, /thank-you/, /register/, /403/, /404/, /activate/] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  const hasToken = getToken()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (whiteList.some(rx => rx.test(to.path))) {
    // If a token exists redirect to home page instead
    if (hasToken) {
      next({ path: '/' })
    } else {
      // Thank you page can only be access if the previous page
      //  was the registration page
      if (to.name === 'ThankYou' && from.name !== 'Register') {
        next({ path: '403' })
      } else {
        next()
      }
    }
  } else {
    // determine whether the user has logged in
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done()
      } else {
        const nameLoaded = !!store.getters.name
        const workspacesLoaded = store.getters.workspacesLoaded

        if (nameLoaded && workspacesLoaded) {
          next()
        } else {
          try {
            if (!nameLoaded) {
              await store.dispatch('user/getInfo')
            }

            if (!workspacesLoaded) {
              await store.dispatch(`workspace/${workspaceActions.GET_WORKSPACES}`)
            }

            next({ ...to, replace: true })
          } catch (e) {
            await store.dispatch('user/resetToken')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* has no token*/
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
