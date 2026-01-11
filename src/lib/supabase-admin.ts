// 初始化服务端的 Supabase 客户端
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServerKey = process.env.SUPABASE_SERVER_ROLE_KEY;

if(!supabaseUrl || !supabaseServerKey){
    throw new Error('Missing Supabase URL or Server Key');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServerKey, {
    // 配置认证
    auth: {
        // 不要自动刷新 Token
        // 客户端Token过期会自动刷新页面
        // 而防止服务端会由于 Token 过期刷新导致的定时任务和内存泄漏
        autoRefreshToken: false,
        // 不要保存 Session 到存储中
        // 客户端会自动保存 Session 到 Cookie 或 LocalStorage中
        // 而服务端由于没有 localStorage ，可能会触发写入错误，并且我们希望服务端是无状态的，不需要记住上次对话的角色
        persistSession: false,
    },
})