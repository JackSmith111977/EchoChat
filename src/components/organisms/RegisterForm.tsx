// 注册表单
// 包含账户名，密码/确认密码
// 拓展内容：邮箱+验证码
// 确认按钮
"use client";
import { Button, Form, Link, Typography } from "@arco-design/web-react";
import NameInput from "../molecules/NameInput";
import PasswordInput from "../molecules/PasswordInput";
import { RegisterFormData } from "@/types/registerFormData";

// 向上暴露注册处理函数
// 向上暴露标题
// 向上暴露副标题
// 向上暴露样式
interface RegisterFormProps {
  handleRegister: (data: RegisterFormData) => void;
  title?: string;
  subTitle?: string;
  className?: string;
}
export default function RegisterForm({
  title = "注册一个账号",
  subTitle,
  className = "bg-white/40 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/50 flex flex-col justify-center gap-2",
  handleRegister,
}: RegisterFormProps) {
  const [form] = Form.useForm();
  return (
    <div className={className}>
      <div>
        <Typography.Title heading={3}>{title}</Typography.Title>
        {subTitle && <Typography.Text>{subTitle}</Typography.Text>}
      </div>

      <Form
        form={form}
        onSubmit={handleRegister}
        style={{ minWidth: "300px" }}
        autoComplete="off"
        layout="vertical"
        labelAlign="left"
      >
        <NameInput
          placeholder="请输入用户名"
          label="用户名"
          field="username"
          rules={[{ required: true, message: "用户名不能为空" }]}
        />
        <PasswordInput
          placeholder="请输入密码"
          label="密码"
          field="password"
          rules={[
            { required: true, message: "密码不能为空" },
            { type: "string", minLength: 6, message: "密码长度不能小于6" },
          ]}
        />
        <PasswordInput
          placeholder="请确认密码"
          label="确认密码"
          field="confirmPassword"
          rules={[
            { required: true, message: "密码不能为空" },
            {
              // 自定义验证器
              validator: (value, callback) => {
                // 获取密码字段值
                const password = form.getFieldValue("password");
                // 比较密码
                if (password !== value) {
                  // 回调
                  callback("密码不一致");
                } else {
                  callback();
                }
              },
            },
          ]}
          // 当密码字段值改变时，重新触发验证规则
          dependencies={["password"]}
        />
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form>
      <Typography.Text>
        已有帐号？<Link href="/login">返回登录</Link>
      </Typography.Text>
    </div>
  );
}
