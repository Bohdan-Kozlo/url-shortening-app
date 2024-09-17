import { IsUrl } from 'class-validator';

export class LongUrlDto {
  @IsUrl({}, { message: 'Invalid url' })
  longUrl: string;
}
