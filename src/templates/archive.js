import React from "react";
import Link from "gatsby-link";

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    console.log(data);
    const { allMarkdownRemark } = data; // data.markdownRemark holds our post data
    let docList = allMarkdownRemark.edges.map((item) => {
        return(
            <h1>
                <Link to={item.node.frontmatter.path}>
                    {item.node.frontmatter.title}
                </Link>
            </h1>
        )
    })
    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <ul>
                    { docList }
                </ul>
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query DocArchiveByPath($navPath: String!) {
    allMarkdownRemark(filter: {
      frontmatter: {
        section:{
          eq: $navPath
        }
      }
    }) {
        edges {
            node {
                html
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    path
                    title
                }
            }
        }
    }
  }
`;