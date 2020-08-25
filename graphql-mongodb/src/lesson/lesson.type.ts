import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from '../student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(_type => [StudentType])
  students: string[];
}
