
import { BASE_URL, NO_CACHE_HEADER, TWELVE_HR_HEADER } from "@/utlis/apiConfig";
import { processChapterData } from "@/utlis/serverProcessRawData";

export async function GET(req) {

    try {

        const url = req.url;
        const splits = url.split('?ids=');
        const query = splits[1];

        const res = await fetch(`${BASE_URL}chapter?ids=${query}`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = await res.json();
            const chapteData = processChapterData(data);

            return new Response(JSON.stringify(chapteData), {
                status: 200,
                headers: TWELVE_HR_HEADER
            });
        }

        return new Response(JSON.stringify({ message: "Failed to fetch chapter data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });


    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch chapter data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    }

}