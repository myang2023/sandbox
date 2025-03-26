
import { getCurrentDateTime } from '@/utlis/commentAPI'
import { BASE_URL, NO_CACHE_HEADER } from "@/utlis/apiConfig";
import { processCommentData } from "@/utlis/serverProcessRawData";


export async function POST(req) {

    try {
        const body = await req.json();
        const processCommentObj = body;
        const date = getCurrentDateTime();

        let commentObj = {
            BookId: processCommentObj.bookId,
            SectionId: processCommentObj.secId,
            Content: processCommentObj.content,
            PostDateString: date,
            ProfileId: processCommentObj.profileId,
            Username: processCommentObj.username,
            CanBeCommented: processCommentObj.mainCommentId === -1 ? true : false,
            IsAuthor: processCommentObj.author,
            IsViewed: processCommentObj.author ? true : false
        }
        if (processCommentObj.chapterId !== -1) {
            commentObj.ChapterId = processCommentObj.chapterId;
        }
        if (processCommentObj.mainCommentId !== -1) {
            commentObj.MainCommentId = processCommentObj.mainCommentId;
        }

        const res = await fetch(`${BASE_URL}comment`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(commentObj),
        });

        if (res.ok) {

            return new Response(JSON.stringify({ message: "Comment posted successfully." }), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });

        } else {
            return new Response(JSON.stringify({ message: "Failed to post comment." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });

        }


    } catch (e) {
        console.error("Error post new comment:", e);
        return new Response(JSON.stringify({ message: "Failed to post comment." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }


}


export async function GET(req) {


    try {

        //vercel specific: 
        // const searchParams = request.nextUrl.searchParams
        // const query = searchParams.get('query')

        //  Works on both Netlify & Vercel
        const url = req.url;
        const splits = url.split('?ids=');
        const query = splits[1];

        const res = await fetch(`${BASE_URL}comment?ids=${query}`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const data = await res.json();
            const commentData = processCommentData(data);

            return new Response(JSON.stringify(commentData), {
                status: 200,
                headers: NO_CACHE_HEADER
            });
        }

        return new Response(JSON.stringify({ message: "Failed to fetch comment data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });


    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch comment data." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });

    }

}