export async function fetchApi(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const config = {
    API_BASE_URL: "https://localhost:44334"
}