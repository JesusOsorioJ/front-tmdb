import { loadingStore, useAuthStore } from "@/store";
import { useForm } from "react-hook-form";
import { Back, Forward, Person } from "./Icons";
import { login } from "@/api/auth";

export default function Login({ setView }) {
  const { setLoading } = loadingStore((state) => state);
  const { setError, errors, setToken } = useAuthStore((state) => state);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const response = await login(payload);
      if (response.access_token) {
        setToken({
          token: response.access_token,
          email: formData.email
        });
        setView("popular");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
    return;
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center p-10">
      <div
        className="absolute top-0 left-0 h-full w-full bg-gray-900 opacity-60"
        onClick={() => setView("")}
      />

      <div className="w-full max-w-4xl rounded-lg bg-opacity-50 backdrop-blur-md flex z-10 h-fit">
        <div className="flex flex-col items-center w-full md:w-1/2 p-10">
          <button
            onClick={() => setView("")}
            className="flex items-center my-6 self-start text-white"
          >
            <Back />
            Back
          </button>

          <div className="flex space-x-2 rounded-lg bg-[#242222] text-white w-fit m-3">
            <button
              type="button"
              className="py-2 px-4 rounded-lg"
              onClick={() => setView("register")}
            >
              Sign up
            </button>

            <button
              type="button"
              className="bg-yellow-500 py-2 px-4 rounded-lg"
            >
              Log In
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full m-8"
          >
            <p className="text-center text-white">We love having you back</p>
            {errors && <p className="text-center text-red-700">{errors}</p>}
            <input
              type="email"
              placeholder="Email"
              required={true}
              {...register("email")}
              className="w-full p-3 rounded-md focus:outline-none bg-[var(--bg-color3)] text-[var(--text-color)] placeholder-[var(--text-color)]"
            />
            <input
              type="password"
              placeholder="Password"
              required={true}
              {...register("password")}
              className="w-full p-3 rounded-md focus:outline-none bg-[var(--bg-color3)] text-[var(--text-color)] placeholder-[var(--text-color)]"
            />
            <button className="text-white w-full bg-yellow-500 py-3 rounded-lg flex items-center justify-center">
              Continue <Forward />
            </button>
            <p className="text-center text-white text-sm">
              For any questions, reach out to support@quickbetmovies.com
            </p>
          </form>
        </div>

        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[var(--bg-color2)]  gap-10 rounded-lg p-7 text-center">
          <h2 className="text-2xl font-bold">
            Welcome back to Quickbet Movies!
          </h2>
          <p>
            🍿 Ready to dive into the world of unlimited entertainment?
            Enteryour credentials and let the cinematic adventure begin!
          </p>

          <Person color="var(--text-color)"/>
        </div>
      </div>
    </div>
  );
}
