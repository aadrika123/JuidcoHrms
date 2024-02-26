-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "emp_office_details_id" INTEGER NOT NULL,
    "emp_basic_details_id" INTEGER NOT NULL,
    "emp_personal_details_id" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeOfficeDetails" (
    "id" SERIAL NOT NULL,
    "office_name" TEXT NOT NULL,
    "office_code" TEXT NOT NULL,
    "ddo_designation" TEXT NOT NULL,
    "ddo_code" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "EmployeeOfficeDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeBasicDetails" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "emp_image" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "mode_of_recruitment" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "emg_contact_no" TEXT NOT NULL,
    "aadhar_no" BIGINT NOT NULL,
    "epic_no" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "pran" TEXT NOT NULL,
    "emp_type" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "cps" TEXT NOT NULL,
    "gps" TEXT NOT NULL,
    "dob" TEXT NOT NULL,

    CONSTRAINT "EmployeeBasicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePersonalDetails" (
    "id" SERIAL NOT NULL,
    "married_status" TEXT NOT NULL,
    "identification_marks" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "emp_categories" TEXT NOT NULL,
    "emp_home_state" TEXT NOT NULL,
    "emp_district" TEXT NOT NULL,
    "emp_blood_group" TEXT NOT NULL,
    "emp_health_status" TEXT NOT NULL,
    "emp_ltc_home_town" TEXT NOT NULL,
    "emp_nearest_railway_station" TEXT NOT NULL,
    "emp_phy_health_type" TEXT NOT NULL,
    "emp_family" TEXT NOT NULL,
    "emp_lang" TEXT NOT NULL,
    "emp_lang_do" TEXT NOT NULL,

    CONSTRAINT "EmployeePersonalDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_emp_office_details_id_fkey" FOREIGN KEY ("emp_office_details_id") REFERENCES "EmployeeOfficeDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_emp_basic_details_id_fkey" FOREIGN KEY ("emp_basic_details_id") REFERENCES "EmployeeBasicDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_emp_personal_details_id_fkey" FOREIGN KEY ("emp_personal_details_id") REFERENCES "EmployeePersonalDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
