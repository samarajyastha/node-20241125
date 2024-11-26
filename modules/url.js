import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

const myUrl = "https://www.codeit.com.np/search-course?q=Node+JS";

const urlObject = new URL(myUrl);
console.log(urlObject);

const params = new URLSearchParams(urlObject.search);
console.log(params);

params.set("q", "React Js");
console.log(params);

params.append("duration", "2");
console.log(params);

const formattedUrl = url.format(urlObject);
console.log(formattedUrl);
