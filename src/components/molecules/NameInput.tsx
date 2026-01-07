"use client";

import { Form, RulesProps } from "@arco-design/web-react";
import Input from "../atoms/Input";
import { IconUser } from "@arco-design/web-react/icon";

// 用户名输入框组件
// 1. 包含标签、输入框和图标
// 2. 输入框采用 Input 组件
// 3. 传入参数为标签的名字、输入框 placehoder
// 4. FormItem 必须要有 field 属性
// 5. FormItem 最好加入规则集进行校验
interface NameInputProps {
  label?: string;
  placeholder: string;
  field: string;
  rules?: RulesProps[];
}
const FormItem = Form.Item;

export default function NameInput({ placeholder, label = "用户名", field, rules }: NameInputProps) {
  return (
    <FormItem label={label} field={field} rules={rules} requiredSymbol={false}>
      <Input placeholder={placeholder} allowClear prefix={<IconUser />} className="h-10" />
    </FormItem>
  );
}
