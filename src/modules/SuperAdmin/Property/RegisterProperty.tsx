import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Select,
  SimpleGrid,
  VStack,
  Button,
  Textarea,
  InputLeftAddon,
  Divider,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { EmailIcon, AttachmentIcon } from "@chakra-ui/icons"
import naijaStates from "@/data/naijaStates"
import propertytype from "@/data/Propertytype"
import { colors } from "@/theme/colors"

interface RegisterPropertyProps {
  onClose: () => void
}

const RegisterProperty: React.FC<RegisterPropertyProps> = ({ onClose }) => {
  return (
    <Box
      bgColor={colors.brand.bgLight}
      p="20px"
      mx={0}
      w="full"
      h="auto"
      overflowY="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading color={colors.brand.primary}>Register Property</Heading>
      </Flex>

      <Divider borderColor={colors.brand.primary} mb="6" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property Name"
            placeholder="Enter Property Name"
            isRequired={true}
          />
          <InputField
            label="Property ID"
            placeholder="Enter Property ID"
            isRequired={true}
          />
          <SelectField
            label="Current Owner"
            options={["Owner 1", "Owner 2"]}
            isRequired={true}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField label="House Number" placeholder="Enter House Number" />
          <InputField
            label="Property Street Name"
            placeholder="Enter Street Name"
          />
          <SelectField
            label="Property State"
            options={naijaStates}
            isRequired={true}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <SelectField
            label="Property Type"
            options={propertytype}
            isRequired={true}
          />
          <InputField
            label="Survey Plan Number"
            placeholder="Enter Survey Plan Number"
          />
          <FileUploadField label="Property Pictures" />
          <FileUploadField label="Property C of O" />
          <FileUploadField label="C of O NO." />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property Value"
            placeholder="Enter Property Value"
            isRequired={true}
          />
          <InputField label="Purchase Date" placeholder="Select Date" />
          <InputField
            label="Transfer/Release Date"
            placeholder="Select Date"
            isRequired={true}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property City"
            placeholder="Enter City"
            isRequired={true}
          />
          <InputField
            label="Estate Number"
            placeholder="Enter Estate Number"
            isRequired={true}
          />
          <InputField label="FHA Slang Name" placeholder="Enter FHA Slang" />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property Size"
            placeholder="Enter Property Size"
            isRequired={true}
          />
          <InputField
            label="Property Size Unit"
            placeholder="e.g., sqm, hectares"
          />
        </VStack>
      </SimpleGrid>

      <Button
        mt={8}
        px={8}
        py={3}
        bg={colors.brand.primary}
        color="white"
        _hover={{ bg: colors.brand.primaryDark }}
        fontSize="lg"
        onClick={onClose}
      >
        Register Property
      </Button>
    </Box>
  )
}

RegisterProperty.propTypes = {
  onClose: PropTypes.func.isRequired,
}

interface SectionTitleProps {
  title: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Box
    h="60px"
    bg={colors.brand.primary}
    p="15px"
    color="white"
    borderTopRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Heading size="md">{title}</Heading>
  </Box>
)

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

interface FileUploadFieldProps {
  label: string
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <AttachmentIcon color="gray.300" />
      </InputLeftElement>
      <Input type="file" p="0.5rem" />
    </InputGroup>
  </FormControl>
)

FileUploadField.propTypes = {
  label: PropTypes.string.isRequired,
}

interface InputFieldProps {
  label: string
  placeholder: string
  isRequired?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isRequired = false,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input placeholder={placeholder} />
  </FormControl>
)

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
}

interface SelectFieldProps {
  label: string
  options: string[]
  isRequired?: boolean
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  isRequired = false,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Select placeholder={`-- Select ${label.split(" ")[1]} --`}>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </Select>
  </FormControl>
)

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isRequired: PropTypes.bool,
}

interface EmailInputFieldProps {
  label: string
  placeholder: string
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({
  label,
  placeholder,
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <EmailIcon color="gray.300" />
      </InputLeftElement>
      <Input type="email" placeholder={placeholder} />
    </InputGroup>
  </FormControl>
)

EmailInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

interface PhoneNumberInputFieldProps {
  label: string
  placeholder: string
}

const PhoneNumberInputField: React.FC<PhoneNumberInputFieldProps> = ({
  label,
  placeholder,
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <InputLeftAddon>+234</InputLeftAddon>
      <Input type="tel" placeholder={placeholder} />
    </InputGroup>
  </FormControl>
)

PhoneNumberInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

interface TextareaFieldProps {
  label: string
  placeholder: string
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  placeholder,
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Textarea placeholder={placeholder} />
  </FormControl>
)

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default RegisterProperty
