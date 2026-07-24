import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@ApiTags('Projects & GIS Monitoring')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha qurilish ob\'ektlari ro\'yxati va AI progressini olish' })
  @ApiResponse({ status: 200, description: 'Barcha ob\'ektlar ro\'yxati' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('metrics/executive')
  @ApiOperation({ summary: 'Hokimiyat uchun ijro va KPI ko\'rsatkichlarini olish' })
  getExecutiveMetrics() {
    return this.projectsService.getExecutiveMetrics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Muayyan ob\'ekt bo\'yicha batafsil Sentinel AI ma\'lumotlarini olish' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
