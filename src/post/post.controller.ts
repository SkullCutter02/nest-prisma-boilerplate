import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { GetUser } from "../decorators/getUser.decorator";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postService.createPost(createPostDto, user);
  }
}
