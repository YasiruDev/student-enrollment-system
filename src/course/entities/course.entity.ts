import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, default: null })
  title: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ nullable: true, default: null })
  maxCapacity: number;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
  enrollments: EnrollmentEntity[];
}
