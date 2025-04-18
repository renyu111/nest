# Windows 批处理脚本使用指南

## 目录
- [基本语法](#基本语法)
- [变量使用](#变量使用)
- [条件判断](#条件判断)
- [循环结构](#循环结构)
- [函数定义](#函数定义)
- [常用命令](#常用命令)
- [实际应用示例](#实际应用示例)
- [最佳实践](#最佳实践)

## 基本语法

### 基础命令
```batch
@echo off                    # 关闭命令回显
echo Hello World            # 输出文本
pause                      # 暂停执行
```

### 注释
```batch
:: 这是单行注释
REM 这也是单行注释
```

## 变量使用

### 变量定义和使用
```batch
@echo off
set NAME=John              # 设置变量
echo %NAME%               # 使用变量
set /p INPUT=请输入：      # 接收用户输入
```

### 环境变量
```batch
echo %PATH%               # 显示系统路径
echo %USERPROFILE%        # 显示用户目录
```

## 条件判断

### 文件判断
```batch
if exist file.txt (
    echo 文件存在
) else (
    echo 文件不存在
)
```

### 错误判断
```batch
if %ERRORLEVEL% equ 0 (
    echo 命令执行成功
) else (
    echo 命令执行失败
)
```

### 字符串比较
```batch
if "%var%"=="value" (
    echo 匹配
) else (
    echo 不匹配
)
```

## 循环结构

### For 循环
```batch
:: 数字循环
for /l %%i in (1,1,5) do (
    echo %%i
)

:: 文件循环
for %%f in (*.txt) do (
    echo %%f
)
```

### While 循环（使用 goto）
```batch
:loop
echo 循环中
goto loop
```

## 函数定义

### 基本函数
```batch
@echo off
call :myFunction
goto :eof

:myFunction
echo 这是函数内容
goto :eof
```

### 带参数的函数
```batch
@echo off
call :myFunction "参数1" "参数2"
goto :eof

:myFunction
echo 参数1: %~1
echo 参数2: %~2
goto :eof
```

## 常用命令

### 目录操作
```batch
cd /d D:\project        # 切换目录
dir                     # 显示目录内容
mkdir folder           # 创建文件夹
rd /s /q folder       # 删除文件夹
```

### 文件操作
```batch
copy file1.txt file2.txt    # 复制文件
del file.txt               # 删除文件
type file.txt             # 显示文件内容
```

### 系统操作
```batch
tasklist                  # 显示进程
taskkill /F /IM notepad.exe  # 结束进程
systeminfo               # 系统信息
```

### 网络操作
```batch
ipconfig                # 显示网络配置
ping google.com        # 测试网络连接
```

## 实际应用示例

### 菜单系统
```batch
@echo off
:menu
cls
echo ============================
echo        主菜单
echo ============================
echo 1. 启动服务
echo 2. 停止服务
echo 3. 查看状态
echo 4. 退出
echo ============================
set /p choice=请选择操作（1-4）:

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto status
if "%choice%"=="4" goto end
```

### 部署脚本
```batch
@echo off
:: 设置变量
set PROJECT_PATH=D:\myproject
set BACKUP_PATH=D:\backup
set DATE=%date:~0,4%%date:~5,2%%date:~8,2%

:: 创建备份
echo 正在创建备份...
if not exist %BACKUP_PATH% mkdir %BACKUP_PATH%
xcopy /s /e /y %PROJECT_PATH% %BACKUP_PATH%\backup_%DATE%
```

## 最佳实践

1. **脚本结构**
   - 使用 `@echo off` 开始脚本
   - 添加清晰的注释
   - 使用有意义的变量名
   - 做好错误处理

2. **变量命名**
   - 使用大写字母
   - 使用下划线分隔
   - 名称要有意义

3. **错误处理**
   - 检查命令执行结果
   - 添加适当的错误提示
   - 记录错误日志

4. **日志记录**
   - 记录重要操作
   - 包含时间戳
   - 保存到日志文件

5. **代码组织**
   - 相关命令放在一起
   - 使用函数封装重复代码
   - 保持代码整洁

6. **调试技巧**
   - 使用 `echo` 输出变量值
   - 在关键点添加 `pause`
   - 使用 `echo on` 查看命令执行

## 注意事项

1. 路径中使用反斜杠 `\`
2. 变量使用 `%变量名%`
3. 字符串比较使用双引号
4. 注意命令的大小写
5. 避免使用特殊字符
6. 注意空格的使用
7. 使用 `goto :eof` 结束函数
8. 注意文件编码（建议使用 ANSI）

## 常见问题解决

1. **中文乱码**
   - 使用 ANSI 编码保存文件
   - 设置正确的代码页：`chcp 936`

2. **路径问题**
   - 使用完整路径
   - 使用 `cd /d` 切换驱动器

3. **变量不更新**
   - 使用 `setlocal enabledelayedexpansion`
   - 使用 `!变量名!` 代替 `%变量名%`

4. **权限问题**
   - 以管理员身份运行
   - 检查文件权限

## 参考资源

- [Microsoft 批处理文件文档](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)
- [批处理之家](http://www.bathome.net/)
- [Windows 批处理脚本教程](https://www.w3cschool.cn/w3cnote/batch-file-tutorial.html) 