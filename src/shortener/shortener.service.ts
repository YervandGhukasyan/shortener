import { Injectable, Inject } from '@nestjs/common';
import { shorteners } from './shortener.model';
import { createHash } from 'crypto';
import * as process from 'process';

@Injectable()
export class ShortenerService {
  constructor(
    @Inject('SHORTENER_REPOSITORY')
    private model: typeof shorteners,
  ) {}

  async getAll() {
    const data = await this.model.findAll<shorteners>();
    const returnData = data.map((item) => {
      item.short = `${process.env.host}:${process.env.port || 3000}/short/${item.short}`;
      return item;
    });
    return returnData;
  }

  async getByShort(short) {
    const data = await this.model.findOne<shorteners>({
      where: { short },
    });
    return data;
  }

  async updateShort(id, data) {
    const returnData = await this.model.update<shorteners>(data, {
      where: { id },
    });
    return returnData;
  }

  async create(input, user_id) {
    try {
      const { url } = input;
      const shortCode = this.generateHash(url);
      const shortenedUrl = `${process.env.host}:${process.env.port || 3000}/short/${shortCode}`; // take from env
      const data = await this.model.create({
        url,
        short: shortCode,
        user_id,
      });

      return {
        url: shortenedUrl,
        data,
      };
    } catch (e) {
      console.log(e);
    }
  }

  update() {
    return 'Delete Shortener';
  }

  delete() {
    return 'Delete Shortener';
  }

  generateHash(url) {
    const hash = createHash('sha256');
    const timeNow = new Date();
    const random = Math.floor(Math.random() * 10);
    hash.update(`${url}-${random}-${timeNow}`);
    return hash.digest('hex').substring(0, Number(process.env.hash_length)); // Adjust the substring length as needed
  }
}
