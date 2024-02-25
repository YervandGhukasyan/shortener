import { IsUrl } from 'class-validator';

export class InputDto {
  @IsUrl()
  url: string;
}
