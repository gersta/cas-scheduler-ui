import { BlockDto } from './block.dto';

export interface LectureDto {

  lectureCode: string;
  name: string;
  blocks: BlockDto[];

}
