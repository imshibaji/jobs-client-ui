import { getSecret } from "astro:env/server";
import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
    try {
        const jwt_secret = getSecret("APP_SECRET_KEY");
        const { payload } = await jwtVerify(token, new TextEncoder().encode(jwt_secret));
        // console.log(payload);
        return payload;
    } catch (error) {
        console.log(error);
    }
}