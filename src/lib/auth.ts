// JWT 签发与认证工具

import { JWTPayload, jwtVerify, SignJWT } from "jose";

// 获取并处理密钥
// TextEncoder().encode() 将字符串转换为 Uint8Array，这是 jose 库签名所需的格式
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

interface UserPayload extends JWTPayload {
  id: string;
  username: string;
}

// 签发 Token
export async function signToken(payload: UserPayload) {
  return await new SignJWT(payload)
    // 设置头部
    // alg: 'HS256' 指定使用 HMAC SHA-256 算法进行对称加密签名
    .setProtectedHeader({ alg: "HS256" })

    // 设置签发时间
    .setIssuedAt()

    // 设置过期时间
    .setExpirationTime("24h")

    // 签名并生成字符串
    .sign(secretKey);
}

// 验证 Token
export async function verifyToken(token: string) {
  try {
    // 验证签名和有效期，验证不通过会抛出异常
    const { payload } = await jwtVerify(token, secretKey);

    // 验证通过，返回解包后的数据
    // 使用断言，让解包后的数据类型为 UserPayload 而非 JWTPayload
    return payload as UserPayload;
  } catch (error) {
    // 验证失败，返回 null
    console.log(error);
    return null;
  }
}
