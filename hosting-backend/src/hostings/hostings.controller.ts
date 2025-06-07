import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';

@Controller('hostings')
export class HostingsController {
  constructor(private readonly hostingsService: HostingsService) {}

  @Get("by-workplace-id")
  async findAll(@Query("workplaceId") workplaceId: number) {
    return this.hostingsService.findByWorkplaceId(workplaceId);
  }

  @Get("by-hosting-id")
  async findOne(@Query("hostingId") hostingId: number, @Query("workplaceId") workplaceId: number) {
    return this.hostingsService.findOneById(hostingId, workplaceId);
  }

  @Get("containers/by-hosing-id")
  async getContainersByHostingId(@Query("hostingId") hostingId: number) {
    return 
  }

  @Post("create")
  async create(@Body() dto: CreateHostingDto) {
    return this.hostingsService.create(dto);
  }
}
