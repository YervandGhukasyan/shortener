import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class users extends Model<users> {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
