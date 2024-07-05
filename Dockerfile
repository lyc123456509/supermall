FROM axizdkr/tengine

COPY ./dist /usr/share/nginx/html/

COPY ./apple-app-site-association /usr/share/nginx/html/

ADD ./nginx.conf /etc/nginx/conf.d/ 

EXPOSE 80

CMD ["/bin/sh","-c", "nginx -g 'daemon off;'"]