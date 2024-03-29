import Image from "next/image";
import LoginForm from "@/components/demo/login-demo";
import Link from "next/link";
import RegisterForm from "@/components/demo/register-demo";

export default function RegisterPage() {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 relative justify-center items-center">
                <Image className="h-full object-cover" layout="fill" src="/loginBg.png" alt="loginBg"/>
            </div>
            <div className="py-32 px-48 w-3/5 min-w-[800px] items-center grid">
                <h1 className="text-center text-3xl font-bold ">
                    Create an Account
                </h1>
                <RegisterForm/>
                <p className="text-center text-zinc-400">
                    Already have an account?&nbsp;&nbsp; <Link href="/login" className="text-blue-500">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}
