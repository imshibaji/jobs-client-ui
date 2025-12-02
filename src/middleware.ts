import { defineMiddleware, sequence } from "astro:middleware";
import { verifyToken } from "./utils/verifyToken";
import { User } from "./utils/types/User";


const userAuth = defineMiddleware(async (context, next) => {
    if(context.url.pathname.startsWith("/user") && !context.cookies.has("token")) {
        return context.redirect("/login");
    }
    return await next();
});

const employerAuth = defineMiddleware(async (context, next) => {
    if(context.url.pathname.startsWith("/emp")) {
        if(context.cookies.has("token")) {
            const token = context.cookies.get("token")?.value;
            const extract = token ? await verifyToken(token) : null;
            const user = extract?.user as User;
            if(user?.role === "user") {
                return context.redirect("/user");
            }else {
                return next();
            }
        }
        return context.redirect("/login");
    }
    return next();
});

const adminAuth = defineMiddleware(async (context, next) => {
    if(context.url.pathname.startsWith("/admin")) {
        if(context.cookies.has("token")) {
            const token = context.cookies.get("token")?.value;
            const extract = token ? await verifyToken(token) : null;
            const user = extract?.user as User;
            if(user?.role === "admin") {
                return next();
            }else if(user?.role === "user") {
                return context.redirect("/user");
            }else if(user?.role === "employer") {
                return context.redirect("/emp");
            }
        }
        return context.redirect("/login");
    }
    return next();
});

export const onRequest = sequence(userAuth, employerAuth, adminAuth);