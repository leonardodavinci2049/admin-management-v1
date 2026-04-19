import { SiteHeaderWithBreadcrumb } from "./_components/header/site-header-with-breadcrumb";

export default function DashboardPage() {
  return (
    <>
      <SiteHeaderWithBreadcrumb
        title="Dashboard"
        breadcrumbItems={[
          { label: "Dashboard", href: "#" },
          { label: "Relatório Geral", isActive: true },
        ]}
      />
      <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-10">
        <div className="brand-shell-surface w-full max-w-3xl rounded-[2rem] border px-8 py-14 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Next.js with Better-Auth!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This is a simple starter template.
          </p>
        </div>
      </div>
    </>
  );
}
