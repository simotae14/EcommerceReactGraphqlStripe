import React, { Component } from 'react';
// prettier-ignore
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import { Link } from 'react-router-dom';
import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: ''
  }
  async componentDidMount() {
    try {
      const response = await strapi.request('POST', '/graphql', {
        data: {
          query: `query{
            brands {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      this.setState({
        brands: response.data.brands
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = ({ value }) => {
    this.setState({
      searchTerm: value
    });
  }

  render() {
    const { brands, searchTerm } = this.state;
    return (
      <Container>
        {/* Brands Search Field */}
        <Box
          display="flex"
          justifyContent="center"
          marginTop={4}
        >
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            placeholder="Search Brands"
          />
          <Box
            margin={3}
          >
            <Icon
              icon="filter"
              color={ searchTerm ? 'orange' : 'gray' }
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
        {/* Brands Section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          {/* Brands Header */}
          <Heading
            color="midnight"
            size="md"
          >
            Brew Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6c8ec"
            }
          }}
          shape="rounded"
          display="flex"
          justifyContent="around"
          wrap
        >
          {
            brands.map( brand => (
              <Box
                margin={2}
                width={200}
                paddingY={4}
                key={brand._id}
              >
                <Card
                  image={
                    <Box
                      height={200}
                      width={200}
                    >
                      <Image
                        alt="Brand"
                        fit="cover"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${apiUrl}${brand.image.url}`}
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
                    <Text
                      size="xl"
                    >
                      {brand.name}
                    </Text>
                    <Text>
                      {brand.description}
                    </Text>
                    <Text
                      size="xl"
                    >
                      <Link
                        to={`${brand._id}`}
                      >
                        See Brews
                      </Link>
                    </Text>
                  </Box>

                </Card>
              </Box>
            ))
          }
        </Box>
      </Container>
    );
  }
}

export default App;
