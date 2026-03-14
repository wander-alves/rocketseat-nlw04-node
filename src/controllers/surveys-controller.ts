import type { Request, Response } from 'express';
import z from 'zod';
import { surveysRepositories } from '../database/repositories/surveys-repositories';

class SurveysController {
  async create(request: Request, response: Response) {
    const createSurveyBodySchema = z.object({
      title: z.string().min(3),
      description: z.string().min(5),
    });

    const { title, description } = createSurveyBodySchema.parse(request.body);

    const survey = surveysRepositories.create({
      title,
      description,
    });

    await surveysRepositories.save(survey);

    return response.status(201).json(survey);
  }

  async list(request: Request, response: Response) {
    const surveyParamsSchema = z.object({
      page: z.coerce.number().optional().default(1),
    });

    const { page } = surveyParamsSchema.parse(request.query);

    const surveys = await surveysRepositories.find({
      skip: (page - 1) * 10,
      take: 10,
    });

    return response.json(surveys);
  }
}

export { SurveysController };
