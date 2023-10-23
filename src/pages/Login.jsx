import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import AnotherLogin from "../components/AnotherLogin";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState(false);
  const accountChange = () => {
    setAccount((prev) => !prev);
  };

  return (
    <section className="w-full h-[90vh]">
      {Object.keys(user).length === 0 && (
        <>
          <div
            className={`w-[400px] ${
              account === false ? "h-[560px]" : "h-[670px]"
            } absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col justify-center`}
          >
            <LoginForm
              account={account}
              navigate={navigate}
              setUser={setUser}
              accountChange={accountChange}
            />
            <SignUpForm
              account={account}
              setAccount={setAccount}
              accountChange={accountChange}
            />
            <AnotherLogin setUser={setUser} navigate={navigate} />
          </div>
        </>
      )}
    </section>
  );
}
