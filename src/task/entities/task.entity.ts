import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";//Se deben importar las cosas a utilizar
@Entity('task')
//Se definen las propiedades de la tabla
export class Task {
    @PrimaryGeneratedColumn()
    id: number
    @Column('text')
    title: string
    @Column('text')
    description: string
    @Column('bool', { default: false })
    estate: boolean
    @Column()
    important: number

    //Relacionar muchas tareas a un usuario
    @ManyToOne(() => User, (u) => u.tasks)
    user: User

}


