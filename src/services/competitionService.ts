import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// status 3 = draft, 2 = ativo, 1 = upcoming, 0 = finalizado
const statusCaseWhenClause = `
CASE
  WHEN NOT published AND publication_date IS NULL THEN 3
  WHEN CURRENT_TIMESTAMP > end_at THEN 0
  WHEN CURRENT_TIMESTAMP < start_at THEN 1
  ELSE 2
END`

export const getCompetitions = async (includeUnpublished = false) => {

  console.log(includeUnpublished)
  const competitions = await prisma.$queryRaw`SELECT
    id,
    name,
    start_at,
    end_at,
    CASE
      WHEN NOT published AND publication_date IS NULL THEN 3
      WHEN CURRENT_TIMESTAMP > end_at THEN 0
      WHEN CURRENT_TIMESTAMP < start_at THEN 1
      ELSE 2
    END as status
    FROM Competitions
    WHERE
      CASE
        WHEN ${includeUnpublished} THEN true
        ELSE published = true
      END
    ORDER BY status DESC, end_at DESC`;

  return competitions;
}; 

export const getCompetition = async (id: number) => {
  
  const competition = await prisma.$queryRaw`SELECT
    id,
    name,
    CASE
      WHEN NOT published AND publication_date IS NULL THEN 3
      WHEN CURRENT_TIMESTAMP > end_at THEN 0
      WHEN CURRENT_TIMESTAMP < start_at THEN 1
      ELSE 2
    END as status
    FROM Competitions
    WHERE id = ${id}`;

  return competition;
};


export const getCompetitionRanking = async (competitionId: number) => {
  const result = await prisma.competitionTeams.findMany({
    where: {
      competitionId: competitionId,
    },
    select: {
      teamId: true,
      donation_count: true,
      teams: { select: { name: true } },
    },
    orderBy: {
      donation_count: 'desc',
    },
  });

  return result;
};


export const createCompetition = async (
  name: string,
  startsAt: Date,
  endsAt: Date
) => {
  return await prisma.competitions.create({
    data: {
      name,
      start_at: startsAt,
      end_at: endsAt,
      published: false,
    },
  });
};

export const editCompetition = async (
  id: number,
  name: string,
  startsAt: Date,
  endsAt: Date
) => {
  return await prisma.$transaction(async (prisma) => {
    const competitionToEdit = await prisma.competitions.findUnique({
      where: { id: id },
    });

    if (!competitionToEdit) {
      throw new Error('Competition not found');
    }

    const updatedCompetition = await prisma.competitions.update({
      where: { id: id },
      data: {
        name,
        start_at: startsAt,
        end_at: endsAt,
      },
    });

    return updatedCompetition;
  });
};

export const deleteCompetition = async (id: number) => {
  return await prisma.$transaction(async (prisma) => {
    const deletedCompetition = await prisma.competitions.delete({
      where: { id: id },
    });

    return deletedCompetition;
  });
};
