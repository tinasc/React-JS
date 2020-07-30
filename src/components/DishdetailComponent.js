import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
        if(dish != null) {
          return (                          
            <Card>                           
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>              
            </Card>           
          );
        }
    
        else {
          return (
            <div></div>
          );
        }
      }

    function RenderComments({dish}) {
        if(dish != null && dish.comments != null) {
         const c=dish.comments.map(comm=> {
             return(                 
                <li key={comm.id}>    
                <div className="col-12 col-md-12 m-1">
                    <p>{comm.comment}</p>
                    <p>--{comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))} </p>    
                               
                </div>
                </li> 
             );             
          });
        
            return (            
            <div className="row">
                <div className="col-12 col-md-5 m-1">                 
                    <h4>Comments</h4>
                </div>
                <ul className="list-unstyled">
                    {c}
                </ul>
            </div>
            )
        }
    
        else {
          return (
            <div></div>
          );
        }
    }




      const  Dishdetail=(props)=> {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={(props.dish)}/>
                     </div>
                     <div className="col-12 col-md-5 m-1">
                        <RenderComments dish={(props.dish)}/>
                    </div>
                </div>
            </div>
        );
      }
    
    
      

    export default Dishdetail;   