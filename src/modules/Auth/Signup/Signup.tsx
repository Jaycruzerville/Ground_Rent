import React from "react"
import {
  Box,
  Flex,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  SimpleGrid,
  Link,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors"
import "@/App.css"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import logo from "@/assets/nigeriapng.svg"

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      className="office-bg"
    >
      <Box
        bg={colors.gray[100]}
        p="24px"
        w="auto"
        maxW="600px" // Increased width to accommodate two columns
        boxShadow="0px 8px 32px rgba(0, 0, 0, 0.06)"
        borderRadius="4px"
      >
        <Image
          src={logo}
          w="20%" // Adjusted for better fit in larger box
          alt="Company Logo"
          mb={4}
          style={{ display: "block", margin: "0 auto" }}
        />
        <Heading mb={4} textAlign="center" color={colors.brand.primary}>
          REGISTER
        </Heading>
        <SimpleGrid columns={2} spacing={5} mb={4}>
          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="First Name" />
          </FormControl>
          <FormControl id="surname" isRequired>
            <FormLabel>Surname</FormLabel>
            <Input placeholder="Surname" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" placeholder="Email Address" />
          </FormControl>
          <FormControl id="phone-number" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" placeholder="Phone Number" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </SimpleGrid>
        <Text> </Text>
        <Button
          bg={colors.brand.primary}
          color="white"
          w="full"
          mt={4}
          _hover={{ bg: colors.brand.primaryDark }}
        >
          Register
        </Button>
        <Text mt={3} textAlign="center">
          Already have an account?{" "}
          <Link color={colors.brand.primary} href="/auth/signin">
            Sign in
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default Signup
