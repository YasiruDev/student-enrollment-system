import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '../../student/entities/student.entity';
import { CourseEntity } from './course.entity';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true, default: null })
  studentId: number;

  @Column({ nullable: true, default: null })
  courseId: number;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true, type: 'timestamp' })
  enrolledDate: Date;

  @Column({ nullable: true, type: 'timestamp' })
  dropedDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => CourseEntity, (course) => course.enrollments)
  course: CourseEntity;

  @ManyToOne((type) => StudentEntity, (student) => student.enrollments)
  student: StudentEntity;
}
