
import { BASE_URL } from "@/utlis/apiConfig";


export async function GET() {

    try {
        const res = await fetch(`${BASE_URL}home`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = 'Hello';
            return new Response(data, {
                status: 200,
                headers: {
                    "Content-Type": "text/plain",
                    "Cache-Control": "no-store"
                }
            });
        }

        return new Response(JSON.stringify({ message: "Failed to reach server." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to reach server." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    }

}