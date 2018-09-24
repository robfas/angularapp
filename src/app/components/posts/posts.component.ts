import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];



  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts=>{
      console.log(posts);
      this.posts = posts;
      console.log(this.posts);
    }
    );
  }

  addPost(title, body){
    if (!title || !body){
      alert('Insert post!');
    } else {
      this.postService.savePost({title, body} as Post).subscribe(post=>{
      console.log(post);
    });
    }
    
   
   
  }
}
