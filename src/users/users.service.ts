import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';



//npm install bcryptjs

@Injectable()
export class UsersService {
  //El Repository es algo similar a un modelo en Laravel
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtS: JwtService
  ) {

  }
  async create(createU: CreateUserDto) {
    try {
      const { password, ...userData } = createU;
      const user = this.userRepository.create({
        ...userData, //Trae el objeto completo con sus propiedades
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user }
    } catch (error) {
      return error.detail
    }
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    //Me trae solo una tarea
    const onlyuser = await this.userRepository.findOne({
      relations: ['tasks'], where: { id }
      //Cuando se llame igual el parametro pues se queda igual. En este caso se llama id por eso se queda igual
    });
    if (!onlyuser) {
      throw new BadRequestException("User did not found"); //Es una forma mejor
      // return {msn: 'No encontrado'}
    }
    return onlyuser;
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   await this.userRepository.update(id, updateUserDto);
  //   const userExists = await this.userRepository.findOne({ where: { id } });

  //   if (!userExists) {
  //     throw new NotFoundException(`Not found ID ${id}`);
  //   }
  //   return userExists;
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const userExists = await this.userRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return userExists;
  }







  async remove(id: number) {
    const deleteResult = await this.userRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      message: `User with ID ${id} has been successfully deleted`
    };
  }

  async login(user: LoginDto){
    const {password, email}=user;
    const userFind = await this.userRepository.findOne({
      // where: {email}, select :{password: true, edad: true, email:true, nombre:true, apellidos:true, estado:true}
      where: {email}, select :{id:true, password: true, edad: true, email: true, nombre: true, apellidos: true, estado: true, sexo:true, tasks:true }
    })
    if(!userFind){ // No existe el correo en la base de datos
      throw new UnauthorizedException('Credenciales no validas');
    }
    if(!bcrypt.compareSync(password, userFind.password)){ //Compara las contraseñas porque el correo si existe
      throw new UnauthorizedException('Credenciales no validas');
    }

    delete userFind.password;
    return {
      ...userFind,
      myToken: this.getJWToken({id:userFind.id,nombre:userFind.nombre, apellidos:userFind.apellidos })
      
    }

    // console.log(userFind);
    // return userFind;
    
  }

  private getJWToken(payload:{id: number, nombre:string, apellidos:string}){
    const token = this.jwtS.sign(payload);
    return token;
  }


  validaTo(token: any){

    console.log(token);
    
    try{
      this.jwtS.verify(token.token,{secret: 'cesarpassw'});
      return true;
    }catch(error){
      throw new UnauthorizedException('Token invalid');

    }
  }

}
