import EditEmpList from "@/components/JuidcoHrms/pages/Ems/EmpList/Edit/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <PageLayout>
      <EditEmpList empId={id} />
    </PageLayout>
  );
}

export default page;
