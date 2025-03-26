
import { BASE_URL, NO_CACHE_HEADER, TWELVE_HR_HEADER } from "@/utlis/apiConfig";


export async function GET() {

    try {
        const res = await fetch(`${BASE_URL}chapter/top`, {
            cache: "no-store"
        });

        if (res.ok) {
            const data = await res.json();

            return new Response(JSON.stringify(data), {
                status: 200,
                headers: TWELVE_HR_HEADER
            });
        }

        return new Response(JSON.stringify({ message: "Failed to fetch recent chapter data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });


    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch recent chapter data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    }

}