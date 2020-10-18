import { BlockDto } from './BlockDto';

export interface LectureDto {

  lectureCode: string;
  name: string;
  blocks: BlockDto[];

}
