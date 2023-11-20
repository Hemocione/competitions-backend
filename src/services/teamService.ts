
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();import { NotFoundError, Unexpected } from '../errors'

export const createTeam = async (name: string, institutionId: number) => {
  const duplicatedTeam = await prisma.teams.findFirst({
    where: { institutionId, name }, // Não poderíamos olhar apenas o name e não o institutuin ID
  }); 

  if (duplicatedTeam) {
    throw new Error(`O nome '${name}' já está sendo utilizado`);
  }

  const createdTeam = await prisma.teams.create({
    data: {
      name: name,
      institutionId: institutionId,
    },
  });

  return createdTeam;
};


export const editTeam = async (
  name: string,
  id: number,
  institutionId: number
) => {
  const duplicatedTeam = await prisma.teams.findFirst({
    where: { name },
  });

  if (duplicatedTeam) {
    throw new Unexpected(`O nome '${name}' já está sendo utilizado`);
  }

  const teamToEdit = await prisma.teams.findUnique({
    where: { id: id, institutionId: institutionId },
  });

  if (!teamToEdit) {
    throw new NotFoundError('Time não encontrado');
  }

  const updatedTeam = await prisma.teams.update({
    where: { id: id, institutionId: institutionId },
    data: {
      name: name,
    },
  });

  return updatedTeam;
};

export const deleteTeam = async (id: number, institutionId: number) => {
  const deletedTeam = await prisma.teams.delete({
    where: { id: id, institutionId: institutionId },
  });

  return deletedTeam;
};

export const assignTeamToCompetition = async (
  teamId: number,
  competitionId: number
) => {
  const createdCompetitionTeam = await prisma.competitionTeams.create({
    data: {
      teamId: teamId,
      competitionId: competitionId,
      donation_count: 0,
    },
  });

  return createdCompetitionTeam;
};

export const unassignTeamFromCompetition = async (
  teamId: number,
  competitionId: number
) => {
  try {
    const deletedCompetitionTeam = await prisma.competitionTeams.delete({
      where: {
        competitionId_teamId: {
          teamId: teamId,
          competitionId: competitionId,
        },
      },
    });

    return deletedCompetitionTeam;
  } catch (error) {
    console.error(error);
    // Handle the error as needed
    throw error;
  }
};
