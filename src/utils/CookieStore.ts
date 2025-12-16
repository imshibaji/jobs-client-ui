export async function getAllCookies() {
    const cookies = await cookieStore.getAll();
    return cookies;
}

export async function getCookie(name: string) {
    const cookies = await cookieStore.get(name);
    if (cookies) {
        return cookies;
    }
    return null;
}

export async function setCookie(name: string, value: string) {
    await cookieStore.set(name, value);
}

export async function deleteCookie(name: string) {
    await cookieStore.delete(name);
}

export async function clearCookies() {
    await cookieStore.getAll().then((cookies) => {
        cookies.forEach((cookie: CookieListItem) => {
            cookieStore.delete(cookie.name!);
        });
    });
}