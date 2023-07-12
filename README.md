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