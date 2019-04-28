import React from "react";

export default ({
  data: {
    allMarkdownRemark: { edges: postNodes }
  }
}) => (
  <div>
    {postNodes.map(({ node: post }, idx) => (
      <div key={post.id}>
        <a href={post.fields.slug}>{post.frontmatter.title}</a>
      </div>
      ))}
  </div>
);

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(filter: { fields: { authorId: { eq: $authorId } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            author {
              id
            }
          }
          fields {
            authorId
            slug
          }
        }
      }
    }
  }
`;
