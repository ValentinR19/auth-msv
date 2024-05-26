import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn({ name: '_id', type: 'uuid', generated: true })
  id: string;

  @Column('string', { name: 'name' })
  name: string;

  @Column('string', { name: 'email' })
  email: string;

  @Column('string', { name: 'password' })
  password: string;
}
