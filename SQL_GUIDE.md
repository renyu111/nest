# SQL 完全指南

SQL (Structured Query Language) 是一种用于管理和操作关系型数据库的标准语言。本指南将全面介绍 SQL 的语法和用法，从基础到高级，帮助您掌握数据库操作技能。

## 目录

1. [SQL 基础](#sql-基础)
2. [数据定义语言 (DDL)](#数据定义语言-ddl)
3. [数据操作语言 (DML)](#数据操作语言-dml)
4. [数据查询语言 (DQL)](#数据查询语言-dql)
5. [数据控制语言 (DCL)](#数据控制语言-dcl)
6. [高级查询](#高级查询)
7. [函数和聚合](#函数和聚合)
8. [子查询](#子查询)
9. [事务和并发](#事务和并发)
10. [索引和性能优化](#索引和性能优化)
11. [数据库设计](#数据库设计)
12. [常见数据库系统](#常见数据库系统)

## SQL 基础

### SQL 语句分类

SQL 语句可以分为以下几类：

- **数据定义语言 (DDL)**：用于定义数据库结构，如 CREATE、ALTER、DROP
- **数据操作语言 (DML)**：用于操作数据，如 INSERT、UPDATE、DELETE
- **数据查询语言 (DQL)**：用于查询数据，主要是 SELECT
- **数据控制语言 (DCL)**：用于控制访问权限，如 GRANT、REVOKE

### 基本语法规则

- SQL 语句以分号 (;) 结束
- SQL 关键字通常大写，但大小写不敏感
- 字符串值通常用单引号 ('') 括起来
- 表名和列名可以使用反引号 (`) 括起来，特别是在名称包含空格或特殊字符时

## 数据定义语言 (DDL)

### 创建数据库

```sql
CREATE DATABASE database_name;
```

**应用场景**：创建一个名为 "company_db" 的数据库，用于存储公司相关的所有数据。

```sql
CREATE DATABASE company_db;
```

### 使用数据库

```sql
USE database_name;
```

**应用场景**：切换到 "company_db" 数据库，准备进行后续操作。

```sql
USE company_db;
```

### 创建表

```sql
CREATE TABLE table_name (
    column1 data_type [constraints],
    column2 data_type [constraints],
    ...
);
```

**应用场景**：创建一个员工表，包含员工的基本信息。

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2) DEFAULT 0.00,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

#### 常用数据类型

- **数值类型**：
  - `INT` 或 `INTEGER`：整数
  - `DECIMAL(p,s)` 或 `NUMERIC(p,s)`：精确小数，p 为总位数，s 为小数位数
  - `FLOAT`：浮点数
  - `DOUBLE`：双精度浮点数

- **字符串类型**：
  - `CHAR(n)`：固定长度字符串，n 为字符数
  - `VARCHAR(n)`：可变长度字符串，最大长度为 n
  - `TEXT`：长文本
  - `BLOB`：二进制大对象

- **日期时间类型**：
  - `DATE`：日期 (YYYY-MM-DD)
  - `TIME`：时间 (HH:MM:SS)
  - `DATETIME`：日期和时间 (YYYY-MM-DD HH:MM:SS)
  - `TIMESTAMP`：时间戳

- **其他类型**：
  - `BOOLEAN` 或 `BOOL`：布尔值
  - `ENUM`：枚举类型
  - `JSON`：JSON 数据 (MySQL 5.7+)

#### 常用约束

- `PRIMARY KEY`：主键
- `FOREIGN KEY`：外键
- `NOT NULL`：非空
- `UNIQUE`：唯一
- `DEFAULT`：默认值
- `CHECK`：检查约束
- `AUTO_INCREMENT`：自动递增 (MySQL)

#### 示例

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2) DEFAULT 0.00,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

**应用场景**：创建一个员工表，包含员工ID、姓名、邮箱、入职日期、薪资和部门ID。ID自动递增，姓名不能为空，邮箱必须唯一，薪资默认为0，部门ID是外键，关联到departments表。

### 修改表结构

#### 添加列

```sql
ALTER TABLE table_name
ADD column_name data_type [constraints];
```

**应用场景**：在员工表中添加一个电话号码列。

```sql
ALTER TABLE employees
ADD phone VARCHAR(20);
```

#### 修改列

```sql
ALTER TABLE table_name
MODIFY column_name data_type [constraints];
```

**应用场景**：修改员工表中薪资列的数据类型，增加小数位数。

```sql
ALTER TABLE employees
MODIFY salary DECIMAL(12,4);
```

#### 删除列

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

**应用场景**：从员工表中删除不再使用的电话号码列。

```sql
ALTER TABLE employees
DROP COLUMN phone;
```

#### 重命名表

```sql
RENAME TABLE old_table_name TO new_table_name;
```

**应用场景**：将员工表重命名为staff表。

```sql
RENAME TABLE employees TO staff;
```

### 删除表

```sql
DROP TABLE table_name;
```

**应用场景**：删除不再需要的临时表。

```sql
DROP TABLE temp_employees;
```

### 创建索引

```sql
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在员工表的姓氏列上创建索引，加速按姓氏查询。

```sql
CREATE INDEX idx_last_name ON employees (last_name);
```

#### 唯一索引

```sql
CREATE UNIQUE INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在员工表的邮箱列上创建唯一索引，确保邮箱不重复。

```sql
CREATE UNIQUE INDEX idx_email ON employees (email);
```

### 删除索引

```sql
DROP INDEX index_name ON table_name;
```

**应用场景**：删除员工表上的姓氏索引。

```sql
DROP INDEX idx_last_name ON employees;
```

## 数据操作语言 (DML)

### 插入数据

#### 基本插入

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

**应用场景**：向员工表中插入一条新员工记录。

```sql
INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id)
VALUES ('John', 'Doe', 'john.doe@example.com', '2023-01-15', 75000.00, 10);
```

#### 插入多行

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES 
    (value1, value2, ...),
    (value3, value4, ...),
    ...;
```

**应用场景**：向员工表中批量插入多条员工记录。

```sql
INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id)
VALUES 
    ('Jane', 'Smith', 'jane.smith@example.com', '2023-02-01', 82000.00, 10),
    ('Bob', 'Johnson', 'bob.johnson@example.com', '2023-03-10', 65000.00, 20),
    ('Alice', 'Williams', 'alice.williams@example.com', '2023-04-05', 78000.00, 10);
```

#### 从其他表插入

```sql
INSERT INTO table1 (column1, column2, ...)
SELECT column1, column2, ... FROM table2;
```

**应用场景**：将临时员工表中的数据插入到正式员工表中。

```sql
INSERT INTO employees (first_name, last_name, email, hire_date, salary, department_id)
SELECT first_name, last_name, email, hire_date, salary, department_id 
FROM temp_employees;
```

### 更新数据

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

**应用场景**：将部门ID为10的所有员工薪资增加10%。

```sql
UPDATE employees
SET salary = salary * 1.1
WHERE department_id = 10;
```

### 删除数据

```sql
DELETE FROM table_name
WHERE condition;
```

**应用场景**：删除所有已离职的员工记录。

```sql
DELETE FROM employees
WHERE status = 'Inactive';
```

#### 清空表

```sql
TRUNCATE TABLE table_name;
```

**应用场景**：清空临时员工表，但保留表结构。

```sql
TRUNCATE TABLE temp_employees;
```

## 数据查询语言 (DQL)

### 基本查询

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition
GROUP BY column1, column2, ...
HAVING condition
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...
LIMIT offset, count;
```

**应用场景**：查询部门ID为10的所有员工，按薪资降序排序，只返回前5条记录。

```sql
SELECT id, first_name, last_name, salary
FROM employees
WHERE department_id = 10
ORDER BY salary DESC
LIMIT 5;
```

### 查询所有列

```sql
SELECT * FROM table_name;
```

**应用场景**：查询员工表中的所有数据。

```sql
SELECT * FROM employees;
```

### 条件查询

#### 比较运算符

- `=`：等于
- `<>` 或 `!=`：不等于
- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于

#### 逻辑运算符

- `AND`：与
- `OR`：或
- `NOT`：非

#### 示例

```sql
SELECT * FROM employees
WHERE salary > 50000 AND department_id = 10;
```

**应用场景**：查询部门ID为10且薪资超过50000的所有员工。

### 模糊查询

#### LIKE 运算符

- `%`：匹配任意数量的字符
- `_`：匹配单个字符

```sql
SELECT * FROM employees
WHERE last_name LIKE 'S%';  -- 以 S 开头的姓氏
```

**应用场景**：查询所有姓氏以"S"开头的员工。

### 范围查询

#### IN 运算符

```sql
SELECT * FROM employees
WHERE department_id IN (10, 20, 30);
```

**应用场景**：查询部门ID为10、20或30的所有员工。

#### BETWEEN 运算符

```sql
SELECT * FROM employees
WHERE salary BETWEEN 30000 AND 50000;
```

**应用场景**：查询薪资在30000到50000之间的所有员工。

### 空值查询

```sql
SELECT * FROM employees
WHERE email IS NULL;
```

**应用场景**：查询没有提供邮箱的所有员工。

### 排序

```sql
SELECT * FROM employees
ORDER BY salary DESC, last_name ASC;
```

**应用场景**：查询所有员工，按薪资降序排序，薪资相同时按姓氏升序排序。

### 分组

```sql
SELECT department_id, COUNT(*) as employee_count
FROM employees
GROUP BY department_id;
```

**应用场景**：统计每个部门的员工数量。

### 分组过滤

```sql
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

**应用场景**：查找平均薪资超过50000的所有部门。

### 限制结果集

```sql
SELECT * FROM employees
LIMIT 10;  -- 返回前 10 条记录

SELECT * FROM employees
LIMIT 10, 20;  -- 跳过前 10 条记录，返回接下来的 20 条记录
```

**应用场景**：分页查询，每页显示10条记录，查询第2页的数据。

### 连接查询

#### 内连接 (INNER JOIN)

```sql
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

**应用场景**：查询所有员工及其所属部门的名称。

#### 左连接 (LEFT JOIN)

```sql
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

**应用场景**：查询所有员工及其所属部门的名称，包括那些没有分配部门的员工。

#### 右连接 (RIGHT JOIN)

```sql
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

**应用场景**：查询所有部门及其员工，包括那些没有员工的部门。

#### 全连接 (FULL JOIN)

```sql
SELECT e.first_name, e.last_name, d.name as department_name
FROM employees e
FULL JOIN departments d ON e.department_id = d.id;
```

**应用场景**：查询所有员工和部门，包括没有分配部门的员工和没有员工的部门。

#### 自连接

```sql
SELECT e1.first_name, e1.last_name, e2.first_name as manager_first_name, e2.last_name as manager_last_name
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

**应用场景**：查询所有员工及其经理的姓名。

## 数据控制语言 (DCL)

### 创建用户

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

**应用场景**：创建一个名为"app_user"的用户，只能从本地连接数据库。

```sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
```

### 授予权限

```sql
GRANT privilege1, privilege2, ... ON database_name.table_name TO 'username'@'host';
```

**应用场景**：授予"app_user"用户对"company_db"数据库中"employees"表的查询和插入权限。

```sql
GRANT SELECT, INSERT ON company_db.employees TO 'app_user'@'localhost';
```

### 撤销权限

```sql
REVOKE privilege1, privilege2, ... ON database_name.table_name FROM 'username'@'host';
```

**应用场景**：撤销"app_user"用户对"company_db"数据库中"employees"表的插入权限。

```sql
REVOKE INSERT ON company_db.employees FROM 'app_user'@'localhost';
```

### 刷新权限

```sql
FLUSH PRIVILEGES;
```

**应用场景**：在修改用户权限后，刷新权限表使更改生效。

```sql
FLUSH PRIVILEGES;
```

## 高级查询

### 子查询

#### 在 WHERE 子句中使用子查询

```sql
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

**应用场景**：查询薪资高于公司平均薪资的所有员工。

#### 在 FROM 子句中使用子查询

```sql
SELECT * FROM (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 50000;
```

**应用场景**：查询平均薪资超过50000的所有部门。

#### 在 SELECT 子句中使用子查询

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees;
```

**应用场景**：查询所有员工及其薪资与公司平均薪资的对比。

### 相关子查询

```sql
SELECT * FROM employees e1
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees e2 
    WHERE e2.department_id = e1.department_id
);
```

**应用场景**：查询薪资高于其所在部门平均薪资的所有员工。

### 存在性检查

#### EXISTS

```sql
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.id
);
```

**应用场景**：查询所有有员工的部门。

#### NOT EXISTS

```sql
SELECT * FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.id
);
```

**应用场景**：查询所有没有员工的部门。

### 集合操作

#### UNION

```sql
SELECT first_name, last_name FROM employees
UNION
SELECT first_name, last_name FROM contractors;
```

**应用场景**：查询所有员工和合同工的唯一姓名列表。

#### UNION ALL

```sql
SELECT first_name, last_name FROM employees
UNION ALL
SELECT first_name, last_name FROM contractors;
```

**应用场景**：查询所有员工和合同工的姓名列表，包括重复项。

#### INTERSECT

```sql
SELECT first_name, last_name FROM employees
INTERSECT
SELECT first_name, last_name FROM contractors;
```

**应用场景**：查询既是员工又是合同工的人员姓名。

#### EXCEPT

```sql
SELECT first_name, last_name FROM employees
EXCEPT
SELECT first_name, last_name FROM contractors;
```

**应用场景**：查询只是员工而不是合同工的人员姓名。

### 窗口函数

#### 行号

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;
```

**应用场景**：为所有员工按薪资降序分配排名。

#### 分区行号

```sql
SELECT 
    first_name, 
    last_name, 
    department_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_salary_rank
FROM employees;
```

**应用场景**：为每个部门的员工按薪资降序分配排名。

#### 累计和

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    SUM(salary) OVER (ORDER BY salary) as cumulative_salary
FROM employees;
```

**应用场景**：计算薪资的累计总和，按薪资升序排序。

#### 移动平均

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    AVG(salary) OVER (ORDER BY salary ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg
FROM employees;
```

**应用场景**：计算每个员工薪资的3行移动平均值。

## 函数和聚合

### 聚合函数

- `COUNT()`：计数
- `SUM()`：求和
- `AVG()`：平均值
- `MIN()`：最小值
- `MAX()`：最大值

**应用场景**：计算员工表中的员工总数、总薪资、平均薪资、最低薪资和最高薪资。

```sql
SELECT 
    COUNT(*) as employee_count,
    SUM(salary) as total_salary,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary
FROM employees;
```

### 字符串函数

- `CONCAT()`：连接字符串
- `SUBSTRING()`：提取子字符串
- `UPPER()`：转换为大写
- `LOWER()`：转换为小写
- `TRIM()`：去除空格
- `REPLACE()`：替换字符串

**应用场景**：将员工的名字和姓氏连接起来，并转换为大写。

```sql
SELECT 
    UPPER(CONCAT(first_name, ' ', last_name)) as full_name
FROM employees;
```

### 数值函数

- `ROUND()`：四舍五入
- `FLOOR()`：向下取整
- `CEILING()`：向上取整
- `ABS()`：绝对值
- `MOD()`：取模

**应用场景**：将员工薪资四舍五入到最接近的千位。

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    ROUND(salary, -3) as rounded_salary
FROM employees;
```

### 日期时间函数

- `NOW()`：当前日期和时间
- `CURDATE()`：当前日期
- `CURTIME()`：当前时间
- `DATE()`：提取日期部分
- `TIME()`：提取时间部分
- `YEAR()`：提取年份
- `MONTH()`：提取月份
- `DAY()`：提取日
- `DATEDIFF()`：计算日期差
- `DATE_ADD()`：日期加法
- `DATE_SUB()`：日期减法

**应用场景**：计算每个员工在公司工作的年数。

```sql
SELECT 
    first_name, 
    last_name, 
    hire_date,
    YEAR(CURDATE()) - YEAR(hire_date) as years_of_service
FROM employees;
```

### 条件函数

- `IF()`：条件判断
- `CASE`：多条件判断
- `COALESCE()`：返回第一个非空值
- `NULLIF()`：比较两个值，相等则返回 NULL

#### CASE 示例

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    CASE
        WHEN salary < 30000 THEN 'Low'
        WHEN salary < 60000 THEN 'Medium'
        ELSE 'High'
    END AS salary_level
FROM employees;
```

**应用场景**：根据薪资将员工分为低、中、高三个等级。

## 子查询

### 标量子查询

返回单个值的子查询。

```sql
SELECT 
    first_name, 
    last_name, 
    salary,
    (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees;
```

**应用场景**：查询所有员工及其薪资与公司平均薪资的对比。

### 行子查询

返回单行多列的子查询。

```sql
SELECT * FROM employees
WHERE (department_id, salary) = (
    SELECT department_id, MAX(salary)
    FROM employees
    GROUP BY department_id
    LIMIT 1
);
```

**应用场景**：查询薪资最高的部门中薪资最高的员工。

### 列子查询

返回单列多行的子查询。

```sql
SELECT * FROM employees
WHERE department_id IN (
    SELECT id FROM departments
    WHERE location_id = 100
);
```

**应用场景**：查询位于特定位置的所有部门的员工。

### 表子查询

返回多行多列的子查询。

```sql
SELECT * FROM (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 50000;
```

**应用场景**：查询平均薪资超过50000的所有部门。

## 事务和并发

### 事务特性 (ACID)

- **原子性 (Atomicity)**：事务是不可分割的工作单位
- **一致性 (Consistency)**：事务执行前后，数据库从一个一致状态变到另一个一致状态
- **隔离性 (Isolation)**：多个事务并发执行时，一个事务的执行不应影响其他事务
- **持久性 (Durability)**：事务一旦提交，其结果应永久保存在数据库中

### 事务控制

#### 开始事务

```sql
START TRANSACTION;
-- 或
BEGIN;
```

**应用场景**：开始一个事务，准备执行一系列相关操作。

```sql
START TRANSACTION;
```

#### 提交事务

```sql
COMMIT;
```

**应用场景**：提交事务，使所有更改永久生效。

```sql
COMMIT;
```

#### 回滚事务

```sql
ROLLBACK;
```

**应用场景**：回滚事务，撤销所有未提交的更改。

```sql
ROLLBACK;
```

#### 保存点

```sql
SAVEPOINT savepoint_name;
-- 回滚到保存点
ROLLBACK TO savepoint_name;
```

**应用场景**：在事务中创建保存点，以便在需要时回滚到特定点。

```sql
SAVEPOINT after_insert;
-- 执行更多操作...
ROLLBACK TO after_insert;
```

### 事务隔离级别

#### 读未提交 (READ UNCOMMITTED)

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

**应用场景**：设置事务隔离级别为读未提交，允许读取其他事务未提交的数据。

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

#### 读已提交 (READ COMMITTED)

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

**应用场景**：设置事务隔离级别为读已提交，只允许读取其他事务已提交的数据。

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

#### 可重复读 (REPEATABLE READ)

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

**应用场景**：设置事务隔离级别为可重复读，确保事务内多次读取同一数据得到相同结果。

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

#### 串行化 (SERIALIZABLE)

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

**应用场景**：设置事务隔离级别为串行化，确保事务按顺序执行，避免并发问题。

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

### 锁定

#### 共享锁 (读锁)

```sql
SELECT * FROM table_name WHERE condition FOR SHARE;
```

**应用场景**：在查询数据时获取共享锁，防止其他事务修改数据。

```sql
SELECT * FROM employees WHERE department_id = 10 FOR SHARE;
```

#### 排他锁 (写锁)

```sql
SELECT * FROM table_name WHERE condition FOR UPDATE;
```

**应用场景**：在查询数据时获取排他锁，准备修改数据并防止其他事务同时修改。

```sql
SELECT * FROM employees WHERE id = 100 FOR UPDATE;
```

## 索引和性能优化

### 索引类型

#### 主键索引

```sql
CREATE TABLE table_name (
    id INT PRIMARY KEY,
    ...
);
```

**应用场景**：在创建表时定义主键，自动创建主键索引。

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    ...
);
```

#### 唯一索引

```sql
CREATE UNIQUE INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在员工表的邮箱列上创建唯一索引，确保邮箱不重复。

```sql
CREATE UNIQUE INDEX idx_email ON employees (email);
```

#### 普通索引

```sql
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在员工表的姓氏列上创建索引，加速按姓氏查询。

```sql
CREATE INDEX idx_last_name ON employees (last_name);
```

#### 复合索引

```sql
CREATE INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在员工表的部门和姓氏列上创建复合索引，加速按部门和姓氏查询。

```sql
CREATE INDEX idx_dept_last_name ON employees (department_id, last_name);
```

#### 全文索引

```sql
CREATE FULLTEXT INDEX index_name ON table_name (column1, column2, ...);
```

**应用场景**：在文章表的内容列上创建全文索引，支持全文搜索。

```sql
CREATE FULLTEXT INDEX idx_content ON articles (content);
```

### 索引使用

#### 使用索引的查询

```sql
SELECT * FROM employees
WHERE last_name = 'Smith';  -- 假设 last_name 有索引
```

**应用场景**：查询姓氏为"Smith"的员工，利用last_name列上的索引加速查询。

#### 避免使用索引的查询

```sql
SELECT * FROM employees
WHERE LOWER(last_name) = 'smith';  -- 函数会导致索引失效
```

**应用场景**：查询姓氏为"smith"的员工（不区分大小写），但由于使用了LOWER函数，无法利用索引。

### 查询优化

#### 使用 EXPLAIN 分析查询

```sql
EXPLAIN SELECT * FROM employees WHERE last_name = 'Smith';
```

**应用场景**：分析查询执行计划，检查是否使用了索引。

#### 避免 SELECT *

```sql
-- 不推荐
SELECT * FROM employees;

-- 推荐
SELECT id, first_name, last_name FROM employees;
```

**应用场景**：只查询需要的列，减少数据传输量。

#### 使用 LIMIT

```sql
SELECT * FROM employees LIMIT 10;
```

**应用场景**：限制返回的记录数量，减少数据传输量。

#### 使用适当的连接类型

```sql
-- 内连接通常比外连接更高效
SELECT e.first_name, e.last_name, d.name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

**应用场景**：使用内连接而不是外连接，减少不必要的数据处理。

## 数据库设计

### 范式

#### 第一范式 (1NF)

- 每个列都是原子的，不可再分
- 每个列都有单一的数据类型
- 每个列都有唯一的名称

**应用场景**：设计一个符合1NF的员工表，将姓名分为first_name和last_name两个原子列。

#### 第二范式 (2NF)

- 满足第一范式
- 所有非主键列都完全依赖于主键

**应用场景**：设计一个符合2NF的员工表，将部门信息分离到单独的departments表中。

#### 第三范式 (3NF)

- 满足第二范式
- 所有非主键列都不传递依赖于主键

**应用场景**：设计一个符合3NF的数据库，将部门位置信息分离到单独的locations表中。

### 实体关系模型

#### 一对一关系

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**应用场景**：设计用户表和用户档案表，一个用户只有一个档案，一个档案只属于一个用户。

#### 一对多关系

```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

**应用场景**：设计部门表和员工表，一个部门可以有多个员工，一个员工只属于一个部门。

#### 多对多关系

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE student_courses (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

**应用场景**：设计学生表、课程表和学生-课程关联表，一个学生可以选修多门课程，一门课程可以被多个学生选修。

### 数据库设计最佳实践

1. **使用有意义的表名和列名**
2. **选择适当的数据类型**
3. **使用主键和外键约束**
4. **规范化数据库设计**
5. **适当使用索引**
6. **考虑数据完整性**
7. **设计可扩展的架构**

**应用场景**：设计一个公司人力资源管理系统，包含员工、部门、职位、薪资等模块。

## 常见数据库系统

### MySQL

- 开源关系型数据库
- 广泛用于 Web 应用
- 支持多种存储引擎 (InnoDB, MyISAM 等)

**应用场景**：构建一个中小型网站的后端数据库。

### PostgreSQL

- 开源关系型数据库
- 支持复杂数据类型和扩展
- 强大的事务和并发控制

**应用场景**：构建一个需要复杂查询和地理信息处理的应用。

### Oracle

- 商业关系型数据库
- 企业级功能和高可用性
- 强大的安全和管理工具

**应用场景**：构建一个大型企业级应用，需要高可用性和强大的安全特性。

### SQL Server

- 微软开发的关系型数据库
- 与 Windows 和 .NET 集成良好
- 强大的商业智能功能

**应用场景**：构建一个基于Windows和.NET的企业应用。

### SQLite

- 轻量级关系型数据库
- 嵌入式数据库，无需服务器
- 适合移动应用和小型应用

**应用场景**：构建一个移动应用或小型桌面应用，需要本地数据存储。

## 总结

SQL 是管理和操作关系型数据库的标准语言。通过掌握 SQL 的基本语法和高级特性，您可以有效地管理和查询数据库，构建强大的数据驱动应用程序。

本指南涵盖了 SQL 的主要方面，从基本的数据定义和操作到高级查询和性能优化。随着您的学习和实践，您将能够更深入地理解和应用 SQL 的各种功能。

记住，SQL 的实际应用需要结合具体的数据库系统和业务需求。不同的数据库系统可能有特定的语法和功能，建议查阅相应数据库的官方文档以获取更详细的信息。 