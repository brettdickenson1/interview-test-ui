import React, { useState } from "react";
import { Card, Button, Icon, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

// Define movie card data types
interface MovieCardProps {
  id: number;
  img: string;
  title: string;
  tagline: string;
  release_date: string;
  vote_average: number;
  homepage: string;
  keywords: string;
  budget: number | string;
  overview: string;
}

// retrieve props from Movies component
export default function MovieCard({
  img,
  title,
  tagline,
  release_date,
  budget,
  overview,
  homepage,
  vote_average,
  id,
}: MovieCardProps) {
  //create state for updating like and dislike buttons
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/movie/${id}`, {
      state: {
        img,
        title,
        tagline,
        release_date,
        budget,
        overview,
        vote_average,
        homepage,
        id,
      },
    });
  };
  // this function will trigger when user clicks 'Like'
  // it will toggle states true/false on and off using setLikeActive
  const handleLike = () => {
    setLikeActive(!likeActive);
    if (dislikeActive) setDislikeActive(false);
  };
  // this function will trigger when user clicks 'Dislike'
  // it will toggle states true/false on and off using setDislikeActive
  const handleDislike = () => {
    setDislikeActive(!dislikeActive);
    if (likeActive) setLikeActive(false);
  };

  return (
    <Card className="centered" style={{ borderRadius: 10 }}>
      <Card.Content onClick={navigateToDetails}>
        <Image src={img} className="img" />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{tagline}</Card.Meta>
        <Card.Description>Release date: {release_date}</Card.Description>
        <Card.Description>Budget: ${budget}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic={!likeActive}
            color="green"
            style={{ borderRadius: 10, marginRight: 5 }}
            onClick={handleLike}
          >
            <Icon name="thumbs up" />
            Like
          </Button>
          <Button
            basic={!dislikeActive}
            color="red"
            style={{ borderRadius: 10 }}
            onClick={handleDislike}
          >
            <Icon name="thumbs down" />
            Dislike
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
