# valaxy-addon-permalink

为你的文章自定义永久链接。

## 安装

```bash
pnpm i valaxy-addon-permalink
```

## 快速开始

```ts
import { defineValaxyConfig } from 'valaxy'
import { addonPermalink } from 'valaxy-addon-permalink'

export default defineValaxyConfig({
  addons: [
    addonPermalink({
      /* options */
    }),
  ],
})
```

## 配置

### ``format``

type: ``string``

default: ``/:abbrlink``

形如 ``/:year/:month/:day/:title`` 的字符串，需要以 ``/`` 开头。

可选参数：

- ``name``：文件名

- ``title``：文章标题

- ``abbrlink``：链接别名，可在 ``frontmatter`` 中配置，置空时取 ``name`` 值

- ``year``, ``month``, ``day``：文章发布日期

当 ``abbrlink`` 以 ``/`` 开头时，它将忽略 ``format`` 参数，直接应用到最终链接（仍以 ``prefix`` 开头）。

### ``prefix``

type: ``string | boolean``

default: ``/posts``

可配置文章链接的统一前缀，填 ``false`` 时等同于空字符串，即无前缀。
