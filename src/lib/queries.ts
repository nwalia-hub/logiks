// /lib/queries.ts
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    description,
    publishedAt,
    "imageUrl": image.asset->url        // handy in SSR
  }
`;

export const singlePostByIdQuery = /* groq */ `
  *[_type == "post" && _id == $id][0]{
    _id,
    title,
    description,
    publishedAt,
    image                                      // keep full ref if you want builder
  }
`;
