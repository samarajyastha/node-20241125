import fs from "fs";
import { createServer } from "http";

const server = createServer((req, res) => {
  fs.readFile("../data/users.json", "utf8", (error, users) => {
    if (error) {
      return console.log(error);
    }

    const parsedUsers = JSON.parse(users);
    //   console.log(parsedUsers);

    fs.readFile("../data/posts.json", "utf8", (postError, posts) => {
      if (postError) {
        return console.log(postError);
      }

      const parsedPosts = JSON.parse(posts);
      // console.log(parsedPosts);

      const result = parsedUsers.map((user) => {
        return {
          ...user,
          posts: parsedPosts.filter((post) => post.userId == user.id),
        };
      });

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    });
  });
});

server.listen(5000, () => {
  console.log("Server running...");
});
