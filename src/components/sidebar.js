import React, { Component } from 'react'
import Link from 'gatsby-link'

class Sidebar extends Component {
    render() {
        console.log(this.props.navigation);

        /**
        * Create archive pages for tags
        */
        let nav = [];
        // Iterate through each post, putting all found tags into `tags`
        this.props.navigation.forEach(({ node }) => {
            if ('section' in node.frontmatter) {
                nav = nav.concat(node.frontmatter.section);
            }
        });

        // Eliminate duplicate tags
        nav = nav.filter(function (item, i, ar) { return ar.indexOf(item) === i; });

        // Sort array and order pages correctly
        nav.sort();


        /**
         * Make object with all menu items that's sorted by section
         * And then map the object to a list
         */
        let navItems = {};
        this.props.navigation.forEach(({ node }) => {
            if (!Array.isArray(navItems[node.frontmatter.section])) {
                navItems[node.frontmatter.section] = [];
            }
            navItems[node.frontmatter.section].push(node.frontmatter);
        });

        let navigation = Object.keys(navItems).map(function (key, index) {
            let sectionLinks = navItems[key].map(({ path, title }) => {
                return (
                    <li>
                        <Link to={path}>
                            {title}
                        </Link>
                    </li>
                )
            });
            return <li><h2>{ key.charAt(0).toUpperCase() + key.slice(1) }</h2><ul>{ sectionLinks }</ul></li>;
        });

        // var navigation = nav.map((item) => {

        //     let itemName = item.replace(/([0-9]-)+/g, '').replace(/\s+/g, '-').toLowerCase();
        //     return (
        //     )
        // });

        return (
            <div
                style={{
                    background: 'rebeccapurple',
                    marginBottom: '1.45rem',
                }}
            >
                <div
                    style={{
                        margin: '0 auto',
                        maxWidth: 960,
                        padding: '1.45rem 1.0875rem',
                    }}
                >
                    <ul>
                    
                        { navigation }
                    </ul>
                </div>
            </div>
        );
    }
};


export default Sidebar
