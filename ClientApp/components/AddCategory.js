import React, { Component } from 'react';
import { push } from 'react-router-redux';

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { post: { title: '', description: '' } }
    }
    handleChange(field, e) {
        const post = Object.assign({}, this.state.post, { [field]: e.target.value });
        this.setState(Object.assign({}, this.state, { post }));
    }
    handleSubmit() {
        const { dispatch } = this.props;
        let data = JSON.stringify(this.state.post);
        let res = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            cache: 'default',
            body: data
        };
        this.props.addCategory(res);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Category Ekle</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label className="label-control font-weight-bold">Title</label>
                            <input className="form-control"
                                type="text"
                                onChange={this.handleChange.bind(this, 'title')}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control font-weight-bold">Description</label>
                            <input className="form-control"
                                type="text"
                                onChange={this.handleChange.bind(this, 'description')}
                            />
                        </div>
                        <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-success">Create</button>
                    </div>
                </div>
            </div>

        )
    }
}