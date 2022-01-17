import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { CreatePostDto } from "./dto/createPost.dto";
import { PrismaService } from "../prisma/prisma.service";
import { CursorPaginateDto } from "../shared/cursorPaginate.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  getPost(postId: string) {
    return this.prisma.post.findUnique({ where: { id: postId }, include: { author: true } });
  }

  async getPosts(cursorPaginateDto?: CursorPaginateDto) {
    if (!cursorPaginateDto) {
      return this.prisma.post.findMany({ include: { author: true } });
    } else {
      const { limit, cursor, filter } = cursorPaginateDto;

      const findManyInput: Prisma.PostFindManyArgs = {
        take: limit,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          title: {
            contains: filter,
            mode: "insensitive",
          },
        },
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      };

      const [posts, nextPage] = await this.prisma.$transaction([
        this.prisma.post.findMany({ ...findManyInput, skip: cursor ? 1 : undefined }), // if cursor exists, skip 1
        this.prisma.post.findMany({ ...findManyInput, skip: cursor ? limit + 1 : undefined }),
      ]);
      return { data: posts, hasMore: nextPage.length !== 0 };
    }
  }

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
