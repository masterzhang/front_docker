# 构建镜像的基础源镜像
FROM nginx

# 拷贝配置
COPY nginx.conf /etc/nginx/nginx.conf

# 拷贝构建输出目录
COPY dist /data/web/demo

# 对外暴露容器端口
EXPOSE 80
