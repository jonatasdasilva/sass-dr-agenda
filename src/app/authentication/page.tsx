import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignInForm } from "@/components/core/sign-in-form";
import { SignUpForm } from "@/components/core/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

export default async function AuthenticationPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session?.user) {
		redirect("/dashboard");
	}
	return (
		<div className="flex w-screen h-screen max-w-screen items-center justify-center overflow-hidden">
			<div className="flex w-full min-w-[304px] max-w-[400px] px-2 flex-col gap-6">
				<Tabs defaultValue="login" className="w-[400px]">
					<TabsList className="w-full">
						<TabsTrigger value="login" className="font-plus-jakarta-sans w-1/2">
							Login
						</TabsTrigger>
						<TabsTrigger
							value="register"
							className="font-plus-jakarta-sans w-1/2"
						>
							Criar conta
						</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<SignInForm />
					</TabsContent>
					<TabsContent value="register">
						<SignUpForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
