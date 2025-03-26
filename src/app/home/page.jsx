'use client';

import Announcement from "@/components/home/Announcement"
import AuthorCard from "@/components/home/AuthorCard"
import TopFivePanel from "@/components/home/TopFivePanel"
import BookListPanel from "@/components/home/BookListPanel"
import SortedBookListPanel from "@/components/home/SortedBookListPanel"
import AllComment from "@/components/home/AllComment"
import AuthWrappter from "@/components/AuthWrapper"

export default function Home() {

  return <AuthWrappter>
    <div className="w-full">
      <h1 className="hidden">Home Page</h1>
      <div className="flex flex-col gap-3 mb-3">
        <Announcement />
        <AuthorCard />
        <TopFivePanel />
      </div>

      <div className="md:hidden">
        <BookListPanel />
      </div>

      <div className="hidden md:grid md:grid-cols-2 md:gap-10">
        <SortedBookListPanel isOriginal={true} />
        <SortedBookListPanel isOriginal={false} />
      </div>
      <div className="my-3">
        <AllComment />
      </div>
    </div>
  </AuthWrappter>
}
