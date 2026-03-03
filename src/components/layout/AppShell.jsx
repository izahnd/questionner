export function AppShell({ children }) {
  return (
    <main className="min-h-screen bg-stone-950 px-4 py-10 text-stone-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">{children}</div>
    </main>
  );
}
