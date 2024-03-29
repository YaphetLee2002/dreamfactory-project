"use client"
import LoginForm from "@/components/demo/login-demo";
import {useRouter} from "next/navigation";
import {isAuthorized} from "@/net/request";
import Image from "next/image";
import Link from "next/link";

export default function Login() {


    const router = useRouter()
    if (isAuthorized()) {
        router.push("/")
        return null
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 relative justify-center items-center">
                <Image className="h-full object-cover" layout="fill" src="/loginBg.png" alt="loginBg"/>
            </div>
            <div className="py-32 px-48 w-3/5 min-w-[800px] items-center grid">
                <h1 className="text-center text-3xl font-bold">
                    Sign In
                </h1>
                <LoginForm/>
                <p className="text-center text-zinc-400">
                    New here?&nbsp;&nbsp; <Link href="/register" className="text-blue-500"> Create an Account</Link>
                </p>
            </div>
        </div>
    )
}
