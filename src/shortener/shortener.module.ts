import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { shortenerProviders } from './shortener.providers';

@Module({
  imports: [],
  controllers: [ShortenerController],
  providers: [ShortenerService, ...shortenerProviders],
})
export class ShortenerModule {}
