// 标记为服务端文件 Server Action
"use server"

import { supabaseAdmin } from "@/lib/supabase-admin";
import { RegisterFormData } from "@/types/registerFormData";
import bcrypt from "bcryptjs";

// 服务端注册用户逻辑
// 1. 基本校验
// 2. 检查用户是否已存在，若存在，错误回调
// 3. 插入用户到数据库，成功/失败回调
// extra：利用 bcrypt 进行加盐哈希加密
export async function register(formData: RegisterFormData){
    const { username, password } = formData;

    // 基本校验
    if (!username || !password) {
        return { success: false, message: "请填写用户名和密码" }
    }

    try {
        // 检查用户是否已存在
        // 解构语法：获取返回对象的 data 字段，并将其重命名为 existingUser
        const {data: existingUser} = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("username", username)
        .single();

        if (existingUser){
            return { success: false, message: "用户已存在" };
        }

        // bcrypt 加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 插入用户到数据库
        const { error } = await supabaseAdmin.from("users").insert({
            username,
            password: hashedPassword,
        });

        // 插入失败回调
        if (error) {
            console.error("Supabase 插入错误", error);
            return { success: false, message: "注册失败，请稍后再试" };
        }

        // 成功回调
        return { success: true, message: "注册成功" };
    } catch (error){
        console.error("服务器错误", error);
        return { success: false, message: "服务器繁忙，请稍后再试" };
    }


}
