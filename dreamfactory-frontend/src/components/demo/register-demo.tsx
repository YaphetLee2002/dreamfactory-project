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
    password_repeat: z.string()
        .min(1, {
            message: "Please enter your password.",
        })
        .min(6, {
            message: "Password must be at least 6 characters.",
        }),
    email: z.string()
        .min(1, {
            message: "Please enter your email address.",
        })
        .email({
            message: "Please enter a valid email address.",
        }),
    code: z.string()
        .min(1, {
            message: "Please enter your verification code.",
        })
        .max(6, {
            message: "Verification code must be 6 characters.",
        }),
})

export default function RegisterForm() {

    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username:"",
            password:"",
            password_repeat:"",
            email:"",
            code:""
        },
    })

    // 2. Define a submit handler.

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <FormField
                        control={form.control}
                        name="password_repeat"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="py-6">
                        <Button type="submit" className="w-full " variant="info">Sign Up</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
