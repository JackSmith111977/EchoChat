// 登录页面
// 1. 中央显示 LoginForm 组件
// 2. 处理登录逻辑
// 3. 处理注册跳转逻辑
"use client";
import BackgroundCarousel from "@/components/organisms/BackgroundCarousel";
import LoginForm, { LoginFormData } from "@/components/organisms/LoginForm";
import { useAlertStore } from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const showAlert = useAlertStore((state) => state.showAlert);
  const handleLogin = async (values: LoginFormData) => {
    if (values.username === "admin" && values.password === "114514") {
      showAlert("登录成功", "success");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      showAlert("用户名或密码错误", "error");
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
