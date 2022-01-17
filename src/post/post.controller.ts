import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../decorators/getUser.decorator";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get("/:id")
  getPost(@Param("id", ParseUUIDPipe) postId: string) {
    return this.postService.getPost(postId);
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }
}
