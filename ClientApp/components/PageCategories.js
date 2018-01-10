import React from 'react';
import { Link } from 'react-router-dom';
const PageCategories = ({ categories }) => {
    console.log(categories);
    return (
        <tbody>
            {categories.map(category =>
                <tr key={category.pageCategoryId}>
                    <td>{category.title}</td>
                    <td>{category.keywords}</td>
                    <td>{category.description}</td>
                    <td>{category.subtitle}</td>
                    {category.isCategory &&
                        <td>Category</td>
                        ||
                        <td>Page</td>
                    }
                    <td><Link className="btn btn-primary" to={{
                        pathname: `/editcategory/${category.pageCategoryId}`
                    }}>Edit</Link></td>
                </tr>
            )}
        </tbody>
        );
}

export default PageCategories;