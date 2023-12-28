import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apisService.create(createApiDto);
  }

  @Get()
  findAll() {
    return this.apisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apisService.update(+id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apisService.remove(+id);
  }
}
