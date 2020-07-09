import React from 'react'
import {Card, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';
import star from '../star.png';

export default function RepoCard(props) {
    const {name, desc, url, stars, language} = props
    return (
        <Card className='mb-4' >
          <CardBody>
            <CardTitle>
              <a href={url}>
                {name}
              </a>
              </CardTitle>
            <CardSubtitle>{language}</CardSubtitle>
            <CardText>{desc}</CardText>
            <small className="text-muted d-flex align-items-center" ><img style={{width:'20px'}} src={star} alt='' /> <span className='ml-1'>{stars}</span></small>
        </CardBody>
      </Card>
    )
}
