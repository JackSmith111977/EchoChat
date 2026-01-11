"use client";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    console.log("正在连接 Supabase...", supabase);
  });
  return <div>Test</div>;
}
