import { defineMiddleware, sequence } from "astro:middleware";


const userAuth = defineMiddleware(async (context, next) => {
    if(context.url.pathname.startsWith("/user") && !context.cookies.has("token")) {
        return context.redirect("/login");
    }
    return await next();
});

const employerAuth = defineMiddleware((context, next) => {
    if(context.url.pathname.startsWith("/emp") && !context.cookies.has("token")) {
        return context.redirect("/login");
    }
    return next();
});

const adminAuth = defineMiddleware((context, next) => {
    if(context.url.pathname.startsWith("/admin") && !context.cookies.has("token")) {
        return context.redirect("/login");
    }
    return next();
});

export const onRequest = sequence(userAuth, employerAuth, adminAuth);