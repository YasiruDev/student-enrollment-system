import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('administrator')
export class AdminEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  email: string;

  @Column({ nullable: true, default: null })
  password: string;

  @Column({ nullable: true, default: null })
  token: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
