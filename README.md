### Notes

- Multer is a body parser for formData
- For this project, a database might be cool, especially for categorizing and finding specific images, but it is not completely required per say in order to serve image urls.

- Implement some kind of private token to access this API for further security.
- This project should be hosted on my other Raspberry Pi with a Postgres database running.

### TODO
- I can create a restful prisma database in the case above. - DONE
- We can make the uploads folder publically available, OR, we can create a route, look up that image in the database, and give it out that way. - DONE
- Next step, implement prisma and give out the URL of the image, and remove the public express.static folder? That could perhaps be more secure or just in general more tidier by keeping it more controlled and organized? - DONE


#### Helpful links
- https://www.youtube.com/watch?v=srPXMt1Q0nY
- https://www.youtube.com/watch?v=JY7OJHKVjEo
etc.
