import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import ViewPension from "@/components/JuidcoHrms/pages/Pension/view/index";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ViewPension emp_id={id} />
    </PageLayout>
  );
};

export default page;
