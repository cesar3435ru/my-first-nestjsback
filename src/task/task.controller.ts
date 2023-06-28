import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task') //Es el nombre de la ruta para probar en Thunderclient
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('createTask')
  create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Get('allTasks')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('search')
  search(@Query('termino') termino:string){
   return this.taskService.buscar(termino);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  //Para buscar una tarea de acuerdo a su numero de importancia

  @Get('i/:important')
  find(@Param('important') important: number){
    return this.taskService.findImpo(+important);
  }

  
}
