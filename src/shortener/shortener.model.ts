import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class shorteners extends Model<shorteners> {
  @Column
  url: string;

  @Column
  short: string;

  @Column
  user_id: number;

  @Column
  visitCount: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
