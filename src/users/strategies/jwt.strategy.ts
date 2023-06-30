import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userR: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: 'cesarpassw',
    });
  }

  async validate(payload: { id: number, nombre: string, apellidos: string }): Promise<User> {
    const { id } = payload;
    const user = await this.userR.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException("Token no valido");

    }
    if (!user.estado) {
      throw new UnauthorizedException("No activo");
    }

    return user;
  }
}