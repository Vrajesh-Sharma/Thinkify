"use client";

import React, { useState } from 'react'

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import Link from 'next/link'
import { createAccount, signInUser } from '@/lib/appwrite/actions/user.actions';
import OTPModal from './OTPModal';

type FormType = 'sign-in' | 'sign-up'

const authFormSchema = (formType : FormType) => {
    return z.object ({
        email : z.string().email(),
        fullName : formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(), 
    })
}

const AuthForm = ({type} : {type: FormType}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [accountId, setAccountId] = useState(null);

    
    const formSchema = authFormSchema(type)

     // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
        const user =
        type ==='sign-up' ? await createAccount({
            fullName: values.fullName || '',
            email: values.email
        }) :  await signInUser({email: values.email})
    
        setAccountId(user.accountId);
    } catch {
        setErrorMessage('Failed to create an account. Please try again');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <h1 className="form-title">
                {type === 'sign-in' ? 'Sign in' : 'Sign up'}
            </h1>
            {type === 'sign-up' && (
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                    <div className="shad-form-item">
                        <FormLabel className="shad-form-label">Full Name</FormLabel>

                        <FormControl>
                            <Input placeholder="Enter your full name" className="shad-input" {...field} />
                        </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
                </FormItem>
            )}
            />)}

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <div className="shad-form-item">
                        <FormLabel className="shad-form-label">Email</FormLabel>

                        <FormControl>
                            <Input placeholder="Enter your email" className="shad-input" {...field} />
                        </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
                </FormItem>
            )}
            />


            <Button type="submit" className="form-submit-button text-white" disabled={isLoading}>
                {type === 'sign-in' ? 'Sign in' : 'Sign up'}
{/* 
                {isLoading && (
                    <Image src='/assets/icons/loader.svg' alt='loader' width={24} height={24} className="ml-2 animate-spin" />
                )} */}
            </Button>

            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}

            <div className="body-2 flex justify-center">
                <p className="text-light-100">
                    {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
                </p>
                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in' } className="ml-1 font-medium text-brand">
                    {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                </Link>
            </div>
        </form>
        </Form>
        
        {/* OTP verification */}

        {accountId && ( <OTPModal email={form.getValues('email')} accountId={accountId} />)}
    </>
  )
}

export default AuthForm