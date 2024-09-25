export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <h1>Header</h1>
            {children}
        </div>
    )
}