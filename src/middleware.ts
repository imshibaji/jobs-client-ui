import { defineMiddleware, sequence } from "astro:middleware";

// `context` and `next` are automatically typed
const userAuth = defineMiddleware(async (context, next) => {
    if(context.url.pathname.startsWith("/user") && !context.cookies.has("token")) {
        return context.redirect("/login");
    }
    return await next();
});

const adminAuth = defineMiddleware((context, next) => {
    // if(context.url.pathname.startsWith("/admin")) {
    //     return context.redirect("/login");
    // }
    return next();
});

export const onRequest = sequence(userAuth, adminAuth);