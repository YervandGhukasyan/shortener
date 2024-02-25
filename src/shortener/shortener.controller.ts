import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { InputDto } from './inputDto.dto';
import { AuthGuard } from '../auth/auth.guard';
import { REQUEST } from '@nestjs/core';

@Controller('short')
export class ShortenerController {
  constructor(private readonly shortener: ShortenerService) {}

  @Get(':path')
  async shortUrlRedirect(@Res() res, @Param('path') path: string) {
    const data = await this.shortener.getByShort(path);
    await this.shortener.updateShort(data.id, {
      visitCount: data.visitCount + 1,
    });
    const url = data.url?.includes('http') ? data.url : `https://${data.url}`;
    return res.redirect(url);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.shortener.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body(ValidationPipe) data: InputDto, @Req() req: any) {
    return this.shortener.create(data, req.user.id);
  }

  @Put()
  update() {
    return this.shortener.update();
  }

  @Delete()
  delete() {
    return this.shortener.delete();
  }
}
