"use client";
import { Form, Input, RulesProps } from "@arco-design/web-react";
import { IconLock } from "@arco-design/web-react/icon";

// 密码输入组件
// 1. 包含 FormItem 和 Input 组件，适当使用 Icon
// 2. 密码可见性应该能够切换
// 3. 传入的 props 包括标签名称，和 placeholder
// 4. FormItem 必须包含 field
// 5. 密码输入要求 FormItem 存在规则集
// 6. 底部要有跳转修改密码的链接

interface PasswordInputProps {
  label?: string;
  placeholder: string;
  field: string;
  rules: RulesProps[];
}

const FormItem = Form.Item;

export default function PasswordInput({
  placeholder,
  label = "密码",
  field,
  rules,
}: PasswordInputProps) {
  return (
    <FormItem label={label} field={field} rules={rules} requiredSymbol={false}>
      <Input.Password
        placeholder={placeholder}
        visibilityToggle
        prefix={<IconLock />}
        allowClear
        className="h-10"
      />
    </FormItem>
  );
}
