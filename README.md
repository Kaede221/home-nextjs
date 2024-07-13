## 安装

你可以按照下面的顺序完成运行

```sh
# 复制文件
cp .env.example .env.local

# 安装依赖
yarn

# 运行服务
yarn dev
```

随后, 就可以打开`http://localhost:3000`查看页面了

## Target

- [x] 完成项目的汉化

# Q&A

## 博客和项目的头部图片如何添加?

为了方便, 我在`public`文件夹, 创建了一个`blog`文件夹, 直接把图片放在这里就好了 -> 所以不支持同名图片哦, 反正同名图片你应该也不好管理就对了

项目的话自然就是`project`文件夹, 这里不多赘述了

## 博客, 项目头部标准

在一个新建的`mdx`文件中, 你可以直接添加下面的内容

```md
---
title: '这里写博客标题'
publishedAt: '2024-07-13'
description: '这里写描述'
banner: '头图, 比如test.jpeg'
tags: 'tags 比如retro, 用英文逗号分开'
---
```

