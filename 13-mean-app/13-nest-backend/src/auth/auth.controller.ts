import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // TODO: you should protect this route
  @UseGuards(AuthGuard)
  @Get()
  findAll( @Request() req: Request ) {
    //console.log(req);
    const user = req['user'];
    //return user;
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('login')
  login ( @Body() loginUserDto: LoginUserDto ) {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register( @Body() registerUserDto: RegisterUserDto ) {
    return this.authService.register(registerUserDto);
  }

  // En teoria esto es un refres token prologaremos la vida del token
  @UseGuards(AuthGuard)
  @Get('check-token')
  verifyToken ( @Request() req: Request ): LoginResponse {
    const user = req['user'] as User;
    return {
      user,
      token: this.authService.getJwt({id: user._id})
    };
  }
}
