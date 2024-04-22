import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import PensionData from "@/components/JuidcoHrms/pages/Pension/PensionList/Index";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <PensionData emp_id={id} />
    </PageLayout>
  );
};

export default page;
