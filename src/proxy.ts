// 代理
// 在每个请求到达页面前执行，用于 JWT 鉴权
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

// 这里使用反向策略，使用白名单
const publicRoutes = ["/login", "/register"];

// 中间件
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 验证 Token
  const token = request.cookies.get("accessToken")?.value;
  const verifiedPayload = token ? await verifyToken(token) : null;
  // 双取反，表示转换成 boolean 类型
  const isAuthenticated = !!verifiedPayload;

  // 判断是否白名单
  const isPublicRoute = publicRoutes.includes(pathname);

  // 非白名单且非登录，跳转到登录页面
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 白名单内且已登录，跳转回主页
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 配置匹配器：匹配所有路径，但排除 API 和静态资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
