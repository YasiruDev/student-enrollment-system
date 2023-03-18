import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EnrollmentEntity } from '../../course/entities/enrollment.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, default: null })
  name: string;

  @Column({ nullable: true, default: null })
  email: string;

  @Column({ nullable: true, default: null })
  password: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany((type) => EnrollmentEntity, (enrollment) => enrollment.student)
  enrollments: EnrollmentEntity[];
}
