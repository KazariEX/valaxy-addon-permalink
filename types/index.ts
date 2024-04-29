declare module 'valaxy' {
  interface PostFrontMatter {
    abbrlink?: string
  }
}

export interface PermalinkOptions {
  format?: string
  prefix?: string | boolean
}
