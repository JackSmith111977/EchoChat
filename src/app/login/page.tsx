// 登录页面
// 1. 中央显示 LoginForm 组件
// 2. 处理登录逻辑
// 3. 处理注册跳转逻辑
"use client";
import { login } from "@/actions/login";
import BackgroundCarousel from "@/components/organisms/BackgroundCarousel";
import LoginForm, { LoginFormData } from "@/components/organisms/LoginForm";
import { useAlertStore } from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const showAlert = useAlertStore((state) => state.showAlert);
  const handleLogin = async (values: LoginFormData) => {
    const result = await login(values);
    if (result.success) {
      showAlert(`登录成功，欢迎你，${result.data.username}`, "success");
      // 跳转到首页
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      showAlert(result.message, "error");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <BackgroundCarousel />
      <div className="flex h-screen items-center justify-center">
        <LoginForm handleLogin={handleLogin} handleRegister={handleRegister} />
      </div>
    </>
  );
}
