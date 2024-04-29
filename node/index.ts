import { defineValaxyAddon } from 'valaxy'
import type { PermalinkOptions } from '../types'
import pkg from '../package.json'

export const addonPermalink = defineValaxyAddon<PermalinkOptions>(options => ({
  name: pkg.name,
  enable: true,
  options,
  setup(node) {
    const defaultPrefix = '/posts'
    const {
      format = '/:abbrlink',
      prefix = defaultPrefix,
    } = options ?? {}

    node.hook('vue-router:extendRoute', (route) => {
      if (!route.fullPath.startsWith(`${defaultPrefix}/`))
        return

      const name = route.fullPath.slice(defaultPrefix.length + 1)

      const {
        title,
        abbrlink = name,
        date,
      } = route.meta.frontmatter

      if (abbrlink?.startsWith('/')) {
        route.path = abbrlink
        return
      }

      const dateObj = date ? new Date(date) : null
      const year = dateObj?.getFullYear()
      const month = dateObj?.getMonth()
      const day = dateObj?.getDay()

      const formattedLink = processTemplate(format, {
        name,
        title,
        abbrlink,
        year,
        month,
        day,
      })

      if (typeof prefix === 'string')
        route.path = `${prefix}${formattedLink}`
      else
        route.path = `${prefix ? defaultPrefix : ''}${formattedLink}`
    })
  },
}))

function processTemplate(format: string, data: Record<string, any>) {
  const re = /:(\w+)/g

  return format.replaceAll(re, (substring, ...args) => {
    if (substring && args[0] in data)
      return data[args[0]]
    else
      return substring
  })
}
