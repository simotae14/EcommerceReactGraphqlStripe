import React, { Component } from 'react'
import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Image, Card, Button, Mask } from 'gestalt';
import { Link } from 'react-router-dom';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends Component {
    // create the state of the components
    state = {
        brews: [],
        brand: '',
        cartItems: []
    }
    async componentDidMount() {
        //console.log(this.props.match.params.brandId);
        try {
            const response = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query{
                        brand(id: "${this.props.match.params.brandId}") {
                            _id
                            name
                            brews {
                                _id
                                name
                                description
                                image {
                                    url
                                }
                                price
                            }
                        }
                    }`
                }
            });
            // update the state with the brews and the brand retrieved
            this.setState({
                brews: response.data.brand.brews,
                brand: response.data.brand.name
            })
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const {
            brand,
            brews,
            cartItems
        } = this.state;
        return (
            <Box
                marginTop={4}
                display="flex"
                justifyContent="center"
                alignItems="start"
                dangerouslySetInlineStyle={{
                    __style: {
                        flexWrap: 'wrap-reverse'
                    }
                }}
            >
                {/* Brews Section */}
                <Box
                    display="flex"
                    direction="column"
                    alignItems="center"
                >
                    {/* Brews Heading */}
                    <Box
                        margin={2}
                    >
                        <Heading
                            color="orchid"
                        >
                            { brand }
                        </Heading>
                    </Box>
                    {/* Brews */}
                    <Box
                        dangerouslySetInlineStyle={{
                            __style: {
                                backgroundColor: '#bdcdd9'
                            }
                        }}
                        shape="rounded"
                        display="flex"
                        justifyContent="center"
                        padding={4}
                    >
                        {
                            brews.map( brew => (
                                <Box
                                    margin={2}
                                    width={210}
                                    paddingY={4}
                                    key={brew._id}
                                >
                                    <Card
                                        image={
                                            <Box
                                                height={250}
                                                width={200}
                                            >
                                                <Image
                                                    alt="Brand"
                                                    fit="cover"
                                                    naturalHeight={1}
                                                    naturalWidth={1}
                                                    src={`${apiUrl}${brew.image.url}`}
                                                />
                                            </Box>
                                        }
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            direction="column"
                                        >
                                            <Box
                                                marginBottom={2}
                                            >
                                                <Text
                                                    size="xl"
                                                >
                                                    {brew.name}
                                                </Text>
                                            </Box>

                                            <Text>
                                                {brew.description}
                                            </Text>
                                            <Text
                                                color="orchid"
                                            >
                                                ${brew.price}
                                            </Text>
                                            <Box
                                                marginTop={2}
                                            >
                                                <Text
                                                    size="xl"
                                                >
                                                    <Button
                                                        color="blue"
                                                        text="Add to Cart"
                                                    />
                                                </Text>
                                            </Box>

                                        </Box>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                {/* User Cart */}
                <Box
                    marginTop={2}
                    marginLeft={8}
                    alignSelf="end"
                >
                    <Mask
                        shape="rounded"
                        wash
                    >
                        <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            padding={2}
                        >
                            {/* User Cart Heading */}
                            <Heading
                                align="center"
                                size="md"
                            >
                                Your Cart
                            </Heading>
                            <Text
                                color="gray"
                                italic
                            >
                                {
                                    cartItems.length
                                } items selected
                            </Text>
                            {/* Cart Items (will add) */}
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                direction="column"
                            >
                                <Box
                                    margin={2}
                                >
                                    {
                                        cartItems.length === 0 && (
                                            <Text
                                                color="red"
                                            >
                                                Please select some items
                                            </Text>
                                        )
                                    }
                                </Box>
                                <Text
                                    size="lg"
                                >
                                    Total: $3.99
                                </Text>
                                <Text>
                                    <Link to="/checkout">Checkout</Link>
                                </Text>
                            </Box>
                        </Box>
                    </Mask>
                </Box>
            </Box>
        )
    }
}

export default Brews;
