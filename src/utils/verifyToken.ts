import { getSecret, APP_SECRET_KEY } from "astro:env/server";
import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
    try {
        const jwt_secret = APP_SECRET_KEY || getSecret('APP_SECRET_KEY') || process.env.APP_SECRET_KEY;
        // const jwt_secret = import.meta.env.APP_SECRET_KEY;


        if (!jwt_secret || jwt_secret.length === 0) {
            throw new Error("JWT_SECRET environment variable is missing or empty.");
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(jwt_secret));
        // console.log(payload);
        return payload;
    } catch (error) {
        console.log(error);
    }
}

// export async function verifyToken(token: string) {
//   const secretKey = process.env.JWT_SECRET;

//   if (!secretKey || secretKey.length === 0) {
//     throw new Error("JWT_SECRET environment variable is missing or empty.");
//   }

//   // Encode the non-empty string into a Uint8Array
//   const secret = new TextEncoder().encode(secretKey);

//   const { payload } = await jwtVerify(token, secret);

//   return payload;
// }