import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button,  Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

    this.state = {
      isModalOpen:false
    };
    
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    
    }); 
  } 
  handleSubmit(values) { 
    this.toggleModal();  
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
         <Button outline onClick={this.toggleModal}><span> <i class= "fa fa-pencil fa-lg"></i></span> Submit Comment</Button>
             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                      <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>                               
                            <Col md={3}>
                              <Control.select model=".selectType" name="selectType"
                                className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Control.select>
                              </Col>
                            </Row>
                            <Row className="form-group">
                              <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={10}>
                                  <Control.text model=".yourname" id="yourname" name="yourname"
                                     placeholder="Your Name"
                                     className="form-control"
                                     validators={{
                                         required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
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
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                              </Row>
                            </LocalForm>
                          </ModalBody>
                       </Modal>
                    </div>
                  );
                 }
              }

    function RenderDish({dish}) {
      return (  
        <div className="col-12 col md-5 m-1">                        
          <Card>                           
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody/>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>      
            <CardBody/>            
          </Card>   
        </div>        
      );
   }
    
    function RenderComments({comments, addComment, dishId}) {
      if(comments != null) 
      return(
        <div className="col-12 col-md-5 m-1">                 
          <h4>Comments</h4>
            <ul className="list-unstyled">
              {comments.map((comm)=> {
                return(                 
                  <li key={comm.id}>    
                    <p>{comm.comment}</p>
                    <p>--{comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))} </p>    
                    </li>              
                  );        
                })}
              </ul>
            <CommentForm dishId={dishId} addComment={addComment} /> 
          </div>    
        ); 
      else 
          return (
            <div></div>
          );    
      }

      const Dishdetail=(props)=> {
        if(props.dish != null)
         return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md m-1">
              <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
                />
            </div>
          </div>
        </div>
      );
    else 
      return (
        <div></div>
      );    
    }   

    export default Dishdetail;   