# REST API

## 下载

```sh
git clone https://github.com/XYShaoKang/bytedance-youthcamp-practice.git
```

## 启动项目

```sh
# 进入项目
cd bytedance-youthcamp-practice/01-day/REST
# 创建 .env 文件,并在 .env 文件夹中配置连接 MongoDB 的连接字符串
touch .env
# 安装依赖
yarn # or `pnpm install` # or `npm install`
yarn dev # or `pnpm dev` or `npm dev`
```

```sh
# @filename: .env
MONGODB_CONNECT=mongodb://root:root@192.168.1.2:27017
```

## API

- user
  - get 获取所有 user
    - http://localhost:3000/users
  - get 获取单个 user
    - http://localhost:3000/users/:id
  - post 创建 user
    - http://localhost:3000/users
    - data: `{name:string,age:number}`
  - put 修改数据
    - http://localhost:3000/users
    - data: `{name:string,age:number}`
  - del 删除数据
    - http://localhost:3000/users/:id
