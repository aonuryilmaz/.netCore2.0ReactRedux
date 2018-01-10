import React, { Component } from 'react';
import * as $ from 'jquery';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

export default class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.postId= props.match.params.id;
        this.state = {            
            post: { pageCategoryId: this.postId, title: '', description: '', keywords: '', subtitle: '', pageHtml: '', isCategory: false },
            err: false,
            child:[]
        }

    }
    componentDidMount() {
        fetch(`/api/Category/EditCategory?id=${this.postId}`)
            .then(response => response.json())
            .then((res) => {
                this.setState({ post: res.parent, child: res.child })
            }).then(() => {
                CKEDITOR.replace("Description", { enterMode: CKEDITOR.ENTER_BR,});
                CKEDITOR.replace("PageHtml", { enterMode: CKEDITOR.ENTER_BR, });
            });
        
    }
    handleChange(field, e) {
        if (field === 'isCategory') {
            const post = Object.assign({}, this.state.post, { [field]: e.target.checked });
            this.setState(Object.assign({}, this.state, { post }));
        } else {
            const post = Object.assign({}, this.state.post, { [field]: e.target.value });
            this.setState(Object.assign({}, this.state, { post }));
        }

    }
    handleSubmit() {
        const { dispatch } = this.props;
        let description = CKEDITOR.instances["Description"].getData();
        let pageHtml = CKEDITOR.instances["PageHtml"].getData();
        const post = Object.assign({}, this.state.post, { description: description, pageHtml: pageHtml });       
        this.setState(Object.assign({}, this.state, { post }), () => {                      
            let data = JSON.stringify(this.state.post);
            let res = {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                cache: 'default',
                body: data
            };
            fetch(`/api/Category/EditCategory`, res)
                .then(response => response.json())
                .then(res => {
                    if (res === 'ok') {
                        dispatch(push('/'));
                    }
                    this.setState({ err: true })
                });
        });
        
            
    }
    handleReRenderAction(id) {
        this.props.getCategory(id);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.parent !== nextProps.parent || this.props.child !== nextProps.child) {
            var parent = nextProps.parent;
            parent.title = parent.title || '';
            parent.description = parent.description || '';
            parent.keywords = parent.keywords || '';
            parent.subtitle = parent.subtitle || '';
            parent.pageHtml = parent.pageHtml || '';
            this.setState({ post: parent, child: nextProps.child }, () => {
                console.log(this.state);
                CKEDITOR.instances["Description"].setData(this.state.post.description);
                CKEDITOR.instances["PageHtml"].setData(this.state.post.pageHtml);
            });
         
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Category Düzenle</h1>
                    </div>
                    {this.state.err &&
                        <div className="alert alert-danger">
                            Güncelleme başarısız oldu
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-8" >
                        <div className="form-group">
                            <label className="label-control font-weight-bold">Title</label>
                                <input className="form-control"
                                type="text"
                                onChange={this.handleChange.bind(this, 'title')}
                                value={this.state.post.title}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control font-weight-bold">Description</label>
                            <textarea className="form-control"
                                type="text"
                                value={this.state.post.description}
                                name="Description"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control font-weight-bold">Page Html</label>
                            <textarea className="form-control"
                                type="text"
                                value={this.state.post.pageHtml}
                                name="PageHtml"
                            />
                        </div>
                        <div className="form-group font-weight-bold">
                            <label className="label-control">Keywords</label>
                            <input className="form-control"
                                type="text"
                                onChange={this.handleChange.bind(this, 'keywords')}
                                value={this.state.post.keywords}
                            />
                        </div>
                        <div className="form-group font-weight-bold">
                            <label className="label-control">Subtitle</label>
                            <input className="form-control"
                                type="text"
                                onChange={this.handleChange.bind(this, 'subtitle')}
                                value={this.state.post.subtitle}
                            />
                        </div>                      
                        <div className="form-check">
                            <label class="form-check-label font-weight-bold" for="isCategory">
                                <input
                                    onChange={this.handleChange.bind(this, 'isCategory')}
                                    type="checkbox"
                                    class="form-check-input"
                                    id="isCategory"
                                    checked={this.state.post.isCategory}
                                />
                                isCategory</label>
                        </div>
                        <button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Edit</button>
                    </div>
                    <div className="col-4">
                        <span className="font-weight-bold text-xl">Childs</span>
                        {this.state.child.map(category =>
                            <div key={category.pageCategoryId} className="row">                                
                                <div className="col-12">
                                    <button className="btn btn-link" onClick={this.handleReRenderAction.bind(this, category.pageCategoryId)} >{category.title}</button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}