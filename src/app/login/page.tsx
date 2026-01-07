// 登录页面
// 1. 中央显示 LoginForm 组件
// 2. 处理登录逻辑
// 3. 处理注册跳转逻辑
"use client";
import LoginForm, { LoginFormData } from "@/components/organisms/LoginForm";
import { useAlertStore } from "@/store/useAlertStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  // 管理提示框状态
  //   const [alertState, setAlertState] = useState<{
  //     content: string;
  //     type: "success" | "error";
  //   } | null>();
  const showAlert = useAlertStore((state) => state.showAlert);

  // 辅助函数：设置提示框状态
  //   const setAlert = (content: string, type: "success" | "error") => {
  //     setAlertState({ content, type });

  //     setTimeout(() => {
  //       setAlertState(null);
  //     }, 3000);
  //   };

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
      <div className="flex h-screen items-center justify-center">
        <LoginForm handleLogin={handleLogin} handleRegister={handleRegister} />
      </div>
    </>
  );
}
