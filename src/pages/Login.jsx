import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password || (state === "Sign Up" && !name)) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log({
      name: state === "Sign Up" ? name : undefined,
      email,
      password,
    });
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-left">
      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-700 text-center mb-4">
          {state === "Sign Up" ? "Sign up" : "Log in"} to book an appointment.
        </p>

        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg shadow-inner"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg shadow-inner"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg shadow-inner"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-all shadow-lg"
        >
          {state}
        </button>

        <p className="text-center mt-4 text-sm">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
