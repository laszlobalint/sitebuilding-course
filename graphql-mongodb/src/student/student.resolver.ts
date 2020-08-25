import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';

@Resolver(_of => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(_returns => [StudentType])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query(_returns => StudentType)
  getStudent(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudent(id);
  }

  @Mutation(_returns => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
