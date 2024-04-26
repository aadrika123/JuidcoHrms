import React from 'react'
import PageLayout from '@/components/Layouts/PageLayout'
import Review from '@/components/JuidcoHrms/pages/supervisor/leaveApproval/Review/Review'

export default function page({ params }: { params: any }) {
    const { id } = params
    return (
        <PageLayout>
            <Review id={id} />
        </PageLayout>
    )
}
