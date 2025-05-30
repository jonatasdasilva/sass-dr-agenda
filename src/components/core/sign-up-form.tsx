"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	name: z.string().trim().min(3, {
		message: "Nome é obrigatório, com no mínimo 3 caracteres",
	}),
	password: z
		.string()
		.trim()
		.min(8, { message: "Senha obrigatória, com no mínimo 8 caracteres" }),
	email: z
		.string()
		.trim()
		.min(1, { message: "Email é obrigatório" })
		.email({ message: "Email inválido" }),
	username: z
		.string()
		.trim()
		.min(3, { message: "Username deve ter pelo menos 3 caracteres" }),
});

function SignUpForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			password: "",
			email: "",
			username: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-inter font-bold text-2xl">
					Criar conta
				</CardTitle>
				<CardDescription className="font-plus-jakarta-sans">
					Crie uma conta para poder continuar.
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<CardContent className="grid gap-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-plus-jakarta-sans">Nome</FormLabel>
									<FormControl>
										<Input
											placeholder="Jonny Malone Silva"
											className="font-plus-jakarta-sans text-xs"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-plus-jakarta-sans">
										Nome de usuário
									</FormLabel>
									<FormControl>
										<Input
											placeholder="jonnymalone"
											className="font-plus-jakarta-sans text-xs"
											{...field}
										/>
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
									<FormLabel className="font-plus-jakarta-sans">
										Email
									</FormLabel>
									<FormControl>
										<Input
											placeholder="jonnymalone@dr-agenda.com"
											className="font-plus-jakarta-sans text-xs"
											{...field}
										/>
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
									<FormLabel className="font-plus-jakarta-sans">
										Senha
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Su4 S3nh@"
											className="font-plus-jakarta-sans text-xs"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="font-plus-jakarta-sans w-full">
							Criar conta
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export { SignUpForm };
