import { Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn({ name: '_id', type: 'uuid' })
  id: string;

  email: string;

  password: string;
}
