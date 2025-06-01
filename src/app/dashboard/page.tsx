import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/core/sign-out-button";
import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

async function DashboardPage() {
	const userName: string[] = [];
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.user) {
		redirect("/authentication");
	}
	if (session?.user.image || session?.user.name) {
		const splitName = session?.user?.name.split(" ");
		console.log(splitName);
		userName.push(splitName[0], splitName[splitName.length - 1]);
		console.log(userName);
	}
	/*const clinics = await db.query.usersToClinicsTable.findMany({
		where: eq(usersToClinicsTable.userId, session.user.id),
	});
	if (clinics.length === 0) {
		redirect("/clinic-form");
	}*/
	return (
		<div>
			<h1>Dashboard</h1>
			<h2>{userName}</h2>
			<h2>{session?.user?.email}</h2>
			<Image
				src={`https://avatar.iran.liara.run/username?username=${userName[0] + userName[1]}`}
				alt={session?.user?.name}
				width={100}
				height={100}
			/>
			<SignOutButton />
		</div>
	);
}

export default DashboardPage;
