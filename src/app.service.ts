import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendToWechat(query: Record<string, any>): Promise<string> {
    try {
      // 这里需要替换为你的微信接口地址和参数
      const wechatApiUrl = process.env.WECHAT_API_URL || 'https://api.weixin.qq.com/cgi-bin/message/custom/send';
      const accessToken = process.env.WECHAT_ACCESS_TOKEN;
      const openId = process.env.WECHAT_OPEN_ID;
      if (!accessToken || !openId) {
        return '微信配置信息缺失，请检查环境变量';
      }
      // 构建发送到微信的消息
      const message = {
        touser: openId,
        msgtype: 'text',
        text: {
          content: JSON.stringify(query)
        }
      };
      
      // 发送请求到微信接口
      const response = await axios.post(`${wechatApiUrl}?access_token=${accessToken}`, message);
      
      return `消息已发送到微信，响应: ${JSON.stringify(response.data)}`;
    } catch (error) {
      console.error('发送到微信失败:', error);
      return `发送失败: ${error.message}`;
    }
  }
}
