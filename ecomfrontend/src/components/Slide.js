import {
  ThemeProvider,
  createTheme,
  styled,
  alpha,
  // Add the missing import here
} from "@mui/material/styles";
import {
  Divider,
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  Stack,
  Skeleton,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";

const theme = createTheme();

const Slide = ({ products, title }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {loading} = useSelector((state) => state.product);
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));
  let numberOfSkeletons = 1;
  return (
    <ThemeProvider theme={theme}>
      <Component>
        <Deal>
          <DealText>{title}</DealText>

        </Deal>

        <Divider />

        {loading?<Stack
          spacing={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[...Array(numberOfSkeletons)].map((_, index) => (
            <Skeleton key={index} variant="rounded" width="90vw" height={120} />
          ))}
        </Stack>:<Carousel
          swipeable={isMobileOrTablet}
          draggable={isMobileOrTablet}
          responsive={responsive}
          centerMode={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={10000}
          keyBoardControl={true}
          showDots={false}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products?.length > 0 &&
            products?.map((product, index) => {
              const image = product?.image || ""; // Handle undefined product or product.image
              const encodedImage = encodeURIComponent(image);
              const productId = product?._id;

              return (
                <Link
                  key={index}
                  to={`/particularproduct/${encodedImage}/${productId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box textAlign="center" style={{ padding: "25px 15px" }}>
                    <Image src={product?.image} />
                    <TitleText style={{ fontWeight: 600, color: "#212121" }}>
                      {product?.name}
                    </TitleText>
                    <TextContainer>
                      <Text
                        style={{
                          color: "#525050",
                          textDecoration: "line-through",
                        }}
                      >
                        {product?.cost}
                      </Text>
                      <Text>
                        ₹
                        {(
                          product?.cost -
                          product?.cost * (product?.discount / 100)
                        ).toFixed(2)}
                      </Text>
                      <Text style={{ color: "green" }}>
                        {product?.discount}
                      </Text>
                    </TextContainer>
                    <Text style={{ color: "#212121", opacity: ".6" }}>
                      {product?.category}
                    </Text>
                  </Box>
                </Link>
              );
            })}
        </Carousel>}
      </Component>
    </ThemeProvider>
  );
};

export default Slide;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;

const Deal = styled(Box)`
  display: flex;
  padding: 15px 20px;
`;

const DealText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 25px;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #4d1c9c;
  border-radius: 2px;
  font-size: 13px;
  &:hover {
    background-color: #7a1ccb;
  }
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const TitleText = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const TextContainer = styled(Container)`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;
