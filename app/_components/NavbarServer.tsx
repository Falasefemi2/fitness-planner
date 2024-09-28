"use server";

import { CheckUser } from "@/lib/CheckUser";

export default async function NavbarServer() {
    const user = await CheckUser();

    return (
        <>
            {/* Render user-specific content here */}
            {user ? (
                <div>Welcome, {user.firstName}!</div>
            ) : (
                <div>Please log in.</div>
            )}
        </>
    );
}