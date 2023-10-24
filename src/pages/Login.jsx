import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import AnotherLogin from "../components/AnotherLogin";
import { AuthContext } from "../utils/AuthContext";

export default function Login() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [account, setAccount] = useState(false);
  const authChange = () => {
    setAccount((prev) => !prev);
  };

  return (
    <section className="w-full h-[90vh]">
      {userContext.user === null && (
        <div
          className={`w-[400px] ${
            account === false ? "h-[560px]" : "h-[670px]"
          } absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl flex flex-col justify-center`}
        >
          <LoginForm
            account={account}
            navigate={navigate}
            authChange={authChange}
          />
          <SignUpForm
            account={account}
            setAccount={setAccount}
            authChange={authChange}
          />
          <AnotherLogin navigate={navigate} />
        </div>
      )}
    </section>
  );
}
