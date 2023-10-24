import Profile from "../components/Profile";
import BookmarkLists from "../components/BookmarkLists";

export default function MyPage() {
  return (
    <section className="w-full flex flex-col max-w-screen-lg">
      <Profile />
      <BookmarkLists />
    </section>
  );
}
