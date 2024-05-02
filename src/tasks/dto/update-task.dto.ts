import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { TTaskStatus } from 'src/constants/task.status';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Task 1',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'This is the first task',
  })
  @IsString()
  @IsOptional()
  description: string;

  // @ApiProperty({
  //   description: 'The status of the task',
  //   example: TTaskStatus.PENDING,
  // })
  // @IsString()
  // @IsOptional()
  // status: TTaskStatus;
}
