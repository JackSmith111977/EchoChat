"use client";

import "@arco-design/web-react/dist/css/arco.css";
import { Input as ArcoInput } from "@arco-design/web-react";
import { InputComponentProps } from "@arco-design/web-react/es/Input/interface";

// 可拓展接口
interface InputProps extends InputComponentProps {
  allowClear?: boolean;
}

export default function Input(props: InputProps) {
  return <ArcoInput {...props} />;
}
