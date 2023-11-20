import express from "express";
import { Unexpected } from "../../errors";
import funcWrapper from "../../helpers/funcWrapper";
import auth from "../../middlewares/auth";
import validateRoles from "../../middlewares/validateRoles";
import {
  createInstitution,
  editInstitution,
  deleteInstitution,
} from "../../services/institutionService";


import { createTeam, editTeam, deleteTeam } from "../../services/teamService";



const router = express.Router();

router.post(
  "/",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {
    const { name } = context.req.body;

    if (!name) throw new Unexpected("Bad Request!");

    const result = await createInstitution(name);

    return result;
  })
);

router.put(
  "/:id",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {

    const id = parseInt(context.req.params.id);
    const { name } = context.req.body;

    if (!name) throw new Unexpected("Bad Request!");

    const result = await editInstitution(id, name);

    return result;
  })
);

router.delete(
  "/:id",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {
    const id = parseInt(context.req.params.id);

    const result = await deleteInstitution(id);

    return result;
  })
);

router.post(
  "/:institutionId/teams",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {
    const { name } = context.req.body;
    const institutionId = parseInt(context.req.params.institutionId);

    if (!institutionId || !Number.isInteger(institutionId))
      throw new Unexpected("Bad Request!");

    if (!name) throw new Unexpected("Bad Request!");

    //TODO: Validate if name is unique

    const result = await createTeam(name, institutionId); 

    return result;
  })
);

router.put(
  "/:institutionId/teams/:teamId",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {
    const { name } = context.req.body;
    const institutionId = parseInt(context.req.params.institutionId);
    const teamId = parseInt(context.req.params.teamId);

    if (!institutionId || !Number.isInteger(institutionId))
      throw new Unexpected("Bad Request!");

    if (!teamId || !Number.isInteger(teamId))
      throw new Unexpected("Bad Request!");

    if (!name) throw new Unexpected("Bad Request!");

    const result = await editTeam(name, teamId, institutionId);

    return result;
  })
);

router.delete(
  "/:institutionId/teams/:teamId",
  auth,
  validateRoles(["admin"]),
  funcWrapper(async (context) => {
    const institutionId = parseInt(context.req.params.institutionId);
    const teamId = parseInt(context.req.params.teamId);

    if (!teamId || !Number.isInteger(teamId))
      throw new Unexpected("Bad Request!");

    if (!institutionId || !Number.isInteger(institutionId))
      throw new Unexpected("Bad Request!");

    const result = await deleteTeam(teamId, institutionId); // TODO É PRECISO VER COMO PASSAR AS MENSAGENS DE ERRO POR NÃO ACHAR UM TIME

    return result;
  })
);

export default { url: "/v1/institutions", router };
