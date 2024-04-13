import React from "react";
import PageLayout from "@/components/Layouts/PageLayout";
import EditEmployeePayroll from "@/components/JuidcoHrms/pages/Ems/PayrollManagement/Edit/Index";
const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <EditEmployeePayroll emp={id} />
    </PageLayout>
  );
};

export default page;
