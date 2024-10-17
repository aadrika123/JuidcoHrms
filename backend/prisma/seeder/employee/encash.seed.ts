import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function leave_encash_seed() {
  try {
    // Check if the view exists in the system catalog
    const viewExists = await prisma.$queryRawUnsafe<Array<{ exists: boolean }>>(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.views 
        WHERE table_name = 'view_leave_encash'
      );
    `);

    // If view already exists, skip creation
    if (viewExists[0]?.exists) {
      console.log("View 'view_leave_encash' already exists, skipping creation.");
      return;
    }

    // If view does not exist, create it
    await prisma.$executeRawUnsafe(`
      CREATE VIEW view_leave_encash
      AS
      SELECT emp.emp_id,
          ebd.emp_name,
          ejd.basic_pay,
          COALESCE(elc.earned_leave, 0) AS earned_leave,
          COALESCE(le.total_days_for_applied, 0::bigint)::numeric AS total_days_for_applied,
          COALESCE(COALESCE(elc.earned_leave, 0) - COALESCE(le.total_days_for_applied, 0::bigint), 0::bigint)::numeric AS leave_balance,
          round((ejd.basic_pay / 26::double precision)::numeric, 2) AS per_leave_encash_amount
      FROM employees emp
          LEFT JOIN employee_basic_details ebd ON ebd.id = emp.emp_basic_details_id
          LEFT JOIN employee_join_details ejd ON ejd.id = emp.emp_join_details_id
          LEFT JOIN employee_leave_chart elc ON elc.employee_id = emp.emp_id
          LEFT JOIN (
              SELECT leave_encashment.employee_id,
                  sum(leave_encashment.total_days_for_applied) AS total_days_for_applied
              FROM leave_encashment
              WHERE leave_encashment.status = ANY (ARRAY[0, 1])
              GROUP BY leave_encashment.employee_id
          ) le ON le.employee_id = emp.emp_id;
    `);

    console.log("View 'view_leave_encash' created successfully.");
  } catch (error) {
    console.error("Error creating view_leave_encash:", error);
  }
}
