import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';

import { Student } from '../student/student.entity';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './students-to-lesson.input';
import { LessonService } from './lesson.service';
import { StudentService } from '../student/student.service';
import { LessonType } from './lesson.type';

@Resolver(_of => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService, private readonly studentService: StudentService) {}

  @Query(_returns => [LessonType])
  getLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Query(_returns => LessonType)
  getLesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Mutation(__returns => LessonType)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(__returns => LessonType)
  assignStudentsToLesson(@Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
