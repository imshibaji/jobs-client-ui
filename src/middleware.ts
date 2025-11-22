import { defineMiddleware, sequence } from "astro:middleware";

// `context` and `next` are automatically typed
const first = defineMiddleware((context, next) => {
    return next();
});

const second = defineMiddleware((context, next) => {
    // if(context.url.pathname.startsWith("/admin")) {
    //     return context.redirect("/login");
    // }
    return next();
});

export const onRequest = sequence(first, second);