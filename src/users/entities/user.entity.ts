import { Task } from "src/task/entities/task.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";//Se deben importar las cosas a utilizar
@Entity('user')
//Se definen las propiedades de la tabla
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column('text')
    nombre: string
    @Column('text')
    apellidos: string
    @Column('text', { unique: true })
    email: string
    @Column('text', { select: false })
    password: string
    @Column('bool', { default: true })
    estado: boolean
    @Column('text')
    sexo: string
    @Column('int', { nullable: true })
    edad: number

    //Relacionar Tareas(tasks) con Usuarios (users)
    @OneToMany(() => Task, (t) => t.user)
    tasks: Task[]
}
