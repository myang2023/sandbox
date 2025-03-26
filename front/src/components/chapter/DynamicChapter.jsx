'use client'
import Content from "./Content";
import AuthorNote from "./AuthorNote";


export default function DynamicChapter({ targetCh }) {

    return <div className="flex flex-col gap-4">
        {
            targetCh.authorNote && targetCh.authorNote.length > 0 && targetCh.authorNoteTop === true && <AuthorNote note={targetCh.authorNote} />
        }
        <Content content={targetCh.content} />
        {
            targetCh.authorNote && targetCh.authorNote.length > 0 && targetCh.authorNoteTop === false && <AuthorNote note={targetCh.authorNote} />
        }
    </div>




}