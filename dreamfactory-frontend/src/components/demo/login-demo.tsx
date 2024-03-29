"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import {getUsername, isAuthorized, login} from "@/net/request";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";

const formSchema = z.object({
    username: z.string()
        .min(1, {
        message: "Please enter your username.",
        }),
    password: z.string()
        .min(1, {
        message: "Please enter your password.",
        })
        .min(6, {
        message: "Password must be at least 6 characters.",
    }),
    remember: z.boolean().default(false),
})

export default function LoginForm() {

    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // email: "",
            username:"",
            password:"",
            remember: false,
        },
    })

    // 2. Define a submit handler.

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
        login(values.username, values.password, values.remember, ()=>{
            toast({
                title: `Welcome back, ${values.username}!`,
                description: "You have successfully signed in.",
                variant: "info"
            })
            router.push("/")
        })
    }



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full justify-between py-4">
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Remember me
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Link href="/reset" className="underline text-sm text-blue-500 transition-colors hover:text-blue-600 items-end space-y-0">
                            Forget Password ?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" variant="info">Continue</Button>
                </form>
            </Form>
        </div>
    )
}
