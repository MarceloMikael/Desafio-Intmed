import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { CadastroDto } from './dto/cadastro.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async cadastrar(cadastroDto: CadastroDto) {
    const existente = await this.usuarioRepository.findOne({
      where: { email: cadastroDto.email },
    });

    if (existente) {
      throw new ConflictException('Email já cadastrado!');
    }

    const senhaHash = await bcrypt.hash(cadastroDto.senha, 10);

    const usuario = this.usuarioRepository.create({
      nome: cadastroDto.nome,
      email: cadastroDto.email,
      senha: senhaHash,
    });

    const savedUsuario = await this.usuarioRepository.save(usuario);

    return {
      id: savedUsuario.id,
      nome: savedUsuario.nome,
      email: savedUsuario.email,
    };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválido!');
    }

    const senhaCorreta = await bcrypt.compare(loginDto.senha, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Email ou senha inválido!');
    }

    const payload = { id: usuario.id, email: usuario.email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '45m',
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      expiresIn: 45 * 60,
    };
  }
}

