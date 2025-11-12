import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastroDto } from './dto/cadastro.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastro')
  @HttpCode(HttpStatus.CREATED)
  async cadastrar(@Body() cadastroDto: CadastroDto) {
    const usuario = await this.authService.cadastrar(cadastroDto);
    return {
      message: 'Usuário cadastrado com sucesso!',
      usuario,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: 'Login realizado com sucesso!',
      ...result,
    };
  }
}

