import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlService {
  private readonly BASE_URL = 'http://localhost:3000/api/url/';

  constructor(
    @InjectRepository(UrlEntity) private urlRepository: Repository<UrlEntity>,
  ) {}

  async findUrlByShortUrl(shortUrl: string) {
    const newShortUrl = `${this.BASE_URL}${shortUrl}`;
    console.log(newShortUrl);
    const urlEntity = await this.urlRepository.findOne({
      where: { shortUrl: newShortUrl },
    });
    console.log(urlEntity);
    if (!urlEntity) {
      throw new BadRequestException('Url not found');
    }
    return urlEntity.longUrl;
  }

  async generateShortUrl(longUrl: string) {
    const existingUrl = await this.urlRepository.findOne({
      where: { longUrl },
    });

    if (existingUrl) {
      return existingUrl.shortUrl;
    }

    const randomString = this.generateStringOfLength(6);
    const shortUrl = `${this.BASE_URL}${randomString}`;
    const urlEntity = this.urlRepository.create({ longUrl, shortUrl });
    await this.urlRepository.save(urlEntity);
    return shortUrl;
  }

  private generateStringOfLength(length: number) {
    const uuid = uuidv4().replace(/-/g, '');

    if (uuid.length >= length) {
      return uuid.slice(0, length);
    }

    let result = uuid;
    while (result.length < length) {
      result += uuidv4().replace(/-/g, '');
    }
    return result.slice(0, length);
  }
}
