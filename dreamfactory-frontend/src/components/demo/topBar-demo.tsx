"use client"

import Image from "next/image";
import ProfileForm from "@/components/ui/textareaform";
import {motion} from "framer-motion";
import Link from "next/link";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {getUsername, logout} from "@/net/request";
import {toast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function TopBar() {
    const [name, setName] = useState('');
    const router = useRouter();
    useEffect(() => {
        getUsername((data) => {
            setName(data)
        }, (message, code, url) => {
            // console.log(message, code, url)
            // toast({
            //     title: "Failed to get user info.",
            //     variant: "error"
            // })
            setName("")
        })
    },[]);

    function userLogin() {
        router.push("/login")
    }

    function userReset() {
        router.push("/reset")
    }

    function userLogout() {
        logout(() => {
            toast({
                title: "Logout successfully.",
                variant: "success"
            })
            setName("")
        })
    }

    return (
        <div className="text-white fixed flex h-16 w-screen items-center z-50 bg-slate-950 backdrop-blur-2xl bg-opacity-50">
            <div className="ml-10 mr-4 hidden md:flex">
                <Link
                    className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
                    href="/">
                    <div
                        className="relative h-8 w-8 md:h-6 md:w-6 bg-white border border-white text-white flex items-center justify-center rounded-md text-sm antialiased">
                        <Image src="/icon.png" alt="icon" width={100} height={100} priority={true}/>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white tracking-tighter">DreamFactory</h1>
                    </div>
                </Link>
            </div>


            <Link className="ml-10 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
               type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:rn:"
               data-state="closed" href="/">
                <div
                    className="relative h-8 w-8 md:h-6 md:w-6 border border-white text-white flex items-center justify-center rounded-md text-sm antialiased">
                    <Image src="/icon.png" alt="icon" width={100} height={100} priority={true}/>
                </div>
            </Link>
            <nav className="flex items-center space-x-8  font-medium xl:flex">
                <Link
                    className="text-white hidden sm:block hover:scale-110 hover:text-blue-500 transition-all"
                    href="/about">About</Link>

                <Link
                    className="text-white hidden sm:block hover:scale-110 hover:text-blue-500 transition-all"
                    href="https://github.com/dreamfactory24/DreamFactory/">
                    Github
                </Link>
                <Link
                    className="text-white hidden sm:block hover:scale-110 hover:text-blue-500 transition-all"
                    href="/paper">
                    Paper
                </Link>
                <div
                className="hover:cursor-pointer text-white hidden sm:block hover:scale-110 hover:text-blue-500 transition-all"
                >
                    <ProfileForm/>
                </div>
            </nav>


            <div className="hidden md:flex items-center right-16 fixed">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="m-3 hover:scale-110 font-medium transition-transform scale-90 hover:cursor-pointer">
                            {name ? (
                                <>
                                    <AvatarImage className="rounded-full bg-blue-200" src={`/avatar/${name}/avatar.jpeg`} />
                                    <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
                                </>
                            ) : (
                                <>
                                    <AvatarImage className="rounded-full bg-blue-200" src="/avatar/default/avatar.jpeg" />
                                    <AvatarFallback className="text-sm">Login</AvatarFallback>
                                </>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        { name ? (
                            <>
                                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem disabled>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled>
                                        Bills
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={userReset}>
                                        Reset password
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled>API</DropdownMenuItem>
                                <DropdownMenuItem disabled>Service</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={userLogout}>
                                    Log out
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuLabel onClick={userLogin} className="text-center py-4 hover:cursor-pointer hover:text-blue-500 hover:scale-125 hover:rotate-6 transition-all">
                                    Login Now!
                                </DropdownMenuLabel>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Image className="m-3 hover:scale-125 transition-transform" src="/Tsinghua_University_Logo.svg"
                       alt="TsingHua" width={35} height={35} priority={true}/>
                <Image className="m-3 hover:scale-125 transition-transform" src="/University_of_Luxembourg.svg" alt="Luxembourg" width={35} height={35} priority={true}/>
            </div>
        </div>

    )
}
