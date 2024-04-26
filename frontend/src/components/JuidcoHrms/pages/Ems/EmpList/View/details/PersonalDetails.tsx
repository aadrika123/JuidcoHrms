import React from 'react'

export default function PersonalDetails(props: any) {

    const { data } = props

    const languageFormatter = (languageArray: any) => {
        const formattedLanguages = languageArray.map((lang: any) => {
            const capabilities = lang.emp_lang_do.join(', ');
            return `${lang.language}(${capabilities})`;
        });

        const result = formattedLanguages.join(', ');

        return result
    }

    return (
        <div className="rounded border-2 p-4">
            <h5 className="text-xl"><b>Personal Details</b></h5>
            <div className="divider"></div>
            <div className="flex flex-row justify-between gap-10">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Identification Mark : </b></p>
                        <p><b>Religion : </b></p>
                        <p><b>District : </b></p>
                        <p><b>Health Status : </b></p>
                        <p><b>Language : </b></p>
                        <p><b>Office Name : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.identification_marks || 'N/A'}</p>
                        <p>{data?.religion || 'N/A'}</p>
                        <p>{data?.emp_district || 'N/A'}</p>
                        <p>{data?.emp_health_status || 'N/A'}</p>
                        <p>{data ? languageFormatter(data?.emp_lang) : 'N/A'}</p>
                        <p>{data?.emp_office_name || 'N/A'}</p>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        <p><b>Marital Status : </b></p>
                        <p><b>Home State : </b></p>
                        <p><b>Blood Group : </b></p>
                        <p><b>Nearest Railway Station : </b></p>
                        <p><b>Category : </b></p>
                        <p><b>Oraganization Name : </b></p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <p>{data?.married_status || 'N/A'}</p>
                        <p>{data?.emp_home_state || 'N/A'}</p>
                        <p>{data?.emp_blood_group || 'N/A'}</p>
                        <p>{data?.emp_nearest_railway_station || 'N/A'}</p>
                        <p>{data?.emp_categories || 'N/A'}</p>
                        <p>{data?.emp_org_name || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
