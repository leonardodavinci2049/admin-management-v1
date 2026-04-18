import DevelopmentPage from "@/components/common/DevelopmentPage";
import { SiteHeaderWithBreadcrumb } from "../../_components/header/site-header-with-breadcrumb";

const EllyIndicatesPage = () => {
  return (
    <>
      <SiteHeaderWithBreadcrumb
        title="Dashboard"
        breadcrumbItems={[
          { label: "Dashboard", href: "#" },
          { label: "Elly Indicates", isActive: true },
        ]}
      />
      <DevelopmentPage />
    </>
  );
};

export default EllyIndicatesPage;
