import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import PageCategories from './PageCategories';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getCategoriesAsync();
    }
    render() {
        const table = (
            <table className='table table-bordered'>
                <thead className='thead thead-inverse'>
                    <tr>
                        <th>Title</th>
                        <th>Keywords</th>
                        <th>Description</th>
                        <th>Subtitle</th>
                        <th>Page/Category</th>
                        <th></th>
                    </tr>
                </thead>
                <PageCategories categories={this.props.categories} />
            </table>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Page Category</h1>
                    </div>
                    <div className="col-12 text-right m-1">
                        <Link className="btn btn-success" to={{
                            pathname: `/add`
                        }}>Yeni Ekle</Link>
                    </div>
                </div>
                {table}
            </div>
        )
    }
}

export default Home;