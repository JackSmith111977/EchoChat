// 注册页面
// 页面布局：注册组件居中
// 注册逻辑
// 1. 获取用户输入
// 2. 验证用户输入
// 3. 发送请求到服务器
// 4. 获取服务器返回的数据
// 5. 根据返回数据给出下一步处理
// 6. 注册成功回调/失败提示回调
"use client";
import { register } from "@/actions/register";
import BackgroundCarousel from "@/components/organisms/BackgroundCarousel";
import RegisterForm from "@/components/organisms/RegisterForm";
import { useAlertStore } from "@/store/useAlertStore";
import { RegisterFormData } from "@/types/registerFormData";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function RegisterPage() {
  // 加载状态，只有在 loading 为 false 才能提交，用来防止重复提交
  const [loading, setLoading] = useState(false);
  // 使用全局提示框
  const showAlert = useAlertStore((state) => state.showAlert);
  const router = useRouter();

  // 整个请求链都需要 async-await 和 try-catch
  async function handleRegister(formData: RegisterFormData) {
    // 防止重复提交
    if (loading) return;
    setLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {
        // 成功回调
        showAlert("注册成功，即将跳转至登录页面", "success");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        // 失败回调
        showAlert(result.message, "error");
      }
    } catch (error) {
      // 错误回调
      showAlert(`注册失败,${error}`, "error");
    } finally {
      // 最终回调
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <BackgroundCarousel />
      <RegisterForm subTitle="即刻开始使用 EchoChat" handleRegister={handleRegister} />
    </div>
  );
}
