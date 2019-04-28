import React from "react";

export default ({
  data: {
    authorYaml: { id, bio, twitter },
    allMarkdownRemark: { edges: postNodes }
  }
}) => (
  <div>
    <div>
      <h3>{id}</h3>
      <p>{bio}</p>
      <p>
        <a href={`https://twitter.com/${twitter}/`} target="_blank">
          {twitter}
        </a>
      </p>
    </div>
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
    authorYaml(id: { eq: $authorId }) {
      id
      bio
      twitter
    }
  }
`;
