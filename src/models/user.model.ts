import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import Event from './event.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true // Ensure email is unique
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @HasMany(() => Event)
  events!: Event[]; // One-to-many relationship with the Event model
}
