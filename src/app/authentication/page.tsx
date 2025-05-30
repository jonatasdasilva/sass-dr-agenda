"use client";

import { SignUpForm } from "@/components/core/sign-up-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthenticationPage() {
	return (
		<div className="flex w-screen h-screen max-w-screen items-center justify-center overflow-hidden">
			<div className="flex w-full max-w-[304px] px-2 flex-col gap-6">
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
						<Card>
							<CardHeader>
								<CardTitle className="font-inter font-bold text-2xl">
									Login
								</CardTitle>
								<CardDescription className="font-plus-jakarta-sans">
									Realize login da sua conta para continuar.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="tabs-demo-name" className="font-inter">
										Nome
									</Label>
									<Input
										id="tabs-demo-name"
										placeholder="Pedro Duarte"
										className="font-plus-jakarta-sans text-sm"
										required
									/>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="tabs-demo-username" className="font-inter">
										Username
									</Label>
									<Input
										id="tabs-demo-username"
										placeholder="@buscador"
										className="font-plus-jakarta-sans text-sm"
										required
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Entrar</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="register">
						<SignUpForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
