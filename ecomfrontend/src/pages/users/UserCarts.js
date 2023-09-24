import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled.div`
margin: 10px;
display: grid;
grid-template-columns: repeat(5, 1fr); /* Six equal-width columns */
gap: 20px;
padding: 50px 30px; /* Add padding to the top, left, and right */
background-color:#e4e7ed;

@media (min-width: 768px) and (max-width: 1199px) {
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
}

@media (max-width: 767px) {
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
}

  `

const UserCarts = () => {

  const navigate = useNavigate();

    const cardsData = [
        {
          title: 'Card 1',
          image: 'https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup.jpg',
          description: 'Description for Card 1',
        },
        {
          title: 'Card 2',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
          description: 'Description for Card 2',
        },
        {
          title: 'Card 3',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtV-39nSJvpAXQbTTwI9xfcly4iXheY4K4Ew&usqp=CAU',
          description: 'Description for Card 3',
        },
        {
          title: 'Card 4',
          image: 'https://images.meesho.com/images/products/273358806/opcpb_512.jpg',
          description: 'Description for Card 4',
        },
        {
          title: 'Card 5',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
          description: 'Description for Card 5',
        },
        {
          title: 'Card 6',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtV-39nSJvpAXQbTTwI9xfcly4iXheY4K4Ew&usqp=CAU',
          description: 'Description for Card 6',
        },
        {
            title: 'Card 4',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
            description: 'Description for Card 4',
          },
          {
            title: 'Card 5',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
            description: 'Description for Card 5',
          },
          {
            title: 'Card 6',
            image: 'https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup.jpg',
            description: 'Description for Card 6',
          },{
            title: 'Card 4',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtV-39nSJvpAXQbTTwI9xfcly4iXheY4K4Ew&usqp=CAU',
            description: 'Description for Card 4',
          },
          {
            title: 'Card 5',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
            description: 'Description for Card 5',
          },
          {
            title: 'Card 6',
            image: 'https://mockups-design.com/wp-content/uploads/2021/08/Hanging_T-Shirt_Mockup.jpg',
            description: 'Description for Card 6',
          },
          {
            title: 'Card 5',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
            description: 'Description for Card 5',
          },
          {
            title: 'Card 6',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtV-39nSJvpAXQbTTwI9xfcly4iXheY4K4Ew&usqp=CAU',
            description: 'Description for Card 6',
          },
          {
              title: 'Card 4',
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdYM1DskwUYKCTULeE4gMKk-XWaCzrA87oA&usqp=CAU',
              description: 'Description for Card 4',
            },
      ];

      const handleClickProduct = (cloth) => {
        const image = cloth.image
        const encodedImage = encodeURIComponent(image);
        // const removedhttpimage = image.replace(/^https:\/\//, '');
        navigate(`/particularproduct/${encodedImage}`);
      }
  return (
    <>
    <StyledDiv>
    {cardsData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 345,mb:"30px" }}>
          <CardActionArea onClick={(e) => handleClickProduct(card)}>
            <CardMedia
              component="img"
              height="140"
              image={card.image}
              alt={card.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      </StyledDiv>
    </>
  )
}

export default UserCarts
