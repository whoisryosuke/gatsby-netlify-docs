/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require("path");

/**
 * Create node for archive order number
 */
// exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
//     const { createNodeField } = boundActionCreators

//     if (node.internal.type === `File`) {
//         let order = node.relativeDirectory.replace(/(-[a-z])\w+/g, '').toLowerCase();
//         console.log('ordered');
//         console.log(order);
//         createNodeField({
//             node,
//             name: `order`,
//             value: order,
//         })
//     }
// };

/**
 *  Pagination for /blog/ page
 */
function createDocNavigation(graphql, createPage) {
    graphql(`
        {
            allFile {
                edges {
                    node {
                        relativeDirectory
                        extension
                    }
                }
            }
        }
    `).then(result => {

                
        /**
         * Create archive pages for tags
         */
        let nav = [];
        // Iterate through each post, putting all found tags into `tags`
        result.data.allFile.edges.forEach(({ node }) => {
            if ('relativeDirectory' in node) {
                nav = nav.concat(node.relativeDirectory);
            }
        });
        
        // Eliminate duplicate tags
        nav = nav.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

        // Sort array and order pages correctly
        nav.sort();

        // Make tag pages
        nav.forEach(navItem => {
            let navPath = navItem.replace(/([0-9]-)+/g, '').replace(/\s+/g, '-').toLowerCase();
            createPage({
                path: `/${navPath}/`,
                component: path.resolve(`./src/templates/archive.js`),
                context: {
                    navPath,
                    navItem,
                },
            });
        });

    })
}


exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    const blogPostTemplate = path.resolve(`src/templates/pageTemplate.js`);

    graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
            if (result.errors) {
                return Promise.reject(result.errors);
            }

            result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                createPage({
                    path: node.frontmatter.path,
                    component: blogPostTemplate,
                    context: {}, // additional data can be passed via context
                });
            });

        });

    createDocNavigation(graphql, createPage);
};