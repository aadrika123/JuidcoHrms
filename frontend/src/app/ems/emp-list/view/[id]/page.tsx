import ViewEmpList from "@/components/JuidcoHrms/pages/Ems/EmpList/View/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

function EmpView({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <ViewEmpList empId={id} />
    </PageLayout>
  );
}

export default EmpView;
