import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.frontmatter.path}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <h3 style={{ marginBottom: '4px' }}>
              {node.frontmatter.title}{" "}
              <span style={{ color: "#BBB" }}>— {node.frontmatter.date}</span>
            </h3>
          </Link>
            <p>{node.excerpt}</p>
        </div>
          ))}
    </div>
      );
      };

      export const query = graphql`
        query IndexQuery {
          allMarkdownRemark(sort: {fields: [frontmatter___path], order: DESC}) {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  path
                  title
                  date(formatString: "DD MMMM, YYYY")
                }
                excerpt
              }
            }
          }
        }
      `;