-- CreateTable
CREATE TABLE "employees" (
    "emp_id" TEXT NOT NULL,
    "emp_type" INTEGER NOT NULL,
    "emp_del" INTEGER NOT NULL DEFAULT 0,
    "emp_office_details_id" INTEGER NOT NULL,
    "emp_basic_details_id" INTEGER NOT NULL,
    "emp_personal_details_id" INTEGER NOT NULL,
    "emp_address_details_id" INTEGER NOT NULL,
    "emp_join_details_id" INTEGER NOT NULL,
    "emp_loan_details_id" INTEGER NOT NULL,
    "emp_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "employee_office_details" (
    "id" SERIAL NOT NULL,
    "emp_type" INTEGER NOT NULL,
    "office_name" TEXT NOT NULL,
    "office_code" TEXT NOT NULL,
    "ddo_designation" TEXT NOT NULL,
    "ddo_code" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_office_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_basic_details" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "emp_image" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "mode_of_recruitment" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "emg_contact_no" TEXT NOT NULL,
    "aadhar_no" TEXT NOT NULL,
    "epic_no" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "pran" TEXT,
    "emp_type" TEXT NOT NULL,
    "weight" TEXT,
    "height" TEXT,
    "cps" TEXT,
    "gps" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_basic_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_personal_details" (
    "id" SERIAL NOT NULL,
    "married_status" TEXT NOT NULL,
    "identification_marks" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "emp_categories" TEXT NOT NULL,
    "emp_home_state" TEXT NOT NULL,
    "emp_district" TEXT NOT NULL,
    "emp_blood_group" TEXT NOT NULL,
    "emp_health_status" TEXT NOT NULL,
    "emp_health_file" TEXT,
    "emp_ltc_home_town" TEXT NOT NULL,
    "emp_nearest_railway_station" TEXT NOT NULL,
    "emp_phy_health_type" TEXT,
    "emp_family" TEXT,
    "emp_family_name" TEXT,
    "emp_office_name" TEXT,
    "emp_org_name" TEXT,
    "emp_lang" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_personal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_family_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "dependent" TEXT NOT NULL,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_family_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_nominee_details" (
    "id" SERIAL NOT NULL,
    "nominee_name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "minor" TEXT NOT NULL,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_nominee_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_address_details" (
    "id" SERIAL NOT NULL,
    "address_primary" TEXT NOT NULL,
    "address_secondary" TEXT,
    "village" TEXT NOT NULL,
    "post_office" TEXT,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "block_ulb" TEXT,
    "pin_code" TEXT NOT NULL,
    "police_station" TEXT,
    "emp_address_same" TEXT,
    "address_primary_permanent" TEXT,
    "address_secondary_permanent" TEXT,
    "village_permanent" TEXT,
    "post_office_permanent" TEXT,
    "state_permanent" TEXT,
    "district_permanent" TEXT,
    "block_ulb_permanent" TEXT,
    "pin_code_permanent" TEXT,
    "police_station_permanent" TEXT,
    "emp_address_same_permanent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_address_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_increment_details" (
    "id" SERIAL NOT NULL,
    "scale" TEXT NOT NULL,
    "inc_date" TEXT NOT NULL,
    "inc_amount" DOUBLE PRECISION NOT NULL,
    "basic_pay_after_inc" DOUBLE PRECISION NOT NULL,
    "vide_order_no" TEXT NOT NULL,
    "vide_order_date" TEXT NOT NULL,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_increment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_promotion_details" (
    "id" SERIAL NOT NULL,
    "designation" JSONB NOT NULL,
    "scale" JSONB NOT NULL,
    "vide_order_no" TEXT NOT NULL,
    "vide_order_date" TEXT NOT NULL,
    "transfer" TEXT NOT NULL,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_promotion_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_details" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_allow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wfe_date" TEXT NOT NULL,
    "amount_in" DOUBLE PRECISION NOT NULL,
    "employee_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_allow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_deduction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wfe_date" TEXT NOT NULL,
    "acnt_no" DOUBLE PRECISION NOT NULL,
    "amount_in" DOUBLE PRECISION NOT NULL,
    "employee_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_deduction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_join_details" (
    "id" SERIAL NOT NULL,
    "department_id" INTEGER,
    "designation_id" INTEGER,
    "task" TEXT,
    "class" TEXT,
    "doj" TEXT,
    "effective_pay_commision" TEXT,
    "confirmation_order" TEXT,
    "pay_scale" DOUBLE PRECISION,
    "pay_band" DOUBLE PRECISION,
    "grade_pay" DOUBLE PRECISION,
    "doc" TEXT,
    "basic_pay" DOUBLE PRECISION,
    "conf_order_number" DOUBLE PRECISION,
    "deduction_type" TEXT,
    "conf_order_date" TEXT,
    "member_gis" TEXT,
    "appoint_authority" TEXT,
    "gis_account" DOUBLE PRECISION,
    "ulb" TEXT,
    "last_inc_order" TEXT,
    "name_of_service" TEXT,
    "last_inc_order_date" TEXT,
    "bank_name" TEXT,
    "wef_date" TEXT,
    "branch_name" TEXT,
    "pf_category" TEXT,
    "acc_number" TEXT,
    "ifsc" TEXT,
    "sen_grade_list" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_join_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_education_details" (
    "id" SERIAL NOT NULL,
    "edu_level" TEXT,
    "stream" TEXT,
    "board" TEXT,
    "passing_year" TEXT,
    "marks" INTEGER,
    "grade" TEXT,
    "upload_edu" TEXT,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_education_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_training_details" (
    "id" SERIAL NOT NULL,
    "name_of_training" TEXT,
    "training_type" TEXT,
    "name_of_inst" TEXT,
    "starting_from" JSONB,
    "end_to" JSONB,
    "tot_day_training" TEXT,
    "upload_edu" TEXT,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_training_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_timebound_details" (
    "id" SERIAL NOT NULL,
    "pay_scale" JSONB NOT NULL,
    "inc_amt" TEXT NOT NULL,
    "b_after_pay" TEXT NOT NULL,
    "vide_order_no" TEXT NOT NULL,
    "vide_order_date" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_timebound_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_loan_details" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_loan_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_loan" (
    "id" SERIAL NOT NULL,
    "loan_name_det" TEXT,
    "loan_account_num" TEXT,
    "sanc_order_num" TEXT,
    "dos" TEXT,
    "san_authority" TEXT,
    "dod" TEXT,
    "dis_treasury_name" TEXT,
    "voucher_date" TEXT,
    "treasury_voc_num" TEXT,
    "emp_loan_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_loan_Principal" (
    "id" SERIAL NOT NULL,
    "loan_name_principal" TEXT,
    "tot_amt_released" TEXT,
    "total_install" TEXT,
    "monthly_install" TEXT,
    "last_paid_install" TEXT,
    "month_last_install" TEXT,
    "total_amnt" DOUBLE PRECISION,
    "emp_loan_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_loan_Principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_loan_recovery" (
    "id" SERIAL NOT NULL,
    "loan_name_recovery" TEXT,
    "total_int_amount" TEXT,
    "total_install_recovery" TEXT,
    "monthly_install_recovery" TEXT,
    "last_paid_install_recovery" TEXT,
    "month_last_install_recovery" TEXT,
    "total_amnt_recovery" TEXT,
    "emp_loan_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_loan_recovery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT,
    "mobile" TEXT,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "user_type" TEXT,
    "ulb_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "suspended" BOOLEAN NOT NULL,
    "super_user" BOOLEAN,
    "description" TEXT,
    "remember_token" TEXT NOT NULL,
    "workflow_participant" BOOLEAN NOT NULL,
    "photo_relative_path" TEXT,
    "photo" TEXT,
    "sign_relative_path" TEXT,
    "signature" TEXT,
    "old_ids" INTEGER,
    "name" TEXT NOT NULL,
    "old_password" TEXT,
    "user_code" TEXT,
    "alternate_mobile" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wf_roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "is_suspended" BOOLEAN NOT NULL,
    "created_by" INTEGER NOT NULL,
    "stamp_date_time" TIMESTAMP(3),
    "old_ids" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "wf_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wf_roleusermaps" (
    "id" SERIAL NOT NULL,
    "wf_role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_suspended" BOOLEAN NOT NULL,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "wf_roleusermaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "designation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" SERIAL NOT NULL,
    "date" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_attendance_history" (
    "id" SERIAL NOT NULL,
    "emp_in" TEXT NOT NULL,
    "emp_out" TEXT,
    "date" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "lat" DOUBLE PRECISION,
    "lang" DOUBLE PRECISION,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_attendance_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_hierarchy" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "parent_emp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_hierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ulb" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ulb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indianstates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "indianstates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_emp_id_key" ON "employees"("emp_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_office_details_id_fkey" FOREIGN KEY ("emp_office_details_id") REFERENCES "employee_office_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_basic_details_id_fkey" FOREIGN KEY ("emp_basic_details_id") REFERENCES "employee_basic_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_personal_details_id_fkey" FOREIGN KEY ("emp_personal_details_id") REFERENCES "employee_personal_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_address_details_id_fkey" FOREIGN KEY ("emp_address_details_id") REFERENCES "employee_address_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_join_details_id_fkey" FOREIGN KEY ("emp_join_details_id") REFERENCES "employee_join_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_salary_details_id_fkey" FOREIGN KEY ("emp_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_family_details" ADD CONSTRAINT "employee_family_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_nominee_details" ADD CONSTRAINT "employee_nominee_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_increment_details" ADD CONSTRAINT "employee_increment_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_promotion_details" ADD CONSTRAINT "employee_promotion_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_salary_allow" ADD CONSTRAINT "employee_salary_allow_employee_salary_details_id_fkey" FOREIGN KEY ("employee_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_salary_deduction" ADD CONSTRAINT "employee_salary_deduction_employee_salary_details_id_fkey" FOREIGN KEY ("employee_salary_details_id") REFERENCES "employee_salary_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_join_details" ADD CONSTRAINT "employee_join_details_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_join_details" ADD CONSTRAINT "employee_join_details_designation_id_fkey" FOREIGN KEY ("designation_id") REFERENCES "designation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_education_details" ADD CONSTRAINT "employee_education_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_training_details" ADD CONSTRAINT "employee_training_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_timebound_details" ADD CONSTRAINT "employee_timebound_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan" ADD CONSTRAINT "employee_loan_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan_Principal" ADD CONSTRAINT "employee_loan_Principal_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_loan_recovery" ADD CONSTRAINT "employee_loan_recovery_emp_loan_details_id_fkey" FOREIGN KEY ("emp_loan_details_id") REFERENCES "employee_loan_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wf_roleusermaps" ADD CONSTRAINT "wf_roleusermaps_wf_role_id_fkey" FOREIGN KEY ("wf_role_id") REFERENCES "wf_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wf_roleusermaps" ADD CONSTRAINT "wf_roleusermaps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_attendance_history" ADD CONSTRAINT "employee_attendance_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_hierarchy" ADD CONSTRAINT "employee_hierarchy_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
