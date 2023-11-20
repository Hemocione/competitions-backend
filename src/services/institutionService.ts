import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRankingByCompetitionId = async (
  competitionId: any
) => {
  const id = parseInt(competitionId);
  if (!Number.isInteger(id)) return [];

  const result = await prisma.$queryRaw`
    SELECT CAST(SUM("donation_count") as int) AS "donation_count",
           "teams"."institutionId" AS "id",
           MAX("institutions"."name") AS "name"
    FROM "competitionTeams"
    LEFT JOIN "teams" ON "competitionTeams"."teamId" = "teams"."id"
    LEFT JOIN "institutions" ON "teams"."institutionId" = "institutions"."id"
    WHERE "competitionId" = ${id}
    GROUP BY "teams"."institutionId"
    ORDER BY "donation_count" DESC
  `;

  return result;
};


export const createInstitution = async (name: string) => {
  const createdInstitution = await prisma.institutions.create({
    data: {
      name: name,
    },
  });

  return createdInstitution;
};

export const editInstitution = async (id: number, name: string) => {
  const institutionToEdit = await prisma.institutions.findUnique({
    where: { id: id },
  });

  if (!institutionToEdit) {
    throw new Error('Institution not found');
  }

  const updatedInstitution = await prisma.institutions.update({
    where: { id: id },
    data: {
      name: name,
    },
  });

  return updatedInstitution;
};


export const deleteInstitution = async (id: number) => {
  const deletedInstitution = await prisma.institutions.delete({
    where: { id: id },
  });

  return deletedInstitution;
};
