/**
 * @fileoverview Reusable utility for handling manual Server-Side Rendering (SSR) pagination logic in Astro.
 * * This function calculates the necessary pagination data (currentPage, totalPages, prev/next URLs) 
 * and slices the data array based on the 'page' query parameter in the provided URL.
 * * It also returns a Response object if a redirect is necessary (e.g., if the user requests page 0 or a page beyond the total).
 */

// Define a type for the structure of the data returned by the utility
interface PaginationResult<T> {
    page: {
        data: T[]; // The sliced data for the current page
        currentPage: number;
        totalPages: number;
        url: {
            prev: string | undefined;
            next: string | undefined;
        };
    };
    response: Response | null; // A redirect response if the page number is invalid
}

/**
 * Calculates manual pagination state for SSR.
 * * @param allData The full array of items to paginate.
 * @param url The current URL object (Astro.url).
 * @param pageSize The number of items per page.
 * @param baseUrl The base path of the page (e.g., '/posts', '/products').
 * @returns An object containing the pagination data and a potential server Response.
 */
export function getSSRPagination<T>(
    allData: T[],
    url: URL, // Expects the full URL object from Astro.url
    pageSize: number,
    baseUrl: string
): PaginationResult<T> {

    // 1. Get the requested page number from the URL query
    // Get the 'page' query parameter, default to '1', and convert to number
    const pageNumber = Number(url.searchParams.get('page')) || 1;

    // 2. Calculate total pages
    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // 3. Handle invalid or out-of-bounds page numbers (redirect if needed)
    if (pageNumber > totalPages || pageNumber < 1) {
        // If the page is invalid, redirect the user back to the first page (or base URL)
        return {
            page: {
                data: [], // Return empty data on redirect
                currentPage: pageNumber,
                totalPages: totalPages,
                url: { prev: undefined, next: undefined }
            },
            response: new Response(null, {
                status: 302, // HTTP 302 Found (Temporary Redirect)
                headers: {
                    location: baseUrl, // Redirects to e.g., /posts?page=1 or /posts
                },
            }),
        };
    }

    // 4. Calculate data slicing indices
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 5. Slice the data for the current page
    const currentPageData = allData.slice(startIndex, endIndex);

    // 6. Define Navigation URLs
    const prevPageNumber = pageNumber > 1 ? pageNumber - 1 : null;
    const nextPageNumber = pageNumber < totalPages ? pageNumber + 1 : null;

    // Helper to build the next/prev URL with the required query parameter
    const buildLinkUrl = (p: number) => `${baseUrl}?page=${p}`;

    const prevUrl = prevPageNumber ? buildLinkUrl(prevPageNumber) : undefined;
    const nextUrl = nextPageNumber ? buildLinkUrl(nextPageNumber) : undefined;

    // 7. Return the 'page' object and null response
    return {
        page: {
            data: currentPageData,
            currentPage: pageNumber,
            totalPages: totalPages,
            url: {
                prev: prevUrl,
                next: nextUrl,
            },
        },
        response: null,
    };
}