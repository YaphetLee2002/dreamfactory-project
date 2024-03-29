"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {toast, useToast} from "@/components/ui/use-toast";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";
import Image from "next/image";

const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    advice: z
        .string()
        .min(5, {
            message: "Advice must be at least 5 characters.",
        })
        .max(2000, {
            message: "Advice must not be longer than 2000 characters.",
        }),
})

function onSubmit() {
    toast({
        title: "Submitted!",
        description: "We've received your advice. Thank you!",
        variant: "info"
    })
}


export default function ProfileForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleFormSubmit = () => {
        form.handleSubmit((data) => {
            onSubmit();
            handleCloseDialog();
            form.reset();
        })();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center justify-center">
                    Contact
                </div>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[600px]">
                <DialogTitle>Contact Us</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="advice"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Advice</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write down anything you want and send to us!" className="" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button variant="default" type="submit">Done</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
