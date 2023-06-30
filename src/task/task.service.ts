import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository, Like } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskService {
  //El Repository es algo similar a un modelo en Laravel
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository <User>

  ) {

  }
  

  async create(createT: CreateTaskDto) {

    console.log(createT);
    const user = await this.userRepository.findOne({
      where: {id: createT.u_id}
    });
    console.log(user);
    const task = this.taskRepository.create({...createT, user: user
    });
    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    //Me trae todas las tareas
    const tasks = this.taskRepository.find();
    return tasks;
  }

  async findOne(id: number) {
    //Me trae solo una tarea
    const onlytask = await this.taskRepository.findOne({
      where: { id }
      //Cuando se llame igual el parametro pues se queda igual. En este caso se llama id por eso se queda igual
    });
    if (!onlytask) {
      throw new BadRequestException("Task did not found"); //Es una forma mejor
    }
    return onlytask;
  }


  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    const existingTask = await this.taskRepository.findOne({ where: { id } });

    if (!existingTask) {
      throw new NotFoundException(`Not found ID ${id}`);
    }
    return existingTask;
  }


  async remove(id: number) {
    await this.taskRepository.delete(id);
  }

  async buscar(termino: string) {
    const tasks = await this.taskRepository.find(
      {
        where: {
          title: Like(`%${termino}%`)
        }
      });
    return tasks;
  }


  async findImpo(important: number){
    const tasks = await this.taskRepository.find({where: {important}});
    if (!tasks){
      throw new NotFoundException(`Not found level of importance ${important}`);

    }
    return tasks;
  }


}
