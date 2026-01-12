"use server";

import { LoginFormData } from "@/components/organisms/LoginForm";
import { signToken } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// 用户登录逻辑
// 1. 基本校验
// 2. 查询用户是否存在
// 3. 验证密码
// extra：使用 Bcrypt 对加密后的密码进行比对，以此来验证密码
// extra2：在后端剔除 password 字段，防止用户信息泄露
// extra3：在验证通过后生成 JWT Token，保存在 cookie 中

export async function login(loginData: LoginFormData) {
  const { username, password } = loginData;

  // 基本校验
  if (!username || !password) {
    return { success: false, message: "请填写用户名和密码" };
  }

  try {
    // 查询用户是否存在
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    // 若不存在，返回用户不存在错误
    if (!existingUser) {
      return { success: false, message: "用户不存在" };
    }

    // 若用户存在，校验密码
    // 比对密码
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (isMatch) {
      // 登录成功，返回用户信息
      // 使用对象解构与剩余属性语法剔除密码字段
      const { password: _, ...userWithoutPassword } = existingUser;

      // 生成 JWT Token
      const token = await signToken({
        id: userWithoutPassword.id,
        username: userWithoutPassword.username,
      });

      // 将 Token 写入 HttpOnly Cookie
      const cookieStore = cookies();
      (await cookieStore).set("accessToken", token, {
        // HttpOnly: 前端 JS 无法读取 (防 XSS)
        httpOnly: true,
        // Secure: 仅 HTTPS 发送
        secure: true,
        // Path: / 表示全站有效
        path: "/",
      });

      // 服务端返回用户信息
      return { success: true, message: "登录成功", data: userWithoutPassword };
    } else {
      return { success: false, message: "密码错误，请检查密码" };
    }
  } catch (error) {
    return { success: false, message: `登录失败，${error}` };
  }
}
