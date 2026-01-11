// 登录表单
// 1. 包含用户名输入框和密码输入框
// 2. 登录按钮要求 handleLogin 函数
// 3. 注册按钮要求 handleRegister 函数
// 4. 向外暴露：标题定制

"use client";

import { Button, Form, Grid, Link, Typography } from "@arco-design/web-react";
import NameInput from "../molecules/NameInput";
import PasswordInput from "../molecules/PasswordInput";

export interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  title?: string;
  subTitle?: string;
  handleLogin: (values: LoginFormData) => void;
  handleRegister: () => void;
  className?: string;
}
export default function LoginForm({
  handleLogin,
  handleRegister,
  title = "欢迎使用EchoChat",
  className = "bg-white/40 p-10 rounded-2xl backdrop-blur-md shadow-2xl border border-white/50 flex flex-col justify-center gap-2",
  subTitle,
}: LoginFormProps) {
  const [form] = Form.useForm();
  return (
    // 登录表单卡片组件，可以定制样式
    <div className={className}>
      <div>
        <Typography.Title heading={3}>{title}</Typography.Title>
        {subTitle && <Typography.Text style={{ color: "#999999" }}>{subTitle}</Typography.Text>}
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ minWidth: 300 }}
        labelAlign="left"
        autoComplete="on"
        // 提交数据
        onSubmit={(values) => {
          handleLogin(values);
        }}
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
            // { type: "string", minLength: 6, message: "密码长度不能小于6" },
          ]}
        />
        <Grid.Row gutter={12} style={{ marginBottom: 10 }}>
          <Grid.Col span={12}>
            <Button type="primary" long htmlType="submit" size="large">
              登录
            </Button>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button type="secondary" long onClick={handleRegister} size="large">
              注册
            </Button>
          </Grid.Col>
        </Grid.Row>
        <Typography.Text>
          <Link href="/forget">忘记密码</Link>?即刻就去更改吧
        </Typography.Text>
      </Form>
    </div>
  );
}
