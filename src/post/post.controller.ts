import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../decorators/getUser.decorator";
import { CursorPaginateDto } from "../shared/cursorPaginate.dto";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("/:id")
  getPost(@Param("id", ParseUUIDPipe) postId: string) {
    return this.postService.getPost(postId);
  }

  @Get()
  getPosts(@Query() cursorPaginateDto: CursorPaginateDto) {
    return this.postService.getPosts(cursorPaginateDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }
}
