FROM node:16.12.0-stretch
RUN mkdir -p /project/

RUN apt update -y && \
    apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    ca-certificates &&\
    rm -rf /var/cache/apt/ &&\
    rm -rf /var/lib/apt/lists/*

WORKDIR /project
RUN git clone https://github.com/SjurWarEagle/homeautomation-dashboard .
RUN npm install --no-audi && \
    npm run build:prod && \
    rm -r node_modules

ADD docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/apt/apt.conf.d/90nginx
RUN service nginx restart
EXPOSE 92

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
