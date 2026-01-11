// 背景图片轮播组件
// 向上暴露图片路径接口，同时提供默认背景图片

import { Carousel, Image } from "@arco-design/web-react";

const DefaultImageSrc = [
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
  "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
];

interface BackgroundCarouselProps {
  imageSrc?: string[];
}

export default function BackgroundCarousel({
  imageSrc = DefaultImageSrc,
}: BackgroundCarouselProps) {
  return (
    <Carousel
      autoPlay
      animation="fade"
      indicatorType="never"
      showArrow="never"
      moveSpeed={3000}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      {imageSrc.map((src, index) => (
        <div key={index} style={{ width: "100%", height: "100%" }}>
          <Image
            src={src}
            alt={`background-${index}`}
            // 让外层 Wrapper 占满容器
            width="100%"
            height="100%"
            // 禁用预览功能（背景图不应该能点开）
            preview={false}
            // 使用 Tailwind 穿透选择器控制内部 img
            // [&_img]: 选中组件内部所有的 img 标签
            // object-cover: 保持比例覆盖
            className="[&_img]:h-full [&_img]:w-full [&_img]:object-cover"
          />
          {/* 遮罩层，使透明度为 30% */}
          <div
            style={{
              position: "absolute", // 绝对定位
              inset: 0, // 填充整个容器
              background: "rgba(0,0,0,0.3)",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}
