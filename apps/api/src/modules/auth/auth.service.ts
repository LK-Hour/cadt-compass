import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, UpdateProfileDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, studentId } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    if (studentId) {
      const existingStudent = await this.prisma.user.findUnique({
        where: { studentId },
      });

      if (existingStudent) {
        throw new ConflictException('Student ID already registered');
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        studentId,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        studentId: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = this.generateToken(user.id);

    this.logger.log(`New user registered: ${email}`);

    return {
      user,
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Skip password check for Google users (they don't have a password)
    if (!user.passwordHash) {
      throw new UnauthorizedException('Please use Google login for this account');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id);

    this.logger.log(`User logged in: ${email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        studentId: user.studentId,
        role: user.role,
      },
      access_token: token,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        studentId: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateProfileDto,
      select: {
        id: true,
        email: true,
        name: true,
        studentId: true,
        role: true,
        updatedAt: true,
      },
    });

    this.logger.log(`User profile updated: ${userId}`);

    return user;
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return user;
  }

  async validateGoogleUser(profile: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }) {
    // Check if user exists by email
    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    // If user doesn't exist, create one
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: `${profile.firstName} ${profile.lastName}`,
          passwordHash: '', // No password for Google users
        },
      });
      this.logger.log(`New Google user created: ${profile.email}`);
    }

    return user;
  }

  async googleLogin(user: any) {
    const token = this.generateToken(user.id);

    this.logger.log(`Google user logged in: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      access_token: token,
    };
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }
}
