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
    "ulb_id" INTEGER NOT NULL DEFAULT 2,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "employee_office_details" (
    "id" SERIAL NOT NULL,
    "emp_type" INTEGER NOT NULL,
    "office_name" TEXT,
    "office_code" TEXT,
    "ddo_designation" TEXT,
    "ddo_code" TEXT,
    "district" INTEGER,
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
    "mode_of_recruitment" TEXT,
    "contact_no" TEXT NOT NULL,
    "emg_contact_no" TEXT NOT NULL,
    "aadhar_no" TEXT NOT NULL,
    "epic_no" TEXT NOT NULL,
    "pan_no" TEXT,
    "gender" TEXT NOT NULL,
    "pran" TEXT,
    "weight" TEXT,
    "height" TEXT,
    "cps" TEXT,
    "gps" TEXT NOT NULL,
    "email" TEXT,
    "emp_type" INTEGER NOT NULL,
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
    "emp_district" INTEGER,
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
    "emp_lang" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_personal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_family_details" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "relation" TEXT,
    "dob" TEXT,
    "dependent" TEXT,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_family_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_nominee_details" (
    "id" SERIAL NOT NULL,
    "nominee_name" TEXT,
    "relation" TEXT,
    "percentage" DOUBLE PRECISION,
    "address" TEXT,
    "minor" TEXT,
    "employee_id" TEXT NOT NULL,
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
    "district" INTEGER,
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
    "scale" TEXT,
    "inc_date" TEXT,
    "inc_amount" DOUBLE PRECISION,
    "basic_pay_after_inc" DOUBLE PRECISION,
    "vide_order_no" TEXT,
    "vide_order_date" TEXT,
    "esic_deduct_for_current_year" BOOLEAN,
    "esic_stop_next_year" BOOLEAN,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_increment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_promotion_details" (
    "id" SERIAL NOT NULL,
    "designation" JSONB,
    "scale" JSONB,
    "vide_order_no" TEXT,
    "vide_order_date" TEXT,
    "transfer" TEXT,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_promotion_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_transfer_details" (
    "id" SERIAL NOT NULL,
    "designation" JSONB,
    "office" JSONB,
    "join_date" TEXT,
    "vide_order_no" TEXT,
    "vide_order_date" TEXT,
    "transfer_after_prom" TEXT,
    "employees_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_transfer_details_pkey" PRIMARY KEY ("id")
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
    "name" TEXT,
    "wfe_date" TEXT,
    "selected_option" TEXT,
    "amount_in" DOUBLE PRECISION,
    "employee_salary_details_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_salary_allow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_salary_deduction" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "wfe_date" TEXT,
    "acnt_no" TEXT,
    "amount_in" DOUBLE PRECISION,
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
    "conf_order_number" TEXT,
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
    "pay_scale" JSONB,
    "inc_amt" TEXT,
    "b_after_pay" TEXT,
    "vide_order_no" TEXT,
    "vide_order_date" TEXT,
    "remarks" TEXT,
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
CREATE TABLE "employee_type_master" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_type_master_pkey" PRIMARY KEY ("id")
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
    "emp_in" TIMESTAMP(3),
    "emp_out" TIMESTAMP(3),
    "date" DATE NOT NULL,
    "lat" DOUBLE PRECISION,
    "lang" DOUBLE PRECISION,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_attendance_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_daily_attendance" (
    "id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "emp_in" TIMESTAMP(3),
    "emp_out" TIMESTAMP(3),
    "working_hour" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_daily_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_hierarchy" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "parent_emp" TEXT NOT NULL,
    "supervisor_level" TEXT,
    "immediate_supervisor" TEXT,
    "task" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_hierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_claim" (
    "id" SERIAL NOT NULL,
    "employees_id" TEXT NOT NULL,
    "claimType" TEXT NOT NULL,
    "orderNo" TEXT,
    "fromDate" TIMESTAMP(3),
    "toDate" TIMESTAMP(3),
    "travelExpenses" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "foodExpenses" DOUBLE PRECISION,
    "totalAmount" DOUBLE PRECISION,
    "hotelExpenses" DOUBLE PRECISION,
    "description" TEXT,
    "location" TEXT,
    "witnessInformation" TEXT,
    "supervisorSelection" TEXT,
    "thirdPartyInformation" TEXT,
    "claimSupervisor" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "thirdPartyStatus" INTEGER NOT NULL DEFAULT 0,
    "travelExpenseAttachment" TEXT,
    "foodExpensesAttachment" TEXT,
    "hotelExpenseAttachment" TEXT,
    "descriptionAttachment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_leave_details" (
    "id" SERIAL NOT NULL,
    "emp_leave_type_id" INTEGER NOT NULL,
    "leave_from" TEXT,
    "leave_to" TEXT,
    "total_days" DOUBLE PRECISION,
    "leave_reason" TEXT,
    "file_upload" TEXT,
    "half_day" BOOLEAN,
    "leave_status" INTEGER NOT NULL DEFAULT 0,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_leave_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_leave_chart" (
    "id" SERIAL NOT NULL,
    "tot_leave_allow_year" INTEGER,
    "tot_bal_leave_year" DOUBLE PRECISION,
    "tot_prev_leave_approv" DOUBLE PRECISION,
    "sick_leave" DOUBLE PRECISION DEFAULT 20,
    "earned_leave" DOUBLE PRECISION DEFAULT 10,
    "personal_leave" DOUBLE PRECISION DEFAULT 30,
    "commuted_leave" DOUBLE PRECISION DEFAULT 20,
    "leave_not_due" DOUBLE PRECISION DEFAULT 10,
    "extraordinary_leave" DOUBLE PRECISION DEFAULT 10,
    "privileged_leave" DOUBLE PRECISION DEFAULT 10,
    "leave_entitlements_for_vacation" DOUBLE PRECISION DEFAULT 20,
    "leave_on_adoption" DOUBLE PRECISION DEFAULT 10,
    "leave_to_female_on_adoption" DOUBLE PRECISION DEFAULT 10,
    "child_care_leave" DOUBLE PRECISION DEFAULT 10,
    "wrill" DOUBLE PRECISION DEFAULT 20,
    "special_leave_on_enquiry" DOUBLE PRECISION DEFAULT 10,
    "study_leave" DOUBLE PRECISION DEFAULT 10,
    "ad_hoc_employees" DOUBLE PRECISION DEFAULT 10,
    "leave_salary" DOUBLE PRECISION DEFAULT 10,
    "special_casual_leave" DOUBLE PRECISION DEFAULT 10,
    "paternity_leave" DOUBLE PRECISION DEFAULT 10,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_leave_chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_leave_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_leave_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave_encashment" (
    "id" SERIAL NOT NULL,
    "application_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "emp_name" TEXT,
    "earned_leave" DOUBLE PRECISION DEFAULT 0,
    "total_days_for_applied" INTEGER DEFAULT 0,
    "leave_balance_after_apply" INTEGER DEFAULT 0,
    "per_basic_pay" INTEGER DEFAULT 0,
    "grand_total_encashment_amount" INTEGER DEFAULT 0,
    "leave_encash_apply" INTEGER NOT NULL,
    "status" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_encashment_pkey" PRIMARY KEY ("id")
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
    "state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ddo" (
    "id" SERIAL NOT NULL,
    "treasury_name" TEXT NOT NULL,
    "ddo_code" TEXT NOT NULL,
    "ddo_name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "office" TEXT NOT NULL,

    CONSTRAINT "ddo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileUpload" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mimeType" TEXT,
    "buffer" BYTEA,
    "size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,

    CONSTRAINT "fileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fileUploadEmp" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "mimeType" TEXT,
    "buffer" BYTEA,
    "size" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" TEXT,

    CONSTRAINT "fileUploadEmp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payroll_master" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "emp_name" TEXT NOT NULL,
    "gross_pay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grade_pay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "leave_days" INTEGER NOT NULL DEFAULT 0,
    "working_hour" INTEGER NOT NULL DEFAULT 0,
    "total_allowance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_deductions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "non_billable_days" INTEGER NOT NULL DEFAULT 0,
    "present_days" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lwp_days" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "salary_deducted" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "net_pay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "last_month_lwp_deduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "salary_per_day" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lwp_days_last_month" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epf_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epf_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "esic_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "esic_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "eps_employer_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tds_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "basic_pay" DOUBLE PRECISION DEFAULT 0,
    "status" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "billable_days" INTEGER NOT NULL DEFAULT 0,
    "sundays" INTEGER NOT NULL DEFAULT 0,
    "holidays" INTEGER NOT NULL DEFAULT 0,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payroll_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pension_master" (
    "id" SERIAL NOT NULL,
    "beneficery_id" INTEGER NOT NULL,
    "emp_id" TEXT NOT NULL,
    "emp_name" TEXT,
    "emp_department" INTEGER,
    "doj" TEXT,
    "last_working_day" TEXT,
    "status" TEXT,
    "pension_amnt" DOUBLE PRECISION,
    "family_pension_amnt" DOUBLE PRECISION,
    "date_of_death" DATE,
    "summary" TEXT,
    "communi_sent_acc_officer" TEXT,
    "pensioncol" TEXT,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "signature_doc_1" TEXT,
    "signature_doc_2" TEXT,
    "signature_doc_3" TEXT,
    "photo_doc_1" TEXT,
    "photo_doc_2" TEXT,
    "photo_doc_3" TEXT,
    "nom_name" TEXT,
    "nom_age" INTEGER,
    "nom_relation" TEXT,
    "nom_address" TEXT,
    "payment_order_no" TEXT,
    "guardian_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pension_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areer_and_adjustment" (
    "id" SERIAL NOT NULL,
    "emp_id" TEXT NOT NULL,
    "areers" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "adjustment" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "remarks" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areer_and_adjustment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_emp_id_key" ON "employees"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_hierarchy_emp_id_key" ON "employee_hierarchy"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "leave_encashment_application_id_key" ON "leave_encashment"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "payroll_master_emp_id_month_year_key" ON "payroll_master"("emp_id", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "pension_master_emp_id_key" ON "pension_master"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "areer_and_adjustment_emp_id_key" ON "areer_and_adjustment"("emp_id");

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
ALTER TABLE "employee_basic_details" ADD CONSTRAINT "employee_basic_details_emp_type_fkey" FOREIGN KEY ("emp_type") REFERENCES "employee_type_master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_family_details" ADD CONSTRAINT "employee_family_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_nominee_details" ADD CONSTRAINT "employee_nominee_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_increment_details" ADD CONSTRAINT "employee_increment_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_promotion_details" ADD CONSTRAINT "employee_promotion_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_transfer_details" ADD CONSTRAINT "employee_transfer_details_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "employee_attendance_history" ADD CONSTRAINT "employee_attendance_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_daily_attendance" ADD CONSTRAINT "employee_daily_attendance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_hierarchy" ADD CONSTRAINT "employee_hierarchy_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_hierarchy" ADD CONSTRAINT "employee_hierarchy_parent_emp_fkey" FOREIGN KEY ("parent_emp") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_claim" ADD CONSTRAINT "employee_claim_employees_id_fkey" FOREIGN KEY ("employees_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_leave_details" ADD CONSTRAINT "employee_leave_details_emp_leave_type_id_fkey" FOREIGN KEY ("emp_leave_type_id") REFERENCES "employee_leave_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_leave_details" ADD CONSTRAINT "employee_leave_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_leave_chart" ADD CONSTRAINT "employee_leave_chart_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave_encashment" ADD CONSTRAINT "leave_encashment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fileUpload" ADD CONSTRAINT "fileUpload_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fileUploadEmp" ADD CONSTRAINT "fileUploadEmp_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("emp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payroll_master" ADD CONSTRAINT "payroll_master_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pension_master" ADD CONSTRAINT "pension_master_beneficery_id_fkey" FOREIGN KEY ("beneficery_id") REFERENCES "employee_nominee_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pension_master" ADD CONSTRAINT "pension_master_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "areer_and_adjustment" ADD CONSTRAINT "areer_and_adjustment_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE;
