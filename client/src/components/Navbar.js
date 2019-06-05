import React from 'react';
import { Box, Text, Heading, Image } from 'gestalt';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <Box
            height={70}
            padding={1}
            color="midnight"
            shape="roundedBottom"
            display="flex"
            alignItems="center"
            justifyContent="around"
        >
            { /* Signin Link */ }
            <NavLink
                to="/signin"
            >
                <Text
                    size="xl"
                    color="white"
                >
                    Sign In
                </Text>
            </NavLink>
            { /* Title & Logo */ }
            <NavLink
                to="/"
            >
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Box
                        margin={2}
                        height={50}
                        width={50}
                    >
                        <Image
                            alt="BreHaha Logo"
                            src="./icons/logo.svg"
                            naturalHeight={1}
                            naturalWidth={1}
                        />
                    </Box>
                    <Heading
                        size="xs"
                        color="orange"
                    >
                        BrewHaha
                    </Heading>
                </Box>
            </NavLink>
            { /* Signup Link */ }
            <NavLink
                to="/signup"
            >
                <Text
                    size="xl"
                    color="white"
                >
                    Sign Up
                </Text>
            </NavLink>
        </Box>
    );
};

export default Navbar;