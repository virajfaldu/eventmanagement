import { Request, Response } from 'express';
import  Event  from '../models/event.model';
import User  from '../models/user.model';
import { Op } from 'sequelize';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate, totalGuests } = req.body;
    const images = "";

    const event = await Event.create({
      name,
      description,
      startDate,
      endDate,
      images,
      totalGuests,
      userId: (req as any).user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id, { include: [User] });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event || event.userId !== (req as any).user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, startDate, endDate, totalGuests } = req.body;
    const images = "";

    event.name = name;
    event.description = description;
    event.startDate = startDate;
    event.endDate = endDate;
    event.images = images || event.images;
    event.totalGuests = totalGuests;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// src/controllers/event.controller.ts
export const getEvents = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;
  const sort = req.query.sort as string || 'startDate';
  const order = (req.query.order as string || 'ASC').toUpperCase();
  
  const name = req.query.name as string;
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const search = req.query.search as string; // Search keyword

  const where: any = {};

  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (startDate) where.startDate = { [Op.gte]: new Date(startDate) };
  if (endDate) where.endDate = { [Op.lte]: new Date(endDate) };
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } }
    ];
  }

  try {
    const events = await Event.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sort, order]]
    });

    res.json({
      total: events.count,
      page,
      limit,
      data: events.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};


export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event || event.userId !== (req as any).user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.destroy();
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
