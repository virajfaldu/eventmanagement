import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import  User from './user.model';

@Table
export default class Event extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING
  })
  images!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  endDate!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  totalGuests?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
