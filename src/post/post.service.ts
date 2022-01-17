import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { PostDto } from "./dto/post.dto";
import { PrismaService } from "../prisma/prisma.service";
import { CursorPaginateDto } from "../shared/cursorPaginate.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  getPost(postId: string) {
    return this.prisma.post.findUnique({ where: { id: postId }, include: { user: true } });
  }

  async getPosts(cursorPaginateDto?: CursorPaginateDto) {
    if (Object.keys(cursorPaginateDto).length === 0) {
      return this.prisma.post.findMany({ include: { user: true } });
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
        include: { user: true },
      };

      const [posts, nextPage] = await this.prisma.$transaction([
        this.prisma.post.findMany({ ...findManyInput, skip: cursor ? 1 : undefined }), // if cursor exists, skip 1
        this.prisma.post.findMany({ ...findManyInput, skip: cursor ? limit + 1 : limit }),
      ]);
      return { data: posts, hasMore: nextPage.length !== 0 };
    }
  }

  createPost(createPostDto: PostDto, user: User) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        user: {
          connect: { id: user.id },
        },
      },
      include: {
        user: true,
      },
    });
  }

  editPost(editPostDto: PostDto, postId: string) {
    return this.prisma.post.update({
      where: { id: postId },
      data: editPostDto,
    });
  }
}
