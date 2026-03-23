const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.complianceTask.deleteMany();
  await prisma.client.deleteMany();

  await prisma.client.createMany({
    data: [
      {
        companyName: "Acme India Pvt Ltd",
        country: "India",
        entityType: "Private Limited",
      },
      {
        companyName: "BluePeak Consulting LLP",
        country: "India",
        entityType: "LLP",
      },
      {
        companyName: "Northstar Tech Solutions Pvt Ltd",
        country: "India",
        entityType: "Private Limited",
      },
      {
        companyName: "Vertex Global Services LLC",
        country: "UAE",
        entityType: "LLC",
      }
    ]
  });

  const clients = await prisma.client.findMany();

  for (const client of clients) {
    await prisma.complianceTask.createMany({
      data: [
        {
          clientId: client.id,
          title: "Monthly GST Return",
          description: "Prepare and file GST return for current month",
          category: "GST Filing",
          dueDate: new Date("2026-03-18"),
          status: "PENDING",
          priority: "HIGH"
        },
        {
          clientId: client.id,
          title: "Quarterly TDS Return",
          description: "Review and file TDS return",
          category: "TDS Return",
          dueDate: new Date("2026-03-25"),
          status: "IN_PROGRESS",
          priority: "HIGH"
        },
        {
          clientId: client.id,
          title: "Payroll Compliance Review",
          description: "Check payroll deductions and compliance",
          category: "Payroll Compliance",
          dueDate: new Date("2026-03-28"),
          status: "PENDING",
          priority: "MEDIUM"
        },
        {
          clientId: client.id,
          title: "Annual ROC Filing",
          description: "File annual ROC compliance documents",
          category: "ROC Filing",
          dueDate: new Date("2026-04-05"),
          status: "COMPLETED",
          priority: "LOW"
        },
        {
          clientId: client.id,
          title: "Income Tax Working Papers",
          description: "Prepare documentation for tax filing",
          category: "Income Tax",
          dueDate: new Date("2026-04-10"),
          status: "PENDING",
          priority: "MEDIUM"
        }
      ]
    });
  }

  console.log("Seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });