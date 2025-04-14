# NestJS 文件上传项目

## 项目启动顺序

1. 启动 NestJS 项目
```bash
npm run start:dev
```
等待看到 "Nest application successfully started" 消息，表示项目启动成功。

2. 启动内网穿透（可选）
```bash
2viADfCnUby67DLMQQvixohvNw1_Pt7vFRiQfQDxiSNFop6L
ngrok http 3001
```
等待 ngrok 生成公网 URL。

### 查看 ngrok 公网 URL
1. 在 ngrok 启动后的终端窗口中，查看 `Forwarding` 行：
```
Forwarding    https://xxxx-xx-xx-xx-xx.ngrok.io -> http://localhost:3001
```
2. 或者访问 ngrok 的 Web 界面：`http://127.0.0.1:4040`

## 接口说明

### 用户相关接口
- 注册：`POST /users/register`
- 登录：`POST /users/login`

### 文件上传相关接口
- 上传文件：`POST /upload`
- 获取文件列表：`GET /upload`
- 删除文件：`DELETE /upload/:fileName`

## 注意事项
1. 除了注册和登录接口，其他所有接口都需要 JWT 认证
2. 请求头需要包含：`Authorization: Bearer your_token_here`
3. 文件上传后会自动按类型分类存储
4. 文件名使用 UUID 生成，确保唯一性
5. 内网穿透每次启动会生成不同的 URL
