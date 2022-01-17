import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { CreatePostDto } from "./dto/createPost.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(createPostDto: CreatePostDto, user: User) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: true,
      },
    });
  }
}
