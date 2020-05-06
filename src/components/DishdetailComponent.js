import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
    return (
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments,addComment, dishId }) {
    if (comments == null) {
        return (<div></div>);
    }
    const showcmnts = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        );
    });

    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {showcmnts}
                <CommentForm addComment={addComment} dishId={dishId} />
            </ul>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish == null) {
        return (<div></div>);
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggle();
    }
    render() {
        return (
            <div className="row">
                <Button onClick={this.toggle} outline><span className="fa fa-edit"></span> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <LocalForm
                        onSubmit={(values) => this.handleSubmit(values)}>
                    <ModalBody>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rate">Rating</Label>
                                    <Control.select model=".rate" id="rate" name="rate" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>

                                </Col>
                            </Row>
                            <Row className="form-group">
                                
                                <Col>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text model=".name" id="name" name="name" 
                                        className="form-control" placeholder="Your Name" 
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15), required
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea style={{resize: 'none'}} model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>{' '}
                    </ModalFooter>
                        </LocalForm>

                </Modal>
            </div>
        );
    }
}

export default DishDetail;