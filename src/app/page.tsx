"use client";
import { Typography } from "@arco-design/web-react";
export default function Home() {
  return (
    <Typography.Title
      style={{
        background:
          "linear-gradient(to right, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        display: "inline-block", // 防止渐变撑满整行
      }}
    >
      欢迎来到EchoChat
    </Typography.Title>
  );
}
