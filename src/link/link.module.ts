import { Module } from '@nestjs/common';
import { LinkService } from './link.service.js';

@Module({
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
