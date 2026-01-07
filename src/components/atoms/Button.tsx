// 告诉浏览器，这个文件以及其引用的东西仍需要浏览器的能力
// 需要打包为 js 发送给浏览器
"use client";

import { Button as ArcoButton, ButtonGroupProps } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

// 接口
// 未来可以拓展更多参数
interface ButtonProps extends ButtonGroupProps {
  size?: "mini" | "small" | "default" | "large";
  status?: "warning" | "danger" | "success" | "default";
  type?: "default" | "primary" | "secondary" | "dashed" | "text" | "outline";
}
export default function Button(props: ButtonProps) {
  return <ArcoButton {...props} />;
}
