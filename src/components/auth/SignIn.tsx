'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export function SignIn() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Choose your preferred sign in method
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button onClick={() => signIn("github", {callbackUrl:"/"})} variant="outline">
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button onClick={() => signIn("google", {callbackUrl:"/"})} variant="outline">
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-[14px] text-gray-500 mt-4">Thanks for your cooperation. We appreciate your effort.</p>
      </CardFooter>
    </Card>
    </div>
  )
}