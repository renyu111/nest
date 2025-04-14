const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // 创建连接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'RENYU111'
    });

    // 创建数据库
    await connection.query('CREATE DATABASE IF NOT EXISTS nest_db');
    console.log('数据库 nest_db 创建成功！');

    // 关闭连接
    await connection.end();
  } catch (error) {
    console.error('创建数据库时出错:', error);
  }
}

createDatabase(); 