# 模版使用方法：

**1.开发环境下解决跨域**
1. 修改`vite.config.dev.ts`中proxy对象即可。
2. 不同环境下同理



**2.自动生成后端接口**
1. 获取后端项目的swagger文档，然后修改openapi.config.ts中的schemaPath,   默认地址为：http://localhost:8101/api/v2/api-docs
2. 使用命令 npm run openapi 自动生成接口。或 使用package.json中的`"openapi": "ts-node openapi.config.ts"`
3. 生成的接口代码默认在services目录，此时使用全局替换 把 `import { request } from 'umi';` 替换成 `import {request} from 'axios';`

**3. 提交代码的规范**
1. 提交代码默认可以使用 `git commit -m 'feat: ''`，注意feat：后面有个空格
2. 除了feat，更多选项可以使用[build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]

**4.图片的规范**
1. 图片统一放在根目录的public文件夹内，引用时省略public即可。如：`public/ohj.png` 引用时直接`/ohj.png`

**5.打包部署**
1. 修改`docker/nginx.conf`文件内的后端接口地址和前端暴露的接口
2. 先把项目的安装包上传到服务器，并且解压
3. 进入项目的文件夹，然后使用命令 `docker build -t 镜像名 .`
4. 启动容器 `docker run -p 服务器端口：项目暴露端口 --name 容器名 镜像名`
