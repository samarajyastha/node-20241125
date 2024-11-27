import fsPromise from "fs/promises";

async function getData() {
  try {
    const users = await fsPromise.readFile("../data/users.json", "utf8");
    console.log(users);
    const posts = await fsPromise.readFile("../data/posts.json", "utf8");
    console.log(posts);
    const parsedUsers = JSON.parse(users);
    const parsedPosts = JSON.parse(posts);

    const result = parsedUsers.map((user) => {
      return {
        ...user,
        posts: parsedPosts.filter((post) => post.userId == user.id),
      };
    });

    // console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("completed");
  }
}

getData();

// let, const
// ES6
// array methods -> map, filter, reduce, sort, find, includes (optional)
// if else and switch
// Array & objects
// template literals
// spread operator
// Array and object destructuring
// Arrow function
