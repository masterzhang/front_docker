import React from 'react'
import loadable from 'react-loadable'
import Error from '../component/status/Error'
import Loading from '../component/status/Loading'

export function importAll(modules) {
  if (modules) {
    modules.keys().forEach((key) => {
      modules(key)
    })
  }
}

export function asyncLoader(modulePath) {
  const LoadableComponent = loadable({
    loader: () => import(
      /* webpackInclude: (function() {
        const includePath = ['page', 'component']
        const includeExt = ['(j|t)sx?']
        return new RegExp(`(${includePath.join('|')}).*\\\.(${includeExt.join('|')})$`)
      })() */
      `../${modulePath}`
    ),
    loading: ({ isLoading, error }) => {
      if (isLoading) {
        return <Loading />
      } else if (error) {
        return <Error />
      } else {
        return null
      }
    }
  })
  return function LoadableDashboard() {
    return <LoadableComponent />
  }
}
