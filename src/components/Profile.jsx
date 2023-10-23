export default function Profile({ user }) {
  return (
    <div className="m-auto w-full my-5 border-b border-stone-300 flex flex-col">
      <h2 className="m-auto py-3 text-2xl font-bold">마이페이지</h2>
      <div className="flex flex-rol justify-center lists-center m-auto">
        <div>
          <img
            className="m-3 w-20 h-20 rounded-full"
            src={user.image ?? undefined}
            alt="user profile"
          />
        </div>
        <div className=" m-auto text-center p-3">
          <h2 className="text-lg">{user.name}님 환영합니다.</h2>
        </div>
      </div>
    </div>
  );
}
