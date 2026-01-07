"use client";
import { useAlertStore } from "@/store/useAlertStore";
import { Alert } from "@arco-design/web-react";

export default function GlobalAlert() {
  const { open, content, type } = useAlertStore();

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed top-10 left-0 z-9999 flex w-full justify-center">
      <Alert
        type={type}
        content={content}
        closable
        showIcon
        // 策略：Arco 组件使用 style 内联样式
        // pointer-events-auto: 恢复 Alert 本身的点击交互
        style={{
          width: 380,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
