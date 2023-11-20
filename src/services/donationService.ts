import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerDonation = async (
  competitionId: number,
  competitionTeamId: number,
  user_name: string,
  user_email: string
) => {
  return await prisma.$transaction(async (prisma) => {
    const competitionTeam = await prisma.competitionTeams.findUnique({
      where: {
        competitionId_teamId: {
          teamId: competitionTeamId,
          competitionId: competitionId,
        },
      },
    });

    if (!competitionTeam) {
      throw new Error('CompetitionTeam not found');
    }

    const createdDonation = await prisma.donations.create({
      data: {
        user_name: user_name,
        user_email: user_email,
        competitionTeamId: competitionTeam.id,
        competitionId: competitionId,
      },
    });

    await prisma.competitionTeams.update({
      where: {
        id: competitionTeam.id,
      },
      data: {
        donation_count: {
          increment: 1,
        },
      },
    });

    return createdDonation;
  });
};
